import Link from "next/link";
import React from "react";

interface listItem {
  id: number;
  text: string;
  url?: string;
}

interface footerProps {
  title: string;
  list: listItem[];
}

const FooterList: React.FC<footerProps> = ({ title, list }) => {
  return (
    <nav>
      <p className="font-bold text-h1 mb-4">{title}</p>
      <ul className="space-y-2">
        {list.map((item) =>
          item.url ? (
            <li key={item.id}>
              <Link href={item.url} className="hover:underline">
                {item.text}
              </Link>
            </li>
          ) : (
            <li key={item.id}>{item.text}</li>
          )
        )}
      </ul>
    </nav>
  );
};

export default FooterList;
