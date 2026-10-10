import React from "react";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { Bell } from "lucide-react";

const Header = async () => {
  const session = await auth();

  const name = session?.user?.name;

  const nameParts = name?.split(" ");

  const initials =
    nameParts
      ?.slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U";

  return (
    <React.Fragment>
      <header className=" bg-white py-3 border-b border-stone-100  pb-4">
        <div className="w-[94%] lg:w-[80%] mx-auto">
          <div className="flex justify-between items-center">
            <nav className="mx-auto flex w-full items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-[14px] font-bold text-white sm:h-11 sm:w-11 sm:text-lg">
                  F.
                </div>

                <h3 className="text-2xl font-semibold sm:text-3xl">Finora</h3>
              </div>
            </nav>
            <div className="flex gap-5 items-center">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 hover:bg-stone-50 transistion-all border border-stone-100 items-center justify-center rounded-full transition"
              >
                <Bell size={18} strokeWidth={1.8} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
              </button>

              <UserMenu
                initials={initials}
                name={session?.user?.name as string}
                email={session?.user?.email as string}
              />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
