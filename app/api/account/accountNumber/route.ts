import { auth } from "@/auth";
import { getAccountByProps } from "@/lib/action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  try {
    const { searchParams } = new URL(req.url);
    const accountNumber = searchParams.get("accountNumber");

    if (!accountNumber) {
      return NextResponse.json(
        { error: "Account number is required" },
        { status: 400 },
      );
    }

    const senderAccount = await getAccountByProps(
      "email",
      session?.user?.email as string,
    );

    const receiveAccount = await getAccountByProps(
      "accountNumber",
      parseInt(accountNumber),
    );

    if (!receiveAccount?.data) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    if (
      senderAccount?.data?.accountNumber === receiveAccount?.data?.accountNumber
    ) {
      return NextResponse.json(
        { error: "You cannot transfer money to yourself" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      account: receiveAccount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
