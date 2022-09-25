import { useState } from "react";

type UseLoginProps = {
  type: "LOGIN" | "REGISTER";
};

export const useAuthForm = ({ type = "LOGIN" }: UseLoginProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const endpoint = type === "REGISTER" ? "users" : type;

  const onSubmit = (e: any) => {
    setLoading(true);
    fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/${endpoint.toLowerCase()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...e,
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();

        return Promise.reject(res);
      })
      .then((data) => {
        if (data.token) {
          document.cookie = `token=${data.token}`;
          window.location.href = "/dashboard";
        } else if (data.id) window.location.href = "/login";
        else setError(data.message ?? "Error");

        setLoading(false);
      })
      .catch((err) => {
        alert(err.statusText);
        setError(err.statusText ?? "Error");
        setLoading(false);

        return Promise.reject(err.json());
      });
  };

  return [onSubmit, loading, error];
};
