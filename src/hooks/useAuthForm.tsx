import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { authUser } from "../api";

type UseLoginProps = {
  type: "LOGIN" | "REGISTER";
};

export const useAuthForm = ({ type = "LOGIN" }: UseLoginProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const endpoint = type === "REGISTER" ? "users" : type;

  const onSubmit = async (e: any) => {
    setLoading(true);
    authUser(endpoint.toLowerCase(), e)
      .then((res) => {
        if (res.status === 200) return res;

        return Promise.reject(res);
      })
      .then((data) => {
        if (data.token) {
          document.cookie = `token=${data.token}`;
          router.push("/dashboard");
        } else if (data.id) router.push("/login");
        else setError(data.message ?? "Error");

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);

        return Promise.reject(err);
      });
  };

  return [onSubmit, loading, error];
};
