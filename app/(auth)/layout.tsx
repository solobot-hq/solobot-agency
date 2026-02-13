// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      {/* Notice there is NO <Navbar /> here. 
          This is why the logo and buttons will disappear 
          from the sign-in and sign-up pages! 
      */}
      {children}
    </div>
  );
}