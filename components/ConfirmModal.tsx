"use client";
import React, { useActionState, useEffect } from "react";
import MiniLoadingSpinner from "./MiniLoadingSpinner";
import toast from "react-hot-toast";
import { handleCloseAccount } from "@/lib/action";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type FormState = {
  error: string;
  status: "INITIAL" | "SUCCESS" | "ERROR";
  requestId: string;
};

const initialState: FormState = {
  error: "",
  status: "INITIAL",
  requestId: "",
};

const ConfirmModal = ({
  accountNumber,
  isOpen,
  setIsOpen,
  setAccountNumber,
}: {
  accountNumber: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [state, formAction, isPending] = useActionState(
    handleCloseAccount,
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    const handleUpdate = () => {
      if (state.status === "SUCCESS" && state.requestId) {
        toast.success("Your account has been closed successfully!", {
          style: {
            fontSize: "14px",
          },
          duration: 5000,
          id: "success",
        });

        setIsOpen(false);
        setAccountNumber("");

        setTimeout(async () => {
          router.replace("/login");
          await signOut();
        }, 1000);
      }

      if (state.status === "ERROR" && state.error && state.requestId) {
        toast.error(state.error, {
          style: {
            fontSize: "14px",
          },
          duration: 5000,
          id: "error",
        });
      }
    };
    handleUpdate();
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "visible";
    };
  });

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className="bg-black/40 backdrop-blur-xs w-full h-screen z-50 fixed inset-0 grid place-items-center overflow-y-auto data-closed:animate-overlay-hide py-8"
    >
      <form action={formAction}>
        <div
          role="dialog"
          id="radix-_r_6mo_"
          aria-labelledby="radix-_r_6mp_"
          data-state={isOpen ? "open" : "closed"}
          className="relative data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-white z-2000  max-w-screen shadow-md rounded-2xl mx-auto w-[90%] lg:w-[80%] md:w-[70%] sm:w-[70%] p-0 gap-0 pb-5 block! pointer-none:"
        >
          <div className="flex flex-col gap-1.5 text-left py-5 px-5  md:px-8 border-b border-b-stone-200">
            <h2 className="text-[15px] leading-none font-medium">
              <p className="wrap-break-word">
                <span>Confirm to close account</span>
                <span></span>
              </p>
            </h2>
          </div>
          <input
            name="accountNumber"
            type="hidden"
            value={accountNumber}
          ></input>

          <div className="py-5 px-5 md:px-8 overflow-hidden">
            <div className="space-y-4">
              <p className="text-[14px] text-foreground-light">
                <span>Are you sure you want to close </span>
                <span>account</span>
                <span></span>
                <span>? This action cannot be undone.</span>
              </p>
            </div>
          </div>
          <div className="w-full h-px border-b border-b-stone-200"></div>
          <div className="flex gap-5 px-8 pt-8">
            <button
              data-size="medium"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
              type="button"
              className="relative border border-stone-300  bg-white cursor-pointer space-x-2 text-center font-medium ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none duration-200 hover:bg-stone-100 w-full flex items-center justify-center text-[12px] px-4 py-2 h-13 rounded-2xl"
            >
              {" "}
              <span className="truncate font-semibold">Cancel</span>{" "}
            </button>
            <button
              data-size="medium"
              type="submit"
              disabled={isPending}
              className="relative disabled:pointer-events-none cursor-pointer space-x-2 text-center font-medium ease-[cubic-bezier(0.22,1,0.36,1)] duration-200 transition-[background-color,border-color,color,scale] focus-ring control-surface-shadows shadow-xs hover:bg-red-700 w-full flex items-center justify-center text-[12px] px-4 py-2 h-13  bg-red-600 text-white rounded-2xl truncate"
            >
              <span className="flex items-center font-semibold gap-4">
                {isPending ? <MiniLoadingSpinner /> : null}
                Confirm
              </span>
            </button>
          </div>
          <button
            type="button"
            disabled={isPending}
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

export default ConfirmModal;
