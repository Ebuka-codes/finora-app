"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({
      redirectTo: "/login",
    });

    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center hover:bg-slate-50 gap-3 rounded-xl px-2 py-2 text-sm transition cursor-pointer"
    >
      <LogOut size={18} className="text-red-600" />
      <span className="text-[14px]">Logout</span>
    </button>
  );
};

export default LogoutButton;
