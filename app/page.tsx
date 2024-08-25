import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Loader from "@/components/loader";
import Paginate from "@/components/paginate";
import Banner from "@/components/banner";
import { IFilterParams } from "@/lib/types";
import { Suspense } from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

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
  return (
    <main className="flex flex-col h-f-v-h">
      <div className="m-3 rounded-lg p-3 border-[1px]">
        <Suspense fallback={<Loader dark />}>
          <DisplayParams />
        </Suspense>
      </div>
      <div className="md:hidden px-3 flex justify-between">
        <Banner text="LeftSide.post-a-desire" href="post-a-desire" />
        <Banner
          text="LeftSide.setup-alerts"
          href="profile"
          variant="secondary"
        />
      </div>
      <div className="m-3">
        <Suspense fallback={<Loader dark />}>
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
