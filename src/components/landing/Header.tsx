<header className="fixed top-0 w-full z-50 bg-background border-b shadow-none">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center h-[64px]">
      <div className="flex items-center">
        {/* ✅ FIX: Changed h-8 to h-10 (40px) and updated padding to py-1.5 */}
        <div className="h-10 flex items-center py-1.5 px-1 max-w-[180px]">
          <Logo />
        </div>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link href="#features" className="text-muted-foreground hover:text-foreground font-medium text-sm">Features</Link>
        <Link href="#pricing" className="text-muted-foreground hover:text-foreground font-medium text-sm">Pricing</Link>
      </nav>
      <div className="flex items-center">
        <Button>Get Started</Button>
      </div>
    </div>
  </div>
</header>