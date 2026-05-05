import React from "react";

export const metadata = {
  title: "Perimaster Dashboard",
  description: "Daily Monitoring System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
