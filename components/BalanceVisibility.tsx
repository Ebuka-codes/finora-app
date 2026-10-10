"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type BalanceVisibilityProps = {
  balance: string;
  accountNumber?: string;
};

const BalanceVisibility = ({
  balance,
  accountNumber,
}: BalanceVisibilityProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const content = document.body.querySelector(".action-container");

    content?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="relative mt-5 space-y-3 md:mt-10">
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label={isVisible ? "Hide balance" : "Show balance"}
        className="absolute right-2 top-10 lg:-right-6 lg:-top-4  cursor-pointer text-white transition hover:text-white/70"
      >
        {isVisible ? (
          <Eye size={22} strokeWidth={1.8} />
        ) : (
          <EyeOff size={22} strokeWidth={1.8} />
        )}
      </button>

      <p className="text-[14px] font-medium text-white">Available balance</p>

      <p className="mt-2 pr-8 text-4xl md:text-5xl font-bold tracking-tight text-white">
        {isVisible ? balance : "₦••••••"}
      </p>

      <div className="lg:my-10 my-5  h-px bg-white/15" />
      <div className="space-y-2 flex items-center justify-between">
        <span>
          <p className="text-[14px] text-white">Account number</p>
          <p className="text-[14px] font-semibold tracking-wide text-white">
            {accountNumber || "----------"}
          </p>
        </span>
        <span
          onClick={handleScroll}
          className="bg-white w-40 h-11 text-center hover:bg-emerald-500 hover:text-white transition-all duration-400 flex justify-center items-center rounded-3xl text-[14px] text-emerald-500 cursor-pointer"
        >
          + Add Money
        </span>
      </div>
    </div>
  );
};

export default BalanceVisibility;
