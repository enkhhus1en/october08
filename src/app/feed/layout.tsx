import { Metadata } from "next";

export const metadata: Metadata = {
  title: "feed :]",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
