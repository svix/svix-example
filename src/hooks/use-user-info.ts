import { useEffect, useState } from "react";
import { getClientAvatar, getClientLogo, getClientUser } from "@/auth";

export function useUserInfo() {
  const [logo, setLogo] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setLogo(getClientLogo());
    setAvatar(getClientAvatar());
    setUsername(getClientUser());
  }, []);

  return { logo, avatar, username };
}
