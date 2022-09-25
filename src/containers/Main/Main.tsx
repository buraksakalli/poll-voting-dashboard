import { Button, Icon } from "@/components/index";

export const Main = () => {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          <span className="relative whitespace-nowrap text-primary">
            <Icon
              name="LineIcon"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary-300/70"
            />
            <span className="relative">Poll Voting App</span>
          </span>{" "}
          is a real-time polling app
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          It{"'s"} quick and easy to use, with no downloads or sign-ups
          required. If you want to keep track of what your friends are voting
          on, this app is for you!
        </p>
        <div className="flex justify-center my-4">
          <Button variant="primary" className="rounded-full">
            Create a poll
          </Button>
        </div>
      </div>
    </main>
  );
};
