import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/constants";
import { ROUTES } from "@/lib/routes";

const data = [
  {
    name: "Ratan Tata",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Shri_Ratan_Naval_Tata.jpg/500px-Shri_Ratan_Naval_Tata.jpg",
    slug: `ratan_tata`,
  },
  {
    name: "Mukesh Ambani",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Mukesh_Ambani_was_Awarded_the_Asia_Society_Leadership_Award_%28cropped%29.jpg",
    slug: `mukesh_ambani`,
  },
  {
    name: "Azim Premji",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Azim_H._Premji_World_Economic_Forum_2013.jpg/440px-Azim_H._Premji_World_Economic_Forum_2013.jpg",
    slug: `azim_premji`,
  },
  {
    name: "Narayan Murthy",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Narayana_Murthy_CIF_%28cropped%29.JPG/500px-Narayana_Murthy_CIF_%28cropped%29.JPG",
    slug: `narayan_murthy`,
  },
];

export default function Faces() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-1 -space-x-1.5 text-center">
      {data.map(({ name, image, slug }) => (
        <Link key={name} href={`${SITE.URL}${ROUTES.AUTHOR}/${slug}`}>
          <Image
            key={name}
            src={image}
            alt={name}
            width={32}
            height={32}
            className="size-8 rounded-full border-2 border-card object-cover"
          />
        </Link>
      ))}
      <p className="w-full text-center text-xs text-gray-500">
        Featuring quotes from India&apos;s most influential business leaders
      </p>
    </div>
  );
}
