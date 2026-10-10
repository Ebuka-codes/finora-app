import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-[14px] font-bold text-white">
              F.
            </div>

            <h1 className="text-[20px] font-bold text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-[14px] text-slate-500">
              Sign in to access your Bankist account
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-[14px] text-slate-400">
          Secure banking made simple.
        </p>
      </div>
    </div>
  );
};

export default Login;
