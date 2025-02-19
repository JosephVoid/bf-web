import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Loader from "@/components/loader";
import Paginate from "@/components/paginate";
import Banner from "@/components/banner";
import { IFilterParams } from "@/lib/types";
import { Suspense } from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import HomeModal from "@/components/HomeModal";

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

export default function Home({
  searchParams,
}: {
  searchParams: {
    sortby?: string;
    sortdir?: string;
    query?: string;
    page?: string;
    tag?: string;
    login?: boolean;
    signup?: boolean;
  };
}) {
  const desireListParams: IFilterParams = {
    filterBy: searchParams.tag ?? "",
    sortBy: searchParams.sortby ?? "",
    sortDir: searchParams.sortdir ?? "",
    search: searchParams.query ?? "",
    page: searchParams.page ?? "1",
  };
  const t = useTranslations();
  return searchParams.login || searchParams.signup ? (
    <div className="flex justify-center h-screen my-20">
      <Loader dark large />
      <HomeModal />
    </div>
  ) : (
    <main className="flex flex-col">
      <div className="m-3 rounded-lg p-3 border-[1px] md:block hidden">
        <Suspense
          fallback={
            <div className="flex justify-center h-screen my-20">
              <Loader dark large />
            </div>
          }
        >
          <DisplayParams />
        </Suspense>
      </div>
      <div className="m-3">
        <Suspense
          fallback={
            <div className="flex justify-center h-screen my-20">
              <Loader dark large />
            </div>
          }
        >
          <DesireList params={desireListParams} />
        </Suspense>
        <div className="flex justify-center rounded-md bg-slate-100 p-3 flex-col mb-3 md:hidden">
          <p>{t("RightSide.any-questions")}</p>
          <b>contact@buyersfirst.et</b>
          <b>+251967067652</b>
        </div>
      </div>
    </main>
  );
}
