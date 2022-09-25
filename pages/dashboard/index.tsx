import { useCallback, useRef } from "react";
import type { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { getPollsPage } from "@/api/index";
import { DashboardLayout } from "@/layouts/index";
import { Card, Container } from "@/components/index";

const Dashboard: NextPage = () => {
  const intObserver = useRef();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery("/polls", ({ pageParam = 1 }) => getPollsPage(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const lastPostRef = useCallback(
    (poll: any) => {
      if (isFetchingNextPage) return;

      // @ts-ignore
      if (intObserver.current) intObserver.current.disconnect();

      // @ts-ignore
      intObserver.current = new IntersectionObserver((polls) => {
        if (polls[0].isIntersecting && hasNextPage) fetchNextPage();
      });

      // @ts-ignore
      if (poll) intObserver.current.observe(poll);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <DashboardLayout>
      <Container className="justify-center grid md:grid-cols-2 gap-8 gap-y-12 grid-cols-1 pb-20 grid-flow-row">
        {data?.pages.map((polls: any) => {
          return polls.map((poll: any) => {
            return (
              <Card
                key={poll?.id}
                title={poll?.title}
                createdAt={poll?.createdAt}
                slug={poll?.slug}
                vote={poll?.vote}
                // @ts-ignore
                ref={lastPostRef}
              />
            );
          });
        })}
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
