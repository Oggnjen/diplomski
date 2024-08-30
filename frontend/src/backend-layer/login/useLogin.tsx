import { useRouter } from "next/router";
import { login } from "./loginService";
import { toast } from "react-toastify";

export function useLogin() {
  const router = useRouter();
  return (email: string, password: string) => {
    login({ email, password })
      .then((response) => {
        sessionStorage.setItem("token", response.data);
        toast.success("Successfully logged");
        router.push("/");
      })
      .catch(() => toast.error("Email or password not correct"));
  };
}
