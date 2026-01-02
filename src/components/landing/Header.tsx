<header className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6">
    {/* ✅ Promote height to 72px for visual breathing room */}
    <div className="flex justify-between items-center h-[72px]">
      <div className="flex items-center">
        <div className="h-10 flex items-center gap-3">
          {/* ✅ FIXED: Using /sl.png found in your directory */}
          <img 
            src="/sl.png" 
            alt="SoloBot" 
            className="block object-contain"
            style={{ height: '40px', width: 'auto', minHeight: '40px' }} 
          />
          <span className="font-bold text-xl tracking-tight text-white uppercase leading-none">
            SOLOBOTAGENCY
          </span>
        </div>
      </div>
      {/* ... Rest of your nav and buttons ... */}
    </div>
  </div>
</header>