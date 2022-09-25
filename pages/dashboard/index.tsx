import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Card, Container } from "@/components/index";
import { DashboardHeader } from "@/containers/index";

const Dashboard: NextPage = () => {
  const [polls, setPolls] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/polls`)
      .then((res) => res.json())
      .then((data) => setPolls(data));
  }, []);

  return (
    <>
      <DashboardHeader />
      <Container className="justify-center grid md:grid-cols-2 gap-8 gap-y-12 grid-cols-1 pb-20">
        {polls.map((poll: any) => (
          <Card
            key={poll?.id}
            title={poll?.title}
            createdAt={poll?.createdAt}
            slug={poll?.slug}
            vote={poll?.vote}
          />
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
