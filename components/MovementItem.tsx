"use client";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { formattedAmount, formattedDate } from "@/lib/utils";
import { MovementItemProps } from "@/type";
import { useState } from "react";
import TransactionModal from "./TransactionModal";

type MovementItemComponentProps = {
  movement: MovementItemProps;
  isLast?: boolean;
};

const MovementItem = ({
  movement,
  isLast = false,
}: MovementItemComponentProps) => {
  const isCredit = movement.status === "CREDITED";

  const [isOpen, setIsOpen] = useState(false);

  const getTransactionTitle = (movement: MovementItemProps) => {
    if (movement.type === "DEPOSIT") {
      return "Account deposit";
    }

    if (movement.type === "TRANSFER") {
      return movement.status === "CREDITED"
        ? `Transfer from ${movement.counterparty?.accountName}`
        : `Transfer sent to ${movement.counterparty?.accountName}`;
    }

    return "Transaction";
  };

  return (
    <section>
      <div className="pb-3 cursor-pointer" onClick={() => setIsOpen(true)}>
        <div
          className={`flex gap-6  py-4 ${
            !isLast ? "border-b border-stone-100" : ""
          }`}
        >
          <div
            className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full ${
              isCredit
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isCredit ? (
              <MoveDownLeft size={19} strokeWidth={2} />
            ) : (
              <MoveUpRight size={18} strokeWidth={2} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-semibold text-slate-800">
              {getTransactionTitle(movement)}
            </h3>

            <p className="mt-1 text-[12px] text-slate-400">
              {formattedDate(movement.created_at)}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p
              className={`text-[14px] font-semibold ${
                isCredit ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {isCredit ? "+" : "-"}
              {formattedAmount(Math.abs(movement.amount))}
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <TransactionModal
          movement={movement}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </section>
  );
};

export default MovementItem;
