"use client";
import { formattedAmount, formattedDate } from "@/lib/utils";
import { MovementItemProps } from "@/type";
import React, { useEffect } from "react";

const TransactionModal = ({
  movement,
  isOpen,
  setIsOpen,
}: {
  movement: MovementItemProps;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isCredit = movement.status === "CREDITED";

  const getTransactionTitle = (movement: MovementItemProps) => {
    if (movement.type === "DEPOSIT") {
      return `Account deposit by ${movement.counterparty?.accountName}`;
    }

    if (movement.type === "TRANSFER") {
      return movement.status === "CREDITED"
        ? `WEB TRF from ${movement.counterparty?.accountName}`
        : `WEB TRF sent to ${movement.counterparty?.accountName}`;
    }

    return "Transaction";
  };

  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "visible";
    };
  });

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className="bg-black/40 backdrop-blur-xs w-full h-screen z-1000 fixed inset-0 grid place-items-center overflow-y-auto data-closed:animate-overlay-hide py-8"
    >
      <form>
        <div
          role="dialog"
          id="radix-_r_6mo_"
          aria-labelledby="radix-_r_6mp_"
          data-state={isOpen ? "open" : "closed"}
          className="relative data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-white z-20000  max-w-screen shadow-md rounded-2xl mx-auto w-[90%] lg:w-[95%] md:w-[70%] sm:w-[70%] p-0 gap-0 pb-5 block! pointer-none:"
        >
          <div className="flex flex-col gap-1.5 text-left py-5 px-4 md:px-6 border-b border-b-stone-200">
            <h2 className="text-[16px] leading-none font-medium">
              <p className="wrap-break-word">
                <span>Transaction Details</span>
                <span></span>
              </p>
            </h2>
          </div>

          <h2 className="text-[13px] uppercase px-6  my-6 font-medium">
            {formattedDate(movement.created_at)}
          </h2>

          <div className="rounded-lg bg-[#F7F7F7] px-6 mx-5 my-6">
            <div className="grid grid-cols-3 border-b border-stone-200 py-6 align-middle text-[13px]">
              <span className="block text-[#667085]">Amount</span>
              <span className="col-span-2 block max-w-[80%] text-end font-semibold text-[#363A43]">
                {isCredit ? "+" : "-"}
                {formattedAmount(Math.abs(movement.amount))}
              </span>
            </div>

            <div className="grid grid-cols-3 border-b border-stone-200 py-6 align-middle text-[13px]">
              <span className="block text-[#667085]">Narration</span>
              <span className="col-span-2 uppercase  block max-w-[80%] text-end font-semibold text-[#363A43]">
                {getTransactionTitle(movement)}
              </span>
            </div>
            <div className="grid grid-cols-3 py-6 align-middle text-[13px]">
              <span className="block text-[#667085]">Reference</span>
              <span className="col-span-2 block max-w-[80%] text-end font-semibold text-[#363A43]">
                {movement.reference}
              </span>
            </div>
          </div>
          <div className="w-full h-px border-b border-b-stone-200"></div>
          <div className="flex gap-5 px-8 pt-5">
            <button
              data-size="medium"
              onClick={() => setIsOpen(false)}
              type="button"
              className="relative border w-60 mx-auto border-stone-300  bg-white cursor-pointer space-x-2 text-center font-medium ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none duration-200 hover:shadow-sm  flex items-center justify-center text-[12px] px-4 py-2 h-14 rounded-2xl"
            >
              {" "}
              <span className="truncate font-semibold">Cancel</span>{" "}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute p-0.5 right-3.5 top-3.5 rounded-xs opacity-20 transition-opacity hover:opacity-100 focus-ring disabled:pointer-events-none data-[state=open]:bg-accent text-foreground-muted hit-area-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionModal;
