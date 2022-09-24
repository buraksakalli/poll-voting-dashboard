import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthLayout } from "@/layouts";
import { Button, Input } from "@/components";

const Login: NextPage = () => {
  return (
    <AuthLayout>
      <form className="mt-10 grid grid-cols-1 gap-y-4">
        <Input
          label="E-mail Address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="password"
          required
        />
        <Button
          variant="primary"
          type="submit"
          className="rounded-full text-white flex justify-center"
        >
          <span className="flex items-center gap-2">
            Sign in <span>→</span>
          </span>
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
