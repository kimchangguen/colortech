import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.colortekoa-lite.com"),
  title: {
    default: "칼라테크OA",
    template: "%s | 칼라테크OA",
  },
  description: "복합기·프린터 렌탈 및 유지보수 전문기업 칼라테크OA입니다.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} min-h-screen bg-white text-[#111111]`}>{children}</body>
    </html>
  );
}
