import { Metadata } from "next";

export const metadata: Metadata = {
  title: "listen :]",
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
