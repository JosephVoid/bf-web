"use client";
import PostDesireForm from "@/components/post-desire-form";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function PostADesire() {
  const router = useRouter();

  if (!hasCookie("auth")) router.replace("/");

  return (
    <div className="m-3">
      <PostDesireForm />
    </div>
  );
}
