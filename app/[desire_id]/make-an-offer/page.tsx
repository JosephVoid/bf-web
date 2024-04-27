import MakeAnOfferForm from "@/components/make-an-offer-form";
import { getTitle } from "@/lib/helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MakeAnOffer({
  params,
}: {
  params: { desire_id: string };
}) {
  const current_path = params.desire_id;

  if (!cookies().has("auth")) redirect("/");

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {getTitle(current_path)}
      </h2>
      <div className="mt-8 md:border-l-4 md:pl-8">
        <MakeAnOfferForm />
      </div>
    </>
  );
}
