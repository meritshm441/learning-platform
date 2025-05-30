import { admin_cli_blue, login_register } from "@/lib/constants/images";
import Image from "next/image";
import type React from "react";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen h-screen w-full">
      <div className="hidden md:block min-h-screen h-screen" style={{ width: "500px" }}>
        <Image
          src={admin_cli_blue || "/placeholder.svg"}
          alt="Learning illustration"
          width={500}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Flexible content that fills the remaining space */}
      <div className="flex-1 h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
