import { Metadata } from "next";

export const metadata: Metadata = {
  title: "text? :]",
};

export default function TextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
