"use client";
import MakeAnOfferForm from "@/components/make-an-offer-form";
import { getTitle } from "@/lib/helpers";
import { hasCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

export default function MakeAnOffer() {
  const router = useRouter();
  const current_path = usePathname();

  if (!hasCookie("auth")) router.replace("/");

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {getTitle(current_path.split("/")[1])}
      </h2>
      <div className="mt-8 border-l-4 pl-8">
        <MakeAnOfferForm />
      </div>
    </>
  );
}
