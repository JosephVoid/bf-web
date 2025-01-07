"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  ChatBubbleIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchComments } from "@/lib/actions/fetch/comment.fetch";
import Loader from "./loader";
import { postComment } from "@/lib/actions/act/comment.act";
import { useToast } from "@/components/ui/use-toast";
import AuthDialogBtn from "./AuthDialogBtn";
import { hasCookie } from "cookies-next";
import { useTranslations } from "next-intl";

const CommentBlock = ({ entity_id }: { entity_id: string }) => {
  const [comment, setComment] = useState("");
  const [perPage, setPerPage] = useState(3);
  const [commentLoading, setCommentLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["comments", entity_id],
    queryFn: () => fetchComments(entity_id, 1, perPage),
  });

  const handleComment = async () => {
    setCommentLoading(true);
    const response = await postComment(entity_id, comment);

    if (response.result) {
      setComment("");
      refetch();
    }

    toast({
      title: (
        <div className="flex items-center">
          {response.result ? (
            <>
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {t("Comments.Posted")}
              </span>
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {response.message}
              </span>
            </>
          )}
        </div>
      ),
    });
    setCommentLoading(false);
  };

  const handleMoreComments = async () => {
    setPerPage(50);
    refetch;
  };

  return (
    <div className="my-4">
      <div className="flex flex-col gap-4">
        <textarea
          placeholder={t("Comments.PlaceHolder")}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={3}
          className="p-2 text-sm border-[1px] rounded-md focus-visible:outline-none focus:outline-2 focus:outline"
        />
        <AuthDialogBtn>
          <Button
            size={"sm"}
            variant={"secondary"}
            className="md:w-1/5 w-full"
            onClick={() => (hasCookie("auth") ? handleComment() : null)}
          >
            {commentLoading ? (
              <Loader dark />
            ) : (
              <>
                <ChatBubbleIcon className="mr-2" />
                {t("Comments.Comment")}
              </>
            )}
          </Button>
        </AuthDialogBtn>
      </div>
      {isLoading ? (
        <div className="flex justify-center h-screen my-20">
          <Loader dark large />
        </div>
      ) : (
        <>
          {(data?.data ?? [])?.map((comment) => (
            <div className="mt-8">
              <div className="text-xs flex flex-col gap-1 mb-4">
                <p className="font-bold">{comment.commentedBy}</p>
                <p>{comment.comment}</p>
                <p className="opacity-60 font-semibold">
                  {new Date(comment.commentDate).toDateString()}
                </p>
              </div>
            </div>
          ))}
          {data &&
            data.meta.total > perPage &&
            data.meta.total !== data.data.length && (
              <Button
                variant={"ghost"}
                onClick={handleMoreComments}
                className="w-full"
                size={"sm"}
              >
                {isRefetching ? <Loader dark /> : t("Comments.AllComments")}
              </Button>
            )}
        </>
      )}
    </div>
  );
};

export default CommentBlock;
