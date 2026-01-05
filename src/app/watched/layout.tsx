import { Metadata } from "next";

export const metadata: Metadata = {
  title: "watched :]",
};

export default function WatchedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
