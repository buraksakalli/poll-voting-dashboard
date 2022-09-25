import { Button, Input } from "@/components/index";
import { useAuthForm } from "@/hooks/index";
import { AuthLayout } from "@/layouts/index";

const LoginPage = () => {
  const [onSubmit, loading, error] = useAuthForm({ type: "LOGIN" });

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    // @ts-ignore
    onSubmit(body);
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
          className="rounded-full flex justify-center"
          disabled={Boolean(loading)}
        >
          <span className="flex items-center gap-2">
            Sign in <span>→</span>
          </span>
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
