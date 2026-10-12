import { auth } from "@/auth";
import { getAccountByProps, getAllMovement } from "@/lib/action";
import MovementItem from "./MovementItem";
import PaginationControls from "./PaginationControl";

type accountProps = {
  searchParams: { [key: string]: string | undefined };
};

const Movements = async ({ searchParams }: accountProps) => {
  const params = await searchParams;
  const itemsPerPage = 10;

  const currentPage = Math.max(
    1,
    parseInt((params.page as string) || "1", 10) || 1,
  );

  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const accountResponse = await getAccountByProps("email", session.user.email);

  const account = accountResponse.data;

  if (!account) {
    return null;
  }

  const { data: movementResponse, count } = await getAllMovement(
    account.id,
    currentPage,
    itemsPerPage,
  );

  const totalPages = Math.ceil((count ?? 0) / itemsPerPage);
  const movements = movementResponse ?? [];

  return (
    <section className="min-w-0 overflow-y-auto rounded-3xl  bg-white px-5 scrollbar-thin">
      <div className="mb-2 flex items-center justify-between gap-4 border-b border-stone-100 pb-5 pt-7">
        <div>
          <h2 className="text-[16px] font-semibold text-slate-900 sm:text-[18px]">
            Recent Transactions
          </h2>
        </div>

        <button
          type="button"
          className={`shrink-0  rounded-3xl bg-stone-50 p-1 cursor-pointer px-3 py-2 text-[11px] sm:text-[12px] font-medium transition `}
        >
          {movements.length + 1 >= 100
            ? "99+ Transactions"
            : `${movements.length + 1} Transactions`}
        </button>
      </div>

      <div>
        {movements.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="text-center">
              <p className="text-[15px] font-medium text-slate-700">
                No transactions found
              </p>

              <p className="mt-1 text-[14px] text-slate-400">
                Your account activity will appear here
              </p>
            </div>
          </div>
        ) : (
          <div>
            {movements.map((movement, index) => (
              <MovementItem
                key={movement.id}
                movement={movement}
                isLast={index === movements.length - 1}
              />
            ))}

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Movements;
