"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "../token";

const OAuth2RedirectHandler = () => {
  const router = useRouter();

  const getUrlParameter = (name: string) => {
    if (typeof window === "undefined") return "";
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      router.push("/profile");
    } else {
      router.push(`/login?error=${error || ""}`);
    }
  }, [router]);

  return null; // No UI is rendered
};

export default OAuth2RedirectHandler;