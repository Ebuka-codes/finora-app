"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountNotFound() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      <header className="absolute left-0 top-0 w-full">
        <nav className="mx-auto flex w-full items-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white sm:h-11 sm:w-11 sm:text-lg">
              F.
            </div>

            <h3 className="text-2xl font-semibold sm:text-3xl">Finora</h3>
          </div>
        </nav>
      </header>

      <main className="relative flex w-full flex-1 items-center justify-center px-4">
        <div className="pointer-events-none absolute select-none opacity-5 blur-xs">
          <h1 className="text-[180px] leading-none sm:text-[200px] lg:text-[300px]">
            404
          </h1>
        </div>

        <div className="relative z-10 flex w-full  flex-col items-center justify-center text-center">
          <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
            <h3 className="text-[16px] font-semibold sm:text-[20px]">
              Your account has been deactivated
            </h3>

            <p className="text-[13px] leading-6 text-gray-600 sm:text-[16px] sm:leading-7">
              Your account has been deactivated. Kindly contact our customer
              support for assistance.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white cursor-pointer transition-colors hover:bg-emerald-800 sm:px-6 sm:text-base"
            >
              Return to Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
