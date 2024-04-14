import PostDesireForm from "@/components/post-desire-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function PostADesire() {
  if (!cookies().has("auth")) redirect("/");

  return (
    <div className="m-3">
      <PostDesireForm />
    </div>
  );
}
