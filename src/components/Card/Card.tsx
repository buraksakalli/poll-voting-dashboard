import React from "react";
import classNames from "classnames";
import { Link } from "@/components/index";

interface CardProps {
  title: string;
  createdAt: string;
  slug: string;
  vote?: number;
  fullname: string;
  expiryDate: Date;
}

type DivRef = React.ForwardedRef<HTMLDivElement>;

export const Card: React.FC<CardProps> = React.forwardRef(
  ({ title, createdAt, slug, vote, fullname, expiryDate }, ref: DivRef) => {
    const isExpired = new Date(expiryDate) < new Date();

    return (
      <Link href={`/poll/${slug}`}>
        <div
          className={classNames(
            "group h-full relative py-16 px-12 max-w-4xl bg-gray-50 rounded-3xl shadow-md cursor-pointer hover:-translate-y-4 transition-all duration-300 shadow-black/10"
          )}
          ref={ref}
        >
          {isExpired && (
            <span className="text-red-500 z-10 top-6 left-0 absolute -rotate-45 font-semibold">
              EXPIRED
            </span>
          )}
          <div
            className={classNames(
              "",
              isExpired &&
                "grayscale blur-sm group-hover:blur-0 transition-all duration-300"
            )}
          >
            <h2 className="text-4xl font-semibold">{title}</h2>
            <p className="text-gray-500 my-2">
              <span>Created</span>
              <span className="text-gray-800"> by {fullname}</span>
            </p>
          </div>
          <div className="absolute top-[-10px] right-0 border rounded-full px-2 py-1 border-primary shadow-md">
            <span>
              {vote} {vote && vote > 1 ? "votes" : "vote"}
            </span>
          </div>
        </div>
      </Link>
    );
  }
);

Card.displayName = "Card";
