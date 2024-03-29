import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Logo from "../components/logo";
import PostBanner from "../components/post-desire";
import Profile from "../components/profile";
import Tips from "../components/tips";
import Search from "@/components/search";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Buyers First",
  description: "Buyers First Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} flex justify-center h-screen p-8`}
      >
        <div className="w-1/6 mr-3 flex flex-col justify-start">
          <div className="w-1/6 fixed pr-3">
            <Logo />
            <Search />
            <PostBanner />
          </div>
        </div>
        <div className="w-3/6 mr-3">
          <div className="mb-5">
            <Header />
          </div>
          {children}
          <Toaster />
        </div>
        <div className="w-1/6 relative">
          <div className="w-1/6 fixed h-5/6 flex flex-col justify-between">
            <Profile />
            <Tips />
          </div>
        </div>
      </body>
    </html>
  );
}
