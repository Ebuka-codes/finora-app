"use client";
import { handleTransfer } from "@/lib/action";
import { ArrowLeftRight } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MiniLoadingSpinner from "./MiniLoadingSpinner";

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

const TransferCard = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [state, formAction, isPending] = useActionState(
    handleTransfer,
    initialState,
  );

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    setAccountNumber(value);

    if (value.length !== 10) {
      setRecipientName("");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/account/accountNumber?accountNumber=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setRecipientName("");
        toast.error(data.error || "Failed to fetch account details", {
          style: {
            fontSize: "14px",
          },
          id: "error",
        });

        return;
      }
      setRecipientName(data.account.data.accountName || "");
    } catch (error) {
      toast.error("An error occurred", {
        style: {
          fontSize: "14px",
        },
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(value)) return;

    setAmount(value);
  };
  useEffect(() => {
    const handleUpdate = () => {
      if (state.status === "SUCCESS" && state.requestId) {
        setAccountNumber("");
        setAmount("");
        setRecipientName("");
        toast.success(
          "Transfer successful! The money has been sent successfully",
          {
            style: {
              fontSize: "14px",
            },
            duration: 5000,
            id: "success",
          },
        );
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
  }, [state.status, state.error, state.requestId]);

  return (
    <form action={formAction}>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_280px_280px_140px] pb-10 lg:items-end">
        <div className="flex items-center gap-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ArrowLeftRight size={20} />
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-slate-900">
              Transfer
            </h3>

            <p className="mt-1 text-[13px] text-slate-500">
              Send money to another account
            </p>
          </div>
        </div>

        <div className="relative mt-1 lg:mt-0 ">
          <label
            htmlFor="account-number"
            className="mb-2 block text-[13px] font-medium text-slate-500"
          >
            Beneficiary account number
          </label>
          <input
            id="account-number"
            name="accountNumber"
            type="text"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            placeholder="e.g. 1234567890"
            className="h-14 w-full rounded-xl border border-stone-200 px-4 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
          />
          <p className="absolute left-0 top-full mt-2 text-[13px] text-slate-500">
            {isLoading ? "..." : recipientName}
          </p>
        </div>

        <div className={`${recipientName || isLoading ? "mt-5" : "mt-0"}`}>
          <label
            htmlFor="transfer-amount"
            className="mb-2 block text-[13px] font-medium text-slate-500"
          >
            Amount
          </label>

          <input
            id="transfer-amount"
            name="amount"
            type="text"
            value={amount ? Number(amount).toLocaleString("en-US") : ""}
            onChange={handleAmountChange}
            placeholder="e.g. 50,000"
            className="h-14 w-full text-[13px] rounded-xl border border-stone-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 "
          />
        </div>
        <button
          type="submit"
          disabled={
            !accountNumber ||
            !amount ||
            isPending ||
            isLoading ||
            !recipientName
          }
          className="h-16 md:h-14 cursor-pointer rounded-2xl bg-emerald-600 px-5 text-[13px] font-semibold text-white transition hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-60"
        >
          <span className="flex items-center gap-5 justify-center">
            {isPending && <MiniLoadingSpinner />}
            <p>Transfer</p>
          </span>
        </button>
      </div>
    </form>
  );
};

export default TransferCard;
