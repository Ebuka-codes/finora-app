import { ReceiptText } from "lucide-react";

const EmptyMovements = () => {
  return (
    <div className="flex py-20 w-full flex-col items-center justify-center rounded-xl border border-stone-200 bg-white px-6 text-center">
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
        <ReceiptText size={30} strokeWidth={1.6} className="text-emerald-300" />
      </div>

      <h3 className="text-[20px] font-medium text-stone-800">
        No transaction Found
      </h3>
    </div>
  );
};

export default EmptyMovements;
