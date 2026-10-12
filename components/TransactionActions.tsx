import TransferCard from "./TransferCard";
import CloseAccountCard from "./CloseAccountCard";
import DepositeCard from "./DepositCard";

const TransactionActions = async () => {
  return (
    <section className="action-container  w-full max-w-400 r rounded-3xl mt-10 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-10">
        <div>
          <h2 className="text-[18px] font-semibold text-slate-900">
            Quick actions
          </h2>

          <p className="mt-1 text-[15px] text-slate-500">
            Manage your account and move money.
          </p>
        </div>
      </div>

      <div className="overflow-hidden space-y-2 rounded-2xl border border-slate-100">
        <DepositeCard />

        <div className="border-t border-stone-100" />

        <TransferCard />

        <div className="border-t border-stone-100" />

        <CloseAccountCard />
      </div>
    </section>
  );
};

export default TransactionActions;
