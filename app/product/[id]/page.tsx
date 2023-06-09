import { SearchParamsType } from "@/types/SearchParamsType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamsType) {
  console.log(searchParams);

  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16 ">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-full"
        priority={true}
      />
      <div className="font-medium">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2 ">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary ">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
