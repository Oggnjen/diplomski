import { toast } from "react-toastify";
import { register } from "./registrationService";
import { useRouter } from "next/router";

export function useRegistration() {
  const router = useRouter();
  return (email: string, password: string, name: string, surname: string) => {
    register({ email, password, name, surname })
      .then((response) => {
        if (response.status == 400) {
          toast.error(response.data);
        } else if (response.status == 200) {
          toast.success("Successfully registered");
          router.push("/login");
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  };
}
