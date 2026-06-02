import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuromirror | Your Personal Health Digital Twin",
  description:
    "A premium health digital twin SaaS platform for enterprises, hospitals, schools, universities, gyms, insurers, governments, and individuals."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
