import React from "react";
import { auth } from "@/auth";

const Welcome = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "User";
  return (
    <div className="mt-12 mb-5 leading-10">
      <h2 className="md:text-[24px] text-[20px] font-semibold">
        Hello, {firstName}
      </h2>
      <p className="text-gray-500 text-[16px]">Manage your money with Finora</p>
    </div>
  );
};

export default Welcome;
