import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./hljs.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackZip",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-zinc-950")}>
        {children}
      </body>
    </html>
  );
}
