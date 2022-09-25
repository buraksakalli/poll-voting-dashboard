import { Button, Link } from "@/components/index";

export const Empty: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{message}</h1>
      <div className="flex w-full justify-center my-6">
        <Link href="/create">
          <Button variant="primary" className="rounded-full">
            Create a poll
          </Button>
        </Link>
      </div>
    </div>
  );
};
