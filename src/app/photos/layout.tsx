import { Metadata } from "next";

export const metadata: Metadata = {
  title: "photos :]",
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
