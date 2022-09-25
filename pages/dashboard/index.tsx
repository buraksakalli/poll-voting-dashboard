import { useCallback, useRef } from "react";
import type { NextPage } from "next";
import { useInfiniteQuery } from "react-query";
import { getPollsPage } from "@/api/index";
import { DashboardLayout } from "@/layouts/index";
import { Card, Container, Empty, Spinner } from "@/components/index";

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
          return polls.map((item: any) => {
            return (
              <Card
                key={item?.poll.id}
                title={item?.poll.title}
                createdAt={item?.poll.createdAt}
                slug={item?.poll.slug}
                vote={item?.entries}
                fullname={item?.user.fullname}
                // @ts-ignore
                ref={lastPostRef}
                expiryDate={item?.poll?.expiry_date}
              />
            );
          });
        })}
      </Container>
      {data?.pages[0].length === 0 && <Empty message="No polls found" />}
      {isFetchingNextPage && (
        <div className="flex items-center w-full justify-center pb-20">
          <Spinner />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
