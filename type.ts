export type Credentials = {
  name: string;
  email: string;
  image: string;
};

export type MovementItemProps = {
  id: string;
  accountId: string;
  amount: number;
  status: "CREDITED" | "DEBITED";
  created_at: Date;
  reference: string;
  type: "TRANSFER" | "DEPOSIT";
  counterparty: {
    accountName: string;
  };
};

export type FormState = {
  error: string;
  status: "INITIAL" | "SUCCESS" | "ERROR";
  requestId: string;
};
