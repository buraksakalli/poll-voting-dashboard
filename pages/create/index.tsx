import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Card, Container, Input } from "@/components/index";
import { DashboardHeader } from "@/containers/index";
import { getCookie } from "cookies-next";
import slugGenerator from "@/utils/slugGenerator";

/* Requirements:
  1- Create an input for title title
  2- Create an input for expiration date
  3- Create at least to inputs for options.
  4- Create a button to add more options
  5- Create a button to submit the form
  6- User can add maximum 5 options
  7- User can add minimum 2 options
  8- User can't submit the form if there is no title or expiration date
  9- User can't submit the form if there is no options
  10- User can't submit the form if there is no title or expiration date
  11- User can't remove the last two options
*/
//Example

const Create: NextPage = () => {
  const [options, setOptions] = useState(["", ""]);

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

  /*

title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      expiry_date: e.currentTarget.expiry_date.value,
      title: e.currentTarget.poll_title.value,
      slug: slugGenerator(e.currentTarget.poll_title.value),
    };
    console.log(form, options);

    const token = getCookie("token");
    await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/polls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        options,
      }),
    });
  };

  return (
    <Container>
      <DashboardHeader />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Input type="text" name="poll_title" label="Title" />
          </div>
          <div className="flex flex-col space-y-2">
            <Input type="date" name="expiry_date" label="Expiration Date" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="options">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  id="options"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Container>
  );
};

// const CreatePoll: NextPage = () => {
//   return (
//     <>
//       <DashboardHeader />
//       <Container className="justify-center grid md:grid-cols-2 gap-8 gap-y-12 grid-cols-1"></Container>
//     </>
//   );
// };

export default Create;
