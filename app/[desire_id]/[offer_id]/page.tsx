import { Button } from "@/components/ui/button";
import { HandIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function SingleOffer() {
  return (
    <div className="flex flex-col">
      <p className="mt-4">Gonzal Juidad offered:</p>
      <div className="flex mt-4">
        <div className="w-1/2 h-fit rounded-md mr-4 mb-8">
          <Image
            src={"/black_box.png"}
            alt="Desire"
            fill={true}
            objectFit="cover"
            className="rounded-md w-full !relative"
          />
        </div>
        <p className="mb-4 w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi
          voluptates numquam perspiciatis, amet repellendus debitis esse fugit
          nihil doloremque! Natus possimus earum impedit distinctio! Est
          voluptas quasi exercitationem architecto! Animi consequatur iusto,
          praesentium, commodi inventore recusandae sequi eaque, cum nostrum
          quis libero nesciunt amet cumque unde! Perferendis totam adipisci
          repellat, minus recusandae reprehenderit omnis, cupiditate veritatis,
          nobis ducimus ut! Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </p>
      </div>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
        For 800 Br
      </h2>
      <div className="flex justify-between mb-4">
        <Button>Accept the Offer</Button>
      </div>
    </div>
  );
}
