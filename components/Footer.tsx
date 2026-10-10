import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center gap-2 justify-end text-[13px] mt-10">
      <Copyright size={14} /> {new Date().getFullYear()} Finora PLC all right is
      reserved.
    </footer>
  );
};

export default Footer;
