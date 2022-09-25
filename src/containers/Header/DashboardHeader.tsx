import Image from "next/image";
import { Button, Icon, Link } from "@/components/index";

export const DashboardHeader = () => {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-16 text-center">
      <div className="mx-auto max-w-7xl">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/dashboard">
              <Image src="/cactus.png" alt="logo" width={60} height={60} />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Link href="/my-polls">
                <Button className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                  My polls
                </Button>
              </Link>
            </div>
            <Link href="/create">
              <Button variant="primary" className="rounded-full">
                Create a Poll
              </Button>
            </Link>
            <div className="-mr-1 md:hidden">
              <Button className="relative z-10 flex h-8 w-8 items-center justify-center">
                <Icon name="MenuIcon" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
