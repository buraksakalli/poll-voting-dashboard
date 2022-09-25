import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getCookie } from "cookies-next";
import classNames from "classnames";
import { Container } from "@/components/index";
import { Header } from "@/containers/index";

interface PollType {
  title: string;
  created_at: string;
  slug: string;
  vote?: number;
  expiry_at: string;
  user_id: string;
  options: Array<string>;
  _id: string;
}

const Poll = () => {
  const [poll, setPolls] = useState<PollType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/polls/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPolls(data);
        setLoading(false);
      });
  }, [slug]);

  const handleClick = async () => {
    const token = getCookie("token");

    await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        poll_id: poll?._id,
        option: selectedOption,
      }),
    });
  };

  // TODO: Add a loading state

  return (
    <>
      <Header />
      <Container className="justify-center grid grid-cols-1 gap-8 gap-y-12">
        <section className="w-full">
          <h1 className="tracking-wide text-7xl font-semibold text-inverted">
            {poll?.title}
          </h1>
          <p className="text-inverted font-thin">
            Created by <span>{poll?.user_id}</span> at{" "}
            <span className="text-inverted font-thin">
              {dayjs(poll?.created_at).format("DD.MM.YYYY HH:mm")}
            </span>
          </p>
          <p>
            Voting end in {dayjs(poll?.expiry_at).format("DD.MM.YYYY HH:mm")}
          </p>
          <div className="flex flex-col gap-6 my-6">
            {poll?.options.map((option, index) => (
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
              className="active:scale-95 transition-all bg-primary rounded-lg px-4 py-8 text-white md:w-1/3 w-full"
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
