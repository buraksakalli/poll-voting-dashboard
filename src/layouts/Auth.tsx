import { Link } from "@/components";
import { useAuthText } from "@/hooks";
import Image from "next/image";
import { LayoutsProps } from "./layouts.types";

export const AuthLayout: React.FC<LayoutsProps> = ({ children }) => {
  const { text } = useAuthText();

  return (
    <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 sm:justify-center md:flex-none md:px-28">
      <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
        <div className="flex flex-col">
          <Link href="/" className="flex justify-center">
            <Image
              src="/cactus.png"
              alt="logo"
              width={60}
              height={60}
              objectFit="contain"
            />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              {text.linkText}
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              {text.description}
              <Link href={text.link}>
                <a className="font-medium text-primary hover:underline">
                  {text.linkText}
                </a>
              </Link>
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
