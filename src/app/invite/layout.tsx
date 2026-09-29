import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A coffee date?",
  description: "A small invitation for a coffee date, made with hope and a little humor.",
};

export default function InvitationLayout({ children }: LayoutProps<"/invite">) {
  return children;
}