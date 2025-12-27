export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {children}
    </div>
  );
}
