"use client";

import React from "react";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { APIResponse } from "@/lib/types";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function ConfDialogBtn({
  context,
  children,
  title,
  subheading,
  type = "info",
  afterOk,
}: {
  context: "Desire" | "Offer";
  children: ReactNode;
  title: string;
  type?: "danger" | "info";
  subheading?: string;
  afterOk: () => Promise<APIResponse>;
}) {
  const [modalState, setModalState] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div>
      <Dialog modal={modalState} onOpenChange={setModalState}>
        <DialogTrigger asChild onClick={(e) => setModalState(true)}>
          {children}
        </DialogTrigger>
        {modalState && (
          <DialogContent>
            <div className="flex flex-col">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                {title}
              </h2>
              <p className="mt-2">{subheading}</p>
              <div className="flex justify-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setModalState(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={type === "danger" ? `destructive` : "default"}
                  onClick={async () => {
                    const response = await afterOk();
                    toast({
                      title: (
                        <div className="flex items-center">
                          {response.result && (
                            <>
                              <CheckIcon className="mr-2" />
                              <span className="first-letter:capitalize">
                                {context} Closed
                              </span>
                            </>
                          )}
                          {!response.result && (
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
                    setModalState(false);
                    router.refresh();
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
