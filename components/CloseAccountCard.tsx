"use client";

import React, { useState } from "react";
import { MinusCircle } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

const CloseAccountCard = () => {
  const [accountNumber, setAccountNumber] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const checkAccountNumber = () => {
    if (accountNumber.length === 10) return true;
    return false;
  };

  const handleCloseAccount = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_280px_130px] lg:items-end">
        <div className="flex items-center gap-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <MinusCircle size={20} />
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">
              Close Account
            </h3>

            <p className="mt-1 text-[13px] text-slate-500">
              Permanently close your account
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="account-number"
            className="mb-2 block text-[13px] font-medium text-slate-500"
          >
            Account number
          </label>

          <input
            type="number"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. 1234567890"
            className="h-14 w-full rounded-xl text-[13px] border border-stone-200  px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
          />
        </div>

        <button
          type="button"
          onClick={handleCloseAccount}
          disabled={!checkAccountNumber() || !accountNumber}
          className="h-16 md:h-14 rounded-2xl border bg-red-600 cursor-pointer text-[13px] px-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
        >
          <span className="flex items-center gap-4 justify-center">
            <p>Close Account</p>
          </span>
        </button>
      </div>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
        />
      )}
    </div>
  );
};

export default CloseAccountCard;
