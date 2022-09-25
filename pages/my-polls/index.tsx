import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { getCookie } from "cookies-next";
import { Button, Card, Container, Link } from "@/components/index";
import { DashboardHeader } from "@/containers/index";

const MyPolls: NextPage = () => {
  const [polls, setPolls] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const token = getCookie("token");

    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/user/polls`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPolls(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <DashboardHeader />
      <Container className="justify-center grid md:grid-cols-2 gap-8 gap-y-12 grid-cols-1 pb-20">
        {polls?.map((poll: any) => (
          <Card
            key={poll?.id}
            title={poll?.title}
            createdAt={poll?.createdAt}
            slug={poll?.slug}
            vote={poll?.vote}
          />
        ))}
      </Container>
      {!loading && polls.length === 0 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">You have no polls</h1>
          <div className="flex w-full justify-center">
            <Link href="/create">
              <Button variant="primary" className="rounded-full">
                Create a poll
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPolls;
