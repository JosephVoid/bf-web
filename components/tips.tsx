"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getTips } from "@/lib/helpers";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import React from "react";

export default function Tips({ mobile }: { mobile?: boolean }) {
  const [modalState, setModalState] = React.useState<boolean>(false);
  const pathname = usePathname();
  const tips = getTips(pathname.split("/")[pathname.split("/").length - 1]);

  return mobile ? (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger asChild onClick={(e) => setModalState(true)}>
        <div className="fixed bottom-5 right-5 bg-white rounded-full cursor-pointer shadow-md shadow-gray-800 md:hidden">
          <QuestionMarkCircledIcon width={30} height={30} />
        </div>
      </DialogTrigger>
      <DialogContent
        className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6 rounded-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Carousel
          className="w-full max-w-xs"
          orientation="vertical"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="-mt-1 h-[250px]">
            {tips.map((tip, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="py-1">
                  <Card>
                    <CardContent className="flex flex-col items-start justify-center p-6">
                      <span className="text-sm font-semibold text-start">
                        Tip #{index + 1}: {tip.title}
                      </span>
                      <span className="text-sm font-normal">{tip.tip}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  ) : (
    <Carousel
      className="w-full max-w-xs my-12"
      orientation="vertical"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="-mt-1 h-[250px]">
        {tips.map((tip, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="py-1">
              <Card>
                <CardContent className="flex flex-col items-start justify-center p-6">
                  <span className="text-sm font-semibold text-start">
                    Tip #{index + 1} {tip.title}
                  </span>
                  <span className="text-sm font-normal">{tip.tip}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-y-3" />
      <CarouselNext className="-translate-y-3" />
    </Carousel>
  );
}
