import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Container, Icon, Input, Spinner } from "@/components/index";
import { DashboardHeader } from "@/containers/index";
import { getCookie } from "cookies-next";
import { slugGenerator } from "@/utils/index";

const Create: NextPage = () => {
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      expiry_date: e.currentTarget.expiry_date.value,
      title: e.currentTarget.poll_title.value,
      slug: slugGenerator(e.currentTarget.poll_title.value),
    };

    const token = getCookie("token");
    const res = await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/polls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        options,
      }),
    }).then((res) => res.json());

    if (res._id) {
      // Show a toast message and redirect to the poll page
      router.push(`/poll/${res.slug}`);
    }
    setLoading(false);
  };

  return (
    <Container>
      <DashboardHeader />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Input type="text" name="poll_title" label="Title" required />
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              type="date"
              name="expiry_date"
              label="Expiration Date"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex mb-3 items-center space-x-2">
              <label className="block text-md font-medium text-gray-700">
                Options
              </label>
              <div className="flex justify-center">
                <Button onClick={handleAddOption} variant="primary">
                  <Icon
                    name="PlusIcon"
                    className="stroke-white rotate-0 group-active:rotate-45 duration-300"
                  />
                </Button>
              </div>
            </div>
            {options.map((option, index) => (
              <div key={index} className="flex flex-col w-full">
                <label
                  className="mb-3 block text-sm font-medium text-gray-700"
                  htmlFor={`option-${index}`}
                >
                  Option {index + 1}
                </label>
                <div className="w-full flex items-center space-x-2">
                  <Input
                    type="text"
                    id={`option-${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(e, index)}
                    required
                  />
                  <Button onClick={() => handleRemoveOption(index)}>
                    <Icon
                      name="PlusIcon"
                      className="stroke-gray-500 rotate-45 group-active:rotate-0 transition-all"
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full justify-center flex items-center">
            <button
              className="active:scale-95 transition-all items-center justify-center flex bg-primary rounded-lg px-4 py-8 text-white md:w-1/3 w-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Create Poll"}
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Create;
