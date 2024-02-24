import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Tips() {
  return (
    <Carousel
      className="w-full max-w-xs"
      orientation="vertical"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="-mt-1 h-[250px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="py-1">
              <Card>
                <CardContent className="flex flex-col items-start justify-center p-6">
                  <span className="text-sm font-semibold text-start">
                    Tip #{index + 1}
                  </span>
                  <span className="text-sm font-normal">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet, illo. Nemo, veniam officiis. Soluta, minima. Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                    illo. Nemo, veniam officiis. Soluta, minima.
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
