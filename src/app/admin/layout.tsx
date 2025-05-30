import type React from "react";
import { Sidebar } from "@/components/admin-dashboard/sidebar";
import { ModeToggle } from "@/components/admin-dashboard/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AdminLayoutWrapper from "@/components/shared/adminlayoutWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
