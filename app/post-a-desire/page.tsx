import Loader from "@/components/loader";
import PostDesireForm from "@/components/post-desire-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function PostADesire() {
  if (!cookies().has("auth")) redirect("/");

  return (
    <div className="m-3">
      <Suspense fallback={<Loader dark />}>
        {" "}
        <PostDesireForm />
      </Suspense>
    </div>
  );
}
