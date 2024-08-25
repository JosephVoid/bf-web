import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Logo from "../components/logo";
import Profile from "../components/profile-displays";
import Tips from "../components/tips";
import Search from "@/components/search";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Banner from "../components/banner";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { PHProvider } from "@/lib/providers/PostHogProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "@/lib/providers/QueryClientProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <PHProvider>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
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
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </PHProvider>
    </html>
  );
}
