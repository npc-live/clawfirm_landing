import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ClawFirm — Your AI Business Partner",
  description: "一人公司的终极武器。AI 深度嵌入商业全链路，让一个人也能拥有一座工厂的战斗力。",
  metadataBase: new URL("https://clawfirm.dev"),
  openGraph: {
    title: "ClawFirm — Your AI Business Partner",
    description: "一人公司的终极武器。从创意到现金流的完整商业闭环。",
    url: "https://clawfirm.dev",
    siteName: "ClawFirm",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
