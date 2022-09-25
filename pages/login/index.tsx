import { Button, Input } from "@/components/index";
import { AuthLayout } from "@/layouts/index";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: res.email,
        password: res.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          document.cookie = `token=${data.token}`;
          window.location.href = "/";
        }
        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <form
        className="mt-10 grid grid-cols-1 gap-y-4"
        onSubmit={handleOnSubmit}
      >
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
          variant={!loading ? "primary" : "loading"}
          type="submit"
          className="rounded-full text-white flex justify-center"
          disabled={loading}
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
