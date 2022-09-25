import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getCookie } from "cookies-next";
import classNames from "classnames";
import QRCode from "react-qr-code";
import { Button, Container } from "@/components/index";
import { DashboardHeader } from "@/containers/index";
import {
  shareOnFacebook,
  shareOnLinkedin,
  shareOnTwitter,
} from "@/utils/webIntent";

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

const Poll = () => {
  const [poll, setPolls] = useState<PollType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pollOptions, setPollOptions] = useState<PollOptionType>({
    labels: [],
  });
  const [pollSeries, setPollSeries] = useState<Array<number>>();
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [isPollExpired, setIsPollExpired] = useState<boolean>(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (slug)
      fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/polls/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setPolls(data);
          setLoading(false);
          setPollOptions({ labels: data.poll.options });
          setPollSeries(data?.series);
          if (data?.entries.length > 0) setShowGraph(true);
          if (dayjs(data.poll.expiry_date).isBefore(dayjs()))
            setIsPollExpired(true);
        });
  }, [slug]);

  const handleClick = async () => {
    const token = getCookie("token");
    // check if poll is expired then dont allow
    if (dayjs(poll?.poll.expiry_date).isBefore(dayjs())) {
      alert("Poll is expired");
      return;
    }
    await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        poll_id: poll?.poll?._id,
        option: selectedOption,
      }),
    });
  };

  // TODO: Add a loading state

  return (
    <>
      <DashboardHeader />
      <Container className="justify-center grid grid-cols-1 gap-8 gap-y-12 pb-20">
        <section className="w-full">
          <div className="flex items-center md:justify-between flex-col md:flex-row">
            <div>
              <h1 className="tracking-wide text-7xl font-semibold text-inverted">
                {poll?.poll?.title}
              </h1>
              <p className="text-inverted font-thin my-4">
                Created by <span>{poll?.poll?.user_id}</span> at{" "}
                <span className="text-inverted font-thin">
                  {dayjs(poll?.poll?.created_at).format("DD.MM.YYYY HH:mm")}
                </span>
              </p>
              {!isPollExpired ? (
                <p>
                  Voting end in{" "}
                  {dayjs(poll?.poll?.expiry_date).format("DD.MM.YYYY HH:mm")}
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
            {poll?.poll?.options.map((option, index) => (
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
          <div className="flex items-center justify-center">
            <button
              onClick={handleClick}
              disabled={isPollExpired}
              className="disabled:bg-gray-500 active:scale-95 transition-all bg-primary rounded-lg px-4 py-8 text-white md:w-1/3 w-full"
            >
              <span className="text-3xl">Vote</span>
            </button>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Poll;
