<header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B1221]/80 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center h-[96px]">
      
      {/* Logo + Wordmark */}
      <button
        type="button"
        aria-label="View logo"
        onClick={() => setLogoOpen(true)}
        className="flex items-center gap-4 bg-transparent border-0 p-0 text-left cursor-pointer"
      >
        <div className="h-16 flex items-center">
          <img
            src="/sl.png"
            alt="SoloBot"
            className="h-full w-auto object-contain"
          />
        </div>
        <span className="font-bold text-2xl tracking-tight text-white uppercase leading-none">
          SOLOBOTAGENCY
        </span>
      </button>

      {/* Nav + CTA (unchanged) */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white">
            LOGIN
          </Link>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            GET STARTED
          </Button>
        </div>
      </div>

    </div>
  </div>
</header>
