"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  generateReference,
  generateRquestId,
  parseServerActionResponse,
} from "./utils";
import z from "zod";

import { Credentials, FormState } from "@/type";

export async function handleDeposit(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        ...prevState,
        error: "You are not authenticated",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const account = await getAccountByProps("email", session.user.email);

    if (!account.data) {
      return {
        ...prevState,
        error: "Account not found",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const formSchema = z.object({
      amount: z.coerce.number().min(100, "Minimum deposit is 100"),
    });

    const result = formSchema.safeParse({
      amount: Number(formData.get("amount")?.toString().replace(/,/g, "")),
    });

    if (!result.success) {
      return {
        ...prevState,
        error: result.error.issues[0].message,
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const res = await depositeAmount(result.data.amount, account.data.id);

    if (res.status !== "SUCCESS") {
      return {
        ...prevState,
        error: "Deposit failed",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }
    return {
      ...prevState,
      error: "",
      status: "SUCCESS",
      requestId: generateRquestId(),
    };
  } catch (error) {
    return {
      ...prevState,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
      status: "ERROR",
      requestId: generateRquestId(),
    };
  }
}

export async function handleTransfer(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        ...prevState,
        error: "You are not authenticated",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const formSchema = z.object({
      accountNumber: z
        .string()
        .length(10, "Account number should be 10 characters"),

      amount: z.coerce.number().min(100, "Minimum transfer amount is 100"),
    });

    const result = formSchema.safeParse({
      accountNumber: formData.get("accountNumber"),
      amount: Number(formData.get("amount")?.toString().replace(/,/g, "")),
    });

    if (!result.success) {
      return {
        ...prevState,
        error: result.error.issues[0].message,
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const receiverAccount = await getAccountByProps(
      "accountNumber",
      result.data.accountNumber.trim(),
    );

    if (!receiverAccount.data) {
      return {
        ...prevState,
        error: "Receiver account not found",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const senderAccount = await getAccountByProps("email", session.user.email);

    if (!senderAccount.data) {
      return {
        ...prevState,
        error: "Sender account not found",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const res = await transferAmount(
      result.data.amount,
      receiverAccount.data.id,
      senderAccount.data.id,
    );

    if (res.status !== "SUCCESS") {
      return {
        ...prevState,
        error: res.error || "Transfer failed",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    return {
      ...prevState,
      error: "",
      status: "SUCCESS",
      requestId: generateRquestId(),
    };
  } catch (error) {
    return {
      ...prevState,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
      status: "ERROR",
      requestId: generateRquestId(),
    };
  }
}

export async function handleCloseAccount(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        ...prevState,
        error: "You are not authenticated",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    console.log("formData", formData.get("accountNumber"));

    const inputAccount = await getAccountByProps(
      "accountNumber",
      Number(formData.get("accountNumber")),
    );

    if (!inputAccount.data) {
      return {
        ...prevState,
        error: "Account number does not match",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }
    const userAccount = await getAccountByProps("email", session.user.email);

    if (
      inputAccount.data.accountNumber !== Number(userAccount.data.accountNumber)
    ) {
      return {
        ...prevState,
        error: "Account number does not match",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    const res = await closeAccount(userAccount.data.id);

    if (res.status !== "SUCCESS") {
      return {
        ...prevState,
        error: res.error || "Close Account failed",
        status: "ERROR",
        requestId: generateRquestId(),
      };
    }

    return {
      ...prevState,
      error: "",
      status: "SUCCESS",
      requestId: generateRquestId(),
    };
  } catch (error) {
    return {
      ...prevState,
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
      status: "ERROR",
      requestId: generateRquestId(),
    };
  }
}

export async function getAllMovement(
  accountId: string,
  page = 1,
  itemsPerPage: number,
) {
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("Movements")
    .select(
      `
        *,
        counterparty:Accounts!Movements_counterpartyAccountId_fkey (
          id,
          accountName
        )
      `,
      { count: "exact" },
    )
    .eq("accountId", accountId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { data, error, count };
}
export async function getMovementByAccountId(accountId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Movements")
    .select("*")
    .eq("accountId", accountId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return { data, error };
}

export async function depositeAmount(amount: number, accountId: string) {
  const session = await auth();

  if (!session?.user) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Movements")
    .insert([
      {
        accountId: accountId,
        counterpartyAccountId: accountId,
        amount: amount,
        status: "CREDITED",
        type: "DEPOSIT",
        reference: generateReference(),
      },
    ])
    .select();

  if (error) {
    return parseServerActionResponse({
      error: error.message,
      status: "ERROR",
    });
  }
  revalidatePath("/account");
  return {
    data,
    error: "",
    status: "SUCCESS",
  };
}

export async function transferAmount(
  amount: number,
  receiverId: string,
  senderId: string,
) {
  const session = await auth();

  if (!session?.user) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase.rpc("transfer_money", {
      p_amount: amount,
      p_sender_id: senderId,
      p_receiver_id: receiverId,
      p_reference: generateReference(),
    });

    if (error) {
      return parseServerActionResponse({
        error: error.message,
        status: "ERROR",
      });
    }

    revalidatePath("/account");

    return parseServerActionResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
      status: "ERROR",
    });
  }
}

export async function closeAccount(accountId: string) {
  const session = await auth();

  if (!session?.user) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("Accounts")
      .update({
        status: "DISABLED",
      })
      .eq("id", accountId);
    if (error) {
      return parseServerActionResponse({
        error: error.message,
        status: "ERROR",
      });
    }

    return parseServerActionResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
      status: "ERROR",
    });
  }
}

export async function getAccountByProps(type: string, props: string | number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Accounts")
    .select("*")
    .eq(type, props)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return { data, error };
}

export async function createAccount(credential: Credentials) {
  const accountExists = await getAccountByProps("email", credential.email);

  if (accountExists.data) {
    return {
      data: accountExists.data,
      error: null,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Accounts")
    .insert([
      {
        email: credential.email,
        accountName: credential.name,
        accountNumber: Math.floor(Math.random() * 10000000000).toString(),
        image: credential.image,
        status: "ACTIVE",
      },
    ])
    .select()
    .single();

  if (error) {
    return {
      data: null,
      error,
    };
  }
  revalidatePath("/account");
  return {
    data,
    error: null,
  };
}
