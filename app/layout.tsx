import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "@/context/ThemeContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finora - Simple Banking App",
  description: "A simple banking app for managing your finances.",
};

const themeScript = `
 (function () {
  try {
    const theme = localStorage.getItem("mode");

    if (theme) {
      const isDark = JSON.parse(theme);
      document.documentElement.classList.toggle("dark", isDark);
    }
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
      </head>
      <body className={`${inter.variable} font-sans bg-[#f4f2ee85]`}>
        <DarkModeProvider>
          <div>{children}</div>
        </DarkModeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
