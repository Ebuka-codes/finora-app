"use client";

import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Period = "all" | "1days" | "30days";

type FilterProps = {
  selectedPeriod: Period;
};

const Filter = ({ selectedPeriod }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options: { label: string; value: Period }[] = [
    { label: "30+ Transactions", value: "all" },
    // { label: "1 days", value: "1days" },
    // { label: "30 days", value: "30days" },
  ];

  const handleFilter = (period: Period) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (period === "all") {
      params.delete("period");
    } else {
      params.set("period", period);
    }

    const query = params.toString();

    // const url = `${pathname}?${query}` as Route;

    // router.push(query ? url : pathname, {
    //   scroll: false,
    // });
  };

  return (
    <div className="flex items-center gap-1 rounded-3xl bg-stone-50 p-1">
      {options.map(({ label, value }) => {
        const isActive = selectedPeriod === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleFilter(value)}
            aria-pressed={isActive}
            disabled={isActive}
            className={`shrink-0 rounded-2xl cursor-pointer px-3 py-2 text-[11px] font-medium transition ${
              isActive
                ? "bg-stone-200 text-emerald-600"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
