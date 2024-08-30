import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export function useRedirectIfUserNotLogged() {
  const token = sessionStorage.getItem("token");
  if (token == null) {
    window.location.replace("/login");
    toast.error("You must log in");
  } else {
    const payload = jwtDecode(token);
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      sessionStorage.removeItem("token");
      window.location.replace("/login");
      toast.warning("Your login session has expired");
    }
  }
}

export function useRedirectIfUserLogged() {
  const token = sessionStorage.getItem("token");
  if (token != null) {
    window.location.replace("/");
  }
}
