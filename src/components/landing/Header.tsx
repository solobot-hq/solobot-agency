<header className="fixed top-0 w-full z-50 bg-background border-b shadow-none">
  <div className="max-w-7xl mx-auto px-6">
    {/* ✅ CHANGE 1: Increased header height to 72px for visual breathing room */}
    <div className="flex justify-between items-center h-[72px]">
      <div className="flex items-center">
        <div className="h-10 flex items-center gap-3">
          {/* ✅ CHANGE 2: Fixed the path to /sl.png to match your real file */}
          <img 
            src="/sl.png" 
            alt="SoloBot" 
            className="block object-contain"
            style={{ height: '40px', width: 'auto', minHeight: '40px' }} 
          />
          <span className="font-bold text-xl tracking-tight text-foreground uppercase leading-none">
            SOLOBOTAGENCY
          </span>
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