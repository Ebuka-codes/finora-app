const MovementLoading = () => {
  return (
    <section className="min-w-0 rounded-2xl bg-white px-3">
      <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
        <div>
          <div className="h-6 w-40 animate-pulse rounded-md bg-slate-100" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-slate-100" />
        </div>

        <div className="h-9 w-28 animate-pulse rounded-full bg-slate-100" />
      </div>

      <div className="flex min-h-60 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-200 border-t-emerald-600" />

          <p className="mt-3 text-[14px] text-slate-500">
            Loading transactions...
          </p>
        </div>
      </div>
    </section>
  );
};

export default MovementLoading;
