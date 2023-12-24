import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
interface SchoolCardProps {
  address: string;
  image: string;
  id: number;
  name: string;
  city: string;
  state: string;
}
const SchoolCard = ({
  address,
  image,

  name,
  city,
}: SchoolCardProps) => {
  return (
    <div className="self-start rounded-md bg-primary-foreground/90">
      <div className="min-w-[250px] max-w-[250px]  ">
        <AspectRatio ratio={3 / 2.5}>
          <Image
            src={`/schoolImages/${image}`}
            alt={`${name} Picture`}
            fill
            fetchPriority="low"
            className="object-cover rounded-t-md"
          />
        </AspectRatio>
        <div className="p-2">
          <h4 className="text-sm   font-medium">{name}</h4>
          <p className="text-muted-foreground leading-5 text-sm mt-1">{city}</p>
          <p className="text-muted-foreground text-sm leading-5 mt-1">
            {address}
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default SchoolCard;
