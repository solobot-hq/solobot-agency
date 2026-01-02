// ✅ Final Normalized Logo: Direct scaling
export const Logo = () => {
  return (
    <>
      <img 
        src="/logo.png" 
        alt="Logo" 
        // ✅ h-full ensures it matches the 40px container height
        // ✅ w-auto maintains the correct aspect ratio
        className="h-full w-auto object-contain" 
      />
      <span className="ml-2 font-bold text-xl tracking-tight text-foreground">
        SOLOBOTAGENCY
      </span>
    </>
  );
};