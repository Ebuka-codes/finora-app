"use client";
import LogoutButton from "./LogoutButton";

const UserDropdown = ({
  initials,
  name,
  email,
  isOpen,
}: {
  initials: string;
  name: string;
  email: string;
  isOpen: boolean;
}) => {
  const data = isOpen ? "open" : "closed";
  return (
    <div
      data-state={data}
      className="dropdown absolute data-[state=open]:animate-in top-17 md:right-50 shadow-md data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=open]:animate-out-95 right-4 z-50 w-80 rounded-xl border transition-all border-stone-200 bg-white p-4 "
    >
      <div className="flex gap-4 mb-5">
        <div className="flex text-[12px] h-11 shrink-0 w-11 items-center font-medium justify-center text-white rounded-full bg-emerald-500">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[15px]  font-medium text-stone-900">
            {name}
          </p>

          <p className="truncate text-[13px] text-stone-500">{email}</p>
        </div>
      </div>

      <div className="my-4 border-t border-stone-200" />

      <LogoutButton />
    </div>
  );
};

export default UserDropdown;
