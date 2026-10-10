"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        redirectTo: "/account",
      });

      router.replace("/account");
      router.refresh();
    } catch (error) {
      toast.error("Login failed", {
        style: {
          fontSize: "14px",
        },
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex w-full items-center cursor-pointer justify-center gap-5 rounded-xl border border-stone-200 bg-white px-4 py-4 text-[14px] font-medium text-slate-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.501 12.2331C22.501 11.3698 22.4296 10.7398 22.2748 10.0864H12.2153V13.983H18.12C18.001 14.9514 17.3582 16.4097 15.9296 17.3897L15.9096 17.5202L19.0902 19.9349L19.3106 19.9564C21.3343 18.1247 22.501 15.4297 22.501 12.2331Z"
            fill="#4285F4"
          />
          <path
            d="M12.2147 22.5001C15.1075 22.5001 17.5361 21.5667 19.3099 19.9567L15.929 17.39C15.0242 18.0083 13.8099 18.44 12.2147 18.44C9.38142 18.44 6.97669 16.6083 6.11947 14.0767L5.99382 14.0871L2.68656 16.5955L2.64331 16.7133C4.40519 20.1433 8.02423 22.5001 12.2147 22.5001Z"
            fill="#34A853"
          />
          <path
            d="M6.11997 14.0765C5.89379 13.4232 5.76289 12.7231 5.76289 11.9998C5.76289 11.2764 5.89379 10.5764 6.10807 9.92313L6.10208 9.78398L2.75337 7.23535L2.64381 7.28642C1.91765 8.70977 1.50098 10.3081 1.50098 11.9998C1.50098 13.6915 1.91765 15.2897 2.64381 16.7131L6.11997 14.0765Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2148 5.55997C14.2267 5.55997 15.5838 6.41163 16.3576 7.12335L19.3814 4.23C17.5243 2.53834 15.1076 1.5 12.2148 1.5C8.02426 1.5 4.4052 3.85665 2.64331 7.28662L6.10759 9.92332C6.97672 7.39166 9.38146 5.55997 12.2148 5.55997Z"
            fill="#EB4335"
          />
        </svg>

        <span> {isLoading ? "Signing you in..." : "Continue with Google"}</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-stone-200" />
        <span className="text-[14px] text-slate-400">Secure login</span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>
    </div>
  );
};

export default LoginForm;
