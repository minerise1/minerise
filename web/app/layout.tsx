import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0f0f12",
          color: "#ffffff",
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
