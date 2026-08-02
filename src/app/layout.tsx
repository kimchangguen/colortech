import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "칼라테크OA | 복합기·프린터 렌탈 및 유지보수 전문기업",
    template: `%s | ${SITE_NAME}`,
  },
  description: "서울·경기 지역 기업을 위한 복합기·프린터 렌탈, 설치, 정기점검과 신속한 유지보수 서비스를 제공하는 칼라테크OA입니다.",
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    title: "칼라테크OA | 복합기·프린터 렌탈 및 유지보수 전문기업",
    description: "서울·경기 지역 기업을 위한 복합기·프린터 렌탈, 설치, 정기점검과 신속한 유지보수 서비스를 제공합니다.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "칼라테크OA 복합기·프린터 렌탈 전문기업" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "칼라테크OA | 복합기·프린터 렌탈 및 유지보수 전문기업",
    description: "서울·경기 지역 기업을 위한 복합기·프린터 렌탈, 설치 및 유지보수 서비스를 제공합니다.",
    images: [DEFAULT_OG_IMAGE],
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
