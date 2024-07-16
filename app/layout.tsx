import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Logo from "../components/logo";
import Profile from "../components/profile";
import Tips from "../components/tips";
import Search from "@/components/search";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Banner from "../components/post-desire";
import { Suspense } from "react";
import Loader from "@/components/loader";

export const metadata: Metadata = {
  metadataBase: new URL("https://buyersfirst.et"),
  title: "Buyers First",
  description:
    "An Ethiopian ecommerce site which makes buying niche things and rare items easier. It prioritizes the buyers, allowing them to post what they desire and get a list offers from sellers",
  keywords: [
    "Buyers",
    "Sellers",
    "Ethiopia",
    "Addis Ababa",
    "Ecommerce",
    "Shopping",
    "Offers",
    "Deals",
  ],
  openGraph: {
    title: "Buyers First",
    description:
      "An Ethiopian ecommerce site which makes buying niche things and rare items easier. It prioritizes the buyers, allowing them to post what they desire and get a list offers from sellers",
    images: "/favicon.ico",
    url: "https://buyersfirst.et",
    siteName: "Buyers First",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} md:flex md:justify-center md:h-screen md:p-8 p-3`}
      >
        <div className="md:w-1/6 md:mr-3 md:flex md:flex-col md:justify-start hidden">
          <div className="md:w-1/6 md:fixed md:pr-3">
            <Logo />
            <Suspense fallback={<Loader dark />}>
              <Search />
            </Suspense>
            <Banner text="Post a Desire" href="post-a-desire" />
            <Banner text="Setup Alerts" href="profile" />
          </div>
        </div>
        <div className="md:w-3/6 md:mr-3">
          <div className="md:mb-5">
            <Header />
          </div>
          {children}
          <Toaster />
          <Tips mobile />
        </div>
        <div className="md:w-1/6 md:relative">
          <div className="md:w-1/6 md:fixed md:h-5/6 md:flex md:flex-col md:justify-between hidden">
            <Profile />
            <Tips />
            <div className="flex justify-center rounded-md bg-slate-100 p-3 flex-col text-xs">
              <p>For any questions</p>
              <b>contact@buyersfirst.et</b>
              <b>+251967067652</b>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
