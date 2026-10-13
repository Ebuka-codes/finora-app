import { auth } from "@/auth";
import { getAccountByProps, getMovementByAccountId } from "@/lib/action";
import { formattedAmount } from "@/lib/utils";
import {
  ArrowLeftRight,
  MoveDownLeft,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import BalanceVisibility from "./BalanceVisibility";

const AccountSummary = async () => {
  const session = await auth();

  let balance = 0;
  let account;

  if (session?.user?.email) {
    const res = await getAccountByProps("email", session.user.email);

    account = res.data;

    if (res.data) {
      const { data } = await getMovementByAccountId(res.data.id);
      console.log(data);

      if (data) {
        balance = data.reduce((total, movement) => total + movement.amount, 0);
      }
    }
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-800 p-5 lg:p-12 shadow-md">
        <div className="absolute -right-16 top-20 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex md:h-18 md:w-18 h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
            <Wallet size={20} strokeWidth={1.8} />
          </div>

          <BalanceVisibility
            balance={formattedAmount(balance)}
            accountNumber={account?.accountNumber}
          />
        </div>
      </div>
      <div className="bg-white flex max-w-md justify-center gap-10 border border-[#f0f1f2f7] rounded-3xl py-6 mt-10">
        <div className="flex items-center flex-col gap-1 gap-y-3">
          <div className="flex h-13 w-13 shrink-0 bg-[#ecfdf5] text-emerald-600 items-center justify-center rounded-full">
            <MoveDownLeft size={19} />
          </div>
          <span className="text-[12px] font-medium">Deposit</span>
        </div>

        <div className="flex items-center flex-col gap-1 gap-y-3">
          <div className="flex h-14 w-14 shrink-0 bg-blue-50 text-blue-600 items-center justify-center rounded-full">
            <ArrowLeftRight size={20} />
          </div>
          <span className="space-y-2 text-[12px] font-medium">Transfer</span>
        </div>

        <div className="flex items-center flex-col gap-1 gap-y-3">
          <div className="flex h-14 w-14 shrink-0 bg-orange-50 text-orange-600 items-center justify-center rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.07227 8.99998C5.80996 7.72226 6.88661 6.67343 8.1832 5.96944C9.47979 5.26545 10.9458 4.93373 12.4192 5.01094C13.8925 5.08816 15.3158 5.57131 16.5317 6.40697C17.7476 7.24264 18.7087 8.39826 19.3088 9.74609"
                stroke="#F57E20"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M3.2304 6.51531L3.95981 9.67485C4.08405 10.213 4.621 10.5485 5.15913 10.4243L8.31867 9.69487"
                stroke="#F57E20"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M18.9277 16.9998C18.19 18.2775 17.1134 19.3263 15.8168 20.0303C14.5202 20.7343 13.0542 21.066 11.5808 20.9888C10.1075 20.9116 8.68418 20.4284 7.46828 19.5928C6.25238 18.7571 5.29126 17.6015 4.69117 16.2537"
                stroke="#F57E20"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M20.7696 19.4844L20.0402 16.3249C19.916 15.7868 19.379 15.4512 18.8409 15.5755L15.6813 16.3049"
                stroke="#F57E20"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <span className="space-y-2 text-[12px] font-medium">History</span>
        </div>

        <div className="flex items-center flex-col gap-1 gap-y-3">
          <div className="flex h-14 w-14 shrink-0 bg-[#ecfdf5] text-emerald-600 items-center justify-center rounded-full">
            <ShieldCheck size={20} />
          </div>
          <span className="space-y-2 text-[12px] font-medium">Security</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
