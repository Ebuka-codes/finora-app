import crypto from "crypto";
import { MovementItemProps } from "@/type";

const monthData = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateReference = () => {
  return `${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
};

export const generateRquestId = () => {
  return `${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
};

export const groupMovementsByDate = (movements: MovementItemProps[]) => {
  return movements.reduce(
    (groups, movement) => {
      const dateKey = new Date(movement.created_at).toISOString().split("T")[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(movement);

      return groups;
    },
    {} as Record<string, MovementItemProps[]>,
  );
};

export const parseServerActionResponse = <T>(response: T) => {
  return JSON.parse(JSON.stringify(response));
};

export const formattedDate = (date: Date | string) => {
  const inputDate = new Date(date);

  return `${inputDate.getUTCDate().toString().padStart(2, "0")} ${
    monthData[inputDate.getUTCMonth()]
  }, ${inputDate.getUTCFullYear()} ${getCurrentTime(date).time} ${getCurrentTime(date).period}`;
};

export const getCurrentTime = (date: Date | string) => {
  const now = new Date(date);

  return {
    time: now.toLocaleTimeString("en-NG", {
      hour: "numeric",
      minute: "2-digit",
    }),
    period: now.getHours() >= 12 ? "PM" : "AM",
  };
};

export const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export const formattedTransAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};
