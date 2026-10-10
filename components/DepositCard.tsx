"use client";

import { CreditCardPlus, MoveDownLeft } from "lucide-react";
import MiniLoadingSpinner from "./MiniLoadingSpinner";
import { useActionState, useEffect, useState } from "react";
import { handleDeposit } from "@/lib/action";
import toast from "react-hot-toast";

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

const DepositeCard = () => {
  const [depositAmount, setdepositAmount] = useState<string>("");
  const [state, formAction, isPending] = useActionState(
    handleDeposit,
    initialState,
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(value)) return;

    setdepositAmount(value);
  };

  useEffect(() => {
    const handleUpdate = () => {
      if (state.status === "SUCCESS" && state.requestId) {
        setdepositAmount("");
        toast.success("Your account has been credited successfully!", {
          style: {
            fontSize: "14px",
          },
          duration: 5000,
          id: "success",
        });
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
      <div className="grid gap-7 p-5 lg:grid-cols-[1fr_280px_130px] lg:items-end">
        <div className="flex items-center gap-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <MoveDownLeft size={20} />
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-slate-900">
              Deposit
            </h3>

            <p className="mt-1 text-[13px] text-slate-500">
              Add money to your account
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="deposit-amount"
            className="mb-2 block text-[13px] font-medium text-slate-500"
          >
            Amount
          </label>

          <input
            id="deposit-amount"
            name="amount"
            type="text"
            value={
              depositAmount ? Number(depositAmount).toLocaleString("en-US") : ""
            }
            onChange={handleAmountChange}
            placeholder="e.g. 50,000"
            className="h-14 w-full rounded-xl border border-stone-100 px-4 text-[12px] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={!depositAmount || isPending}
          className="h-16 md:h-14 cursor-pointer rounded-2xl bg-emerald-600 px-5 text-[13px] font-semibold text-white transition hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-60"
        >
          <span className="flex items-center gap-5 justify-center">
            {isPending && <MiniLoadingSpinner />}
            <p>Deposit</p>
          </span>
        </button>
      </div>
    </form>
  );
};

export default DepositeCard;
