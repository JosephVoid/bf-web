import Loader from "@/components/loader";
import PostDesireForm from "@/components/post-desire-form";
import { fetchSingleDesire } from "@/lib/actions/fetch/desire.fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PostADesire({
  searchParams,
}: {
  searchParams: { mode: "edit" | "new"; id?: string };
}) {
  if (!cookies().has("auth")) redirect("/");

  const desire = await (async function desireFetching() {
    return searchParams.id
      ? await fetchSingleDesire(searchParams.id)
      : undefined;
  })();

  return (
    <div className="m-3">
      <Suspense fallback={<Loader dark />}>
        <PostDesireForm edit={searchParams.mode === "edit"} desire={desire} />
      </Suspense>
    </div>
  );
}
