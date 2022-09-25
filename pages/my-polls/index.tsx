import type { NextPage } from "next";
import { useQuery } from "react-query";
import { getUsersPolls } from "@/api/index";
import { DashboardLayout } from "@/layouts/index";
import { Card, Container, Empty } from "@/components/index";

const MyPolls: NextPage = () => {
  const { data, isLoading } = useQuery("userPolls", () => getUsersPolls());

  return (
    <DashboardLayout>
      <Container className="justify-center grid md:grid-cols-2 gap-8 gap-y-12 grid-cols-1 pb-20">
        {data?.map((item: any) => (
          <Card
            key={item?.poll?.id}
            title={item?.poll?.title}
            createdAt={item?.poll?.created_at}
            slug={item?.poll?.slug}
            vote={item?.entries}
            fullname={item?.user.fullname}
            expiryDate={item?.poll?.expiry_date}
          />
        ))}
      </Container>
      {!isLoading && data.length === 0 && <Empty message="You have no polls" />}
    </DashboardLayout>
  );
};

export default MyPolls;
