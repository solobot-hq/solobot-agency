// ✅ AFTER: Responsive Logo that inherits parent size
export const Logo = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-full w-auto object-contain" // ✅ This forces it to fill the h-10 container
      />
      <span className="ml-2 font-bold text-xl tracking-tight text-foreground">
        SOLOBOTAGENCY
      </span>
    </div>
  );
};