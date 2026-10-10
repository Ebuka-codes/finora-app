import { Fragment, Suspense } from "react";
import { auth } from "@/auth";
import { getAccountByProps } from "@/lib/action";
import Header from "@/components/Header";
import AccountSummary from "@/components/AccountSummary";
import MovementLoading from "@/components/MovementLoading";
import Movements from "@/components/Movements";
import TransactionActions from "@/components/TransactionActions";
import Footer from "@/components/Footer";
import AccountNotFound from "@/components/AccountNotFound";
import LogoutTimer from "@/components/LogoutTimer";
import Welcome from "@/components/Welcome";

type accountProps = {
  searchParams: { [key: string]: string | undefined };
};
export default async function Account({ searchParams }: accountProps) {
  const session = await auth();
  const account = await getAccountByProps(
    "email",
    session?.user?.email as string,
  );
  return (
    <div>
      {session?.user && account.data.status === "ACTIVE" && (
        <Fragment>
          <Header />
          <div className="lg:w-[80%] w-[93%] mx-auto my-10 md:my-15">
            <Welcome />
            <div className="space-y-6">
              <div className="grid items-start gap-10 lg:grid-cols-[350px_minmax(0,1fr)]">
                <AccountSummary />
                <Suspense fallback={<MovementLoading />}>
                  <Movements searchParams={searchParams} />
                </Suspense>
              </div>
              <TransactionActions />
            </div>
            <Footer />
          </div>
        </Fragment>
      )}

      {session?.user && account.data.status === "DISABLED" && (
        <AccountNotFound />
      )}
      <LogoutTimer />
    </div>
  );
}
