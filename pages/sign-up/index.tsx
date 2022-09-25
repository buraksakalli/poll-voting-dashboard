import { AuthLayout } from "@/layouts/index";
import { Button, Input } from "@/components/index";
import { useAuthForm } from "@/hooks/index";

const SignUp = () => {
  const [onSubmit, loading, error] = useAuthForm({ type: "REGISTER" });

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      username: e.currentTarget.username.value,
      fullname: e.currentTarget.fullname.value,
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
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          required
        />
        <Input
          label="E-mail Address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Full Name"
          name="fullname"
          type="text"
          autoComplete="name"
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
            Sign up <span>→</span>
          </span>
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
