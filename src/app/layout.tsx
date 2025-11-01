// FILE: src/app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Sylor.ai",
  description: "AI lead capture, SMS, booking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-white min-h-screen">{children}</body>
    </html>
  );
}
