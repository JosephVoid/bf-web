import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Image from "next/image";

export function Desire() {
  return (
    <Card className="p-4 mb-5 flex flex-col">
      <div className="flex justify-start">
        <Image
          src={"/sample.jpg"}
          height={150}
          width={150}
          alt="desire"
          className="rounded-md mr-5"
        />
        <div className="flex flex-col justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight line-clamp-1">
            I need a sample desire, like this sample desire, like this
          </h3>
          <small className="text-sm font-normal line-clamp-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quae
            recusandae quaerat commodi vero tenetur possimus quos distinctio
            fugit sed dolor sapiente architecto, quidem error est beatae, alias
            corporis magnam? recusandae quaerat commodi vero tenetur possimus
            quos distinctio fugit sed dolor sapiente architecto, quidem error
            est beatae, alias corporis magnam?
          </small>
          <div className="mt-2">
            <Badge className="mr-2" variant={"secondary"}>
              Electronics
            </Badge>
            <Badge className="mr-2" variant={"secondary"}>
              Accessories
            </Badge>
            <Badge className="mr-2" variant={"secondary"}>
              Mobile
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3 items-baseline">
        <p className="text-sm">
          Looking for
          <b> 800 Br</b>
        </p>
        <p className="text-sm">
          <b>4</b> want this
        </p>
        <p className="text-sm">
          <b>8</b> views
        </p>
      </div>
    </Card>
  );
}

export default function DesireList() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <Desire key={index} />
      ))}
    </div>
  );
}
