import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import classNames from "classnames";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { DashboardLayout } from "@/layouts/index";
import { Button, Container, Spinner } from "@/components/index";
import {
  shareOnFacebook,
  shareOnLinkedin,
  shareOnTwitter,
} from "@/utils/webIntent";
import { createEntry, getPoll } from "@/api/index";

interface IPoll {
  title: string;
  created_at: string;
  slug: string;
  vote?: number;
  expiry_date: string;
  user_id: string;
  options: Array<string>;
  _id: string;
}

interface PollType {
  poll: IPoll;
  entry: any;
}

type PollOptionType = {
  labels: Array<string>;
};

const Poll = ({ slug }: { slug: string }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pollOptions, setPollOptions] = useState<PollOptionType>({
    labels: [],
  });
  const [pollSeries, setPollSeries] = useState<Array<number>>();
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [isPollExpired, setIsPollExpired] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("poll", () => getPoll(String(slug)));

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data?.poll?._id) {
      setPollOptions({ labels: data.poll.options });
      setPollSeries(data.series);
      if (data.entries.length > 0) setShowGraph(true);
      if (dayjs(data.poll.expiry_date).isBefore(dayjs())) {
        setIsPollExpired(true);
      }
    }
  }, [data]);

  const handleClick = async () => {
    setLoading(true);
    if (selectedOption) {
      if (dayjs(data?.poll.expiry_date).isBefore(dayjs())) {
        toast.error("Poll has expired");
        return;
      }

      const res = await createEntry({
        poll_id: data?.poll._id!,
        option: selectedOption,
      }).catch((err) => {
        toast.error(err.response.data.message);
      });

      if (res?.data?._id) {
        queryClient.invalidateQueries("poll");
        toast.success("Your vote has been recorded");
      }
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <Container className="justify-center grid grid-cols-1 gap-8 gap-y-12 pb-20">
        <section className="w-full">
          <div className="flex items-center md:justify-between flex-col md:flex-row">
            <div>
              <h1 className="tracking-wide text-3xl md:text-5xl font-semibold text-inverted md:max-w-3xl">
                {data?.poll?.title}
              </h1>
              <p className="text-inverted font-thin my-4">
                Created by <span>{data?.user?.fullname}</span> at{" "}
                <span className="text-inverted font-thin">
                  {dayjs(data?.poll?.created_at).format("DD.MM.YYYY HH:mm")}
                </span>
              </p>
              {!isPollExpired ? (
                <p>
                  Voting end on{" "}
                  {dayjs(data?.poll?.expiry_date).format("DD.MM.YYYY")}
                </p>
              ) : (
                "Poll is expired"
              )}
            </div>
            <div className="flex items-center">
              <div
                style={{
                  height: "auto",
                  maxWidth: 32,
                  width: "100%",
                }}
                className="hover:scale-[10] bg-white transform transition duration-300 ease-in-out"
              >
                <QRCode
                  value={!loading ? window?.location?.href : ""}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  size={256}
                />
              </div>
              <Button onClick={shareOnFacebook}>Facebook</Button>
              <Button onClick={shareOnTwitter}>Twitter</Button>
              <Button onClick={shareOnLinkedin}>LinkedIN</Button>
            </div>
          </div>

          <div className="flex w-full my-10 justify-center">
            {showGraph && (
              <ApexCharts
                options={pollOptions}
                series={pollSeries}
                type="donut"
                width="380"
              />
            )}
          </div>
          <div className="flex flex-col gap-6 my-6">
            {data?.poll?.options.map((option: any, index: number) => (
              <button key={index} onClick={() => setSelectedOption(option)}>
                <div
                  key={index}
                  className={classNames(
                    "shadow-sm p-6 text-3xl font-medium rounded-lg flex items-center gap-4 bg-gray-50",
                    selectedOption === option &&
                      "border-2 border-primary translate-x-2 md:translate-x-4 duration-700 transition-all"
                  )}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                    <div
                      className={classNames(
                        "w-3 h-3 rounded-full",
                        selectedOption === option && "bg-primary"
                      )}
                    ></div>
                  </div>
                  <p>{option}</p>
                </div>
              </button>
            ))}
          </div>
          {isLoading && (
            <div className="flex items-center w-full justify-center pb-20">
              <Spinner />
            </div>
          )}
          {!isLoading && (
            <div className="flex items-center justify-center">
              <button
                onClick={handleClick}
                disabled={isPollExpired || loading}
                className="flex disabled:bg-gray-500 active:scale-95 transition-all bg-primary rounded-lg px-4 py-8 text-white md:w-1/3 w-full items-center justify-center"
              >
                {loading && <Spinner />}
                <span className="text-3xl">Vote</span>
              </button>
            </div>
          )}
        </section>
      </Container>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug ?? "";

  if (!slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
    },
  };
};

export default Poll;
