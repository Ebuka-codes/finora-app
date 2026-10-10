"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const INACTIVITY_TIME = 100 * 30;

const LogoutTimer = () => {
  const [time, setTime] = useState(INACTIVITY_TIME);
  const router = useRouter();

  useEffect(() => {
    const resetTimer = () => {
      setTime(INACTIVITY_TIME);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const interval = setInterval(() => {
      setTime((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(interval);
          router.replace("/session-expired");
          signOut({ redirectTo: "/session-expired" });
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router]);

  return <div className="text-[14px] text-center"></div>;
};

export default LogoutTimer;
