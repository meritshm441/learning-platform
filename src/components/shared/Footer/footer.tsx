"use client"

import Link from "next/link"
import Image from "next/image"
import { BsArrowUpSquare } from "react-icons/bs"
import { cli_white } from "@/lib/constants/images"
import FooterList from "./FooterList"
import { about, contact, menu, social } from "@/data/footer"

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-[#01589a] px-4 pt-6 pb-2 text-white lg:pt-14 lg:pb-8 xl:px-48">
      <div className="container flex flex-col">
        <div className="flex w-full flex-col items-start justify-between gap-8 pt-11 pl-7 md:flex-row">
          {/* Logo Section */}
          <div className="mb-4 flex h-[50px] w-[174.31px] items-center justify-center md:h-[110px] md:w-[385.17px]">
            <Link href="/" className="mb-4 flex items-center">
              <Image src={cli_white} alt="Client Logo" width={385.17} height={110} />
            </Link>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 md:w-[80%] md:grid-cols-4 lg:w-[70%] xl:w-[60%]">
            <FooterList title="Menu" list={menu} />
            <FooterList title="Contact" list={contact} />
            <FooterList title="Social" list={social} />
            <FooterList title="about" list={about} />
          </div>
        </div>

        <div className="mt-8 mb-4 flex flex-col items-center justify-between gap-6 border-t border-[#4182b3] pt-8 md:flex-row">
          <div className="mb-4 md:mb-0">© copyright 2025 - C client, All rights reserved</div>
          <Link href="#" className="flex items-center text-sm hover:underline">
            Back to top <BsArrowUpSquare className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
