'use client'

import Link from "next/link";
import Image from "next/image";
import { BsArrowUpSquare } from "react-icons/bs";
import { cli_white } from "@/lib/constants/images";
import FooterList from "./FooterList";
import { about, contact, menu, social } from "@/data/footer";



export default function Footer() {
  return (
    <footer className="bg-[#01589a] flex items-center justify-center text-white pt-6 pb-2 lg:pt-14 lg:pb-8 px-4 xl:px-48">
      <div className="container flex flex-col">
        <div className="flex flex-col md:flex-row pl-7 pt-11 w-full justify-between items-start gap-8">
          {/* Logo Section */}
          <div className="w-[174.31px] h-[50px] md:w-[385.17px] md:h-[110px] flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src={cli_white}
                alt="Client Logo"
                width={385.17}
                height={110}
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full md:w-[80%] lg:w-[70%] xl:w-[60%]">
            <FooterList title="Menu" list={menu} />
            <FooterList title="Contact" list={contact} />
            <FooterList title="Social" list={social} />
            <FooterList title="about" list={about}/>
          </div>
        </div>

        <div className="border-t border-[#4182b3] mt-8 pt-8 flex gap-6 mb-4 flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © copyright 2025 - C client, All rights reserved
          </div>
          <Link href="#" className="flex items-center text-sm hover:underline">
            Back to top <BsArrowUpSquare className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
