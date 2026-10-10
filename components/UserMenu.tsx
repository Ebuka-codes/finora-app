"use client";
import { User2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import UserDropdown from "./UserrDropdown";

const UserMenu = ({
  initials,
  name,
  email,
}: {
  name: string;
  initials: string;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return (
    <div ref={ref}>
      <div className="flex gap-3 items-center">
        <span
          onClick={() => setIsOpen((open) => !open)}
          className="flex cursor-pointer h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-500 text-[14px] font-semibold text-white sm:h-10 sm:w-10"
        >
          <User2Icon size={18} strokeWidth={1.8} />
        </span>
      </div>

      {isOpen && (
        <UserDropdown
          initials={initials}
          name={name}
          email={email}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default UserMenu;
