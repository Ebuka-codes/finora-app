import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute top-0 left-0 mx-auto w-full max-w-3xl px-8 pt-6 sm:px-6 lg:px-20">
        <nav className="relative flex items-center justify-between sm:h-10">
          <div className="flex shrink-0 grow lg:grow-0">
            <span className="flex gap-3 items-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-[18px] font-bold text-white">
                B
              </div>
              <h3 className="text-3xl font-semibold">Bankist</h3>
            </span>
          </div>
        </nav>
      </div>
      <div className="absolute  opacity-5 filter transition duration-200 blur-xs">
        <h1 className="lg:text-[400px] text-[250px]">404</h1>
      </div>

      <div className="flex z-1000 flex-col items-center justify-center space-y-6 transition opacity-100">
        <div className="flex w-300 flex-col items-center justify-center space-y-5 text-center">
          <h3 className="text-[22px] font-medium">Looking for something? 🔍</h3>
          <p className="text-2xl font-normal">
            {"We couldn't find the page that you're looking for!"}
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-emerald-600 text-xl mt-1 rounded-4xl text-white py-3 hover:bg-emerald-800 transition-all  px-6">
          <Link href="/account">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
