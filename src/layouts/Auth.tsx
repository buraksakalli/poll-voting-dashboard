import Image from "next/image";
import { Link } from "@/components/index";
import { useAuthText } from "@/hooks/index";
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
              {text.title}
            </h2>
            <div className="mt-2 text-sm text-gray-700">
              <span>{text.description}</span>
              <Link
                href={text.link}
                className="font-medium text-primary hover:underline"
              >
                {text.linkText}
              </Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
