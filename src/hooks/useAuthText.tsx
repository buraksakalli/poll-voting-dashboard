import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type AuthTextProps = {
  link: string;
  title: string;
  description: string;
  linkText: string;
};

export const useAuthText = () => {
  const initialState = {
    link: "",
    title: "",
    description: "",
    linkText: "",
  };

  const [text, setText] = useState<AuthTextProps>(initialState);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (pathname === "/sign-up") {
      setText({
        link: "/login",
        title: "Sign up",
        description: "Do you have an account? ",
        linkText: "Sign in",
      });
    } else {
      setText({
        link: "/sign-up",
        title: "Sign in",
        description: "Don't have an account? ",
        linkText: "Sign up",
      });
    }
  }, [pathname]);

  return { text };
};
