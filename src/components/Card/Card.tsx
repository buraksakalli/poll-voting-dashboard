import React from "react";
import { Link } from "../Link";

interface CardProps {
  title: string;
  createdAt: string;
  slug: string;
  vote?: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  createdAt,
  slug,
  vote = 1,
}) => {
  return (
    <Link href={`/poll/${slug}`}>
      <div className="relative py-16 px-12 max-w-4xl bg-gray-50 rounded-3xl shadow-md cursor-pointer hover:-translate-y-4 transition-all duration-300 shadow-black/10">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <p className="text-gray-500">
          <span>Created {createdAt}</span>
          <span className="text-gray-800"> by X</span>
        </p>
        <div className="absolute top-[-10px] right-0 border rounded-full px-2 py-1 border-primary shadow-md">
          <span>
            {vote} {vote > 1 ? "votes" : "vote"}
          </span>
        </div>
      </div>
    </Link>
  );
};
