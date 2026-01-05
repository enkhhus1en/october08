import { Metadata } from "next";

export const metadata: Metadata = {
  title: "read :]",
};

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
