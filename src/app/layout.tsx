export const metadata = {
  title: "Next.js + Postgres Starter",
  description: "Minimal Next.js and Postgres foundation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
