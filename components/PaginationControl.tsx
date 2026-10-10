"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationControls = ({
  currentPage,
  totalPages,
}: PaginationControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState<number | null>(null);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isPending) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    setLoadingPage(page);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const buttonClass =
    "flex items-center justify-center gap-1 rounded-xl border border-stone-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex items-center justify-between gap-3 border-t border-stone-100 py-4">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className={buttonClass}
      >
        {isPending && loadingPage === currentPage - 1 ? (
          <Loader2 size={15} className="animate-spin text-emerald-600" />
        ) : (
          <ChevronLeft size={15} />
        )}
        Previous
      </button>

      <span className="text-[11px] text-stone-500">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className={buttonClass}
      >
        Next
        {isPending && loadingPage === currentPage + 1 ? (
          <Loader2 size={15} className="animate-spin text-emerald-600" />
        ) : (
          <ChevronRight size={15} />
        )}
      </button>
    </div>
  );
};

export default PaginationControls;
