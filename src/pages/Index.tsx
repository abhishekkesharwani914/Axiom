import { PulseGrid } from '@/components/PulseGrid';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Pulse | Token Trading Table - Axiom Trade Clone</title>
        <meta name="description" content="Discover new tokens, track final stretch tokens, and find recently migrated tokens on the Pulse trading table. Real-time price updates and quick buy functionality." />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discover</a>
              <a href="#" className="text-primary font-medium">Pulse</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Trackers</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Perpetuals</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Yield</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Vision</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Rewards</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            
            {/* SOL Selector */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-md text-sm font-medium">
              <span className="text-primary">≡</span>
              SOL
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            
            {/* Deposit Button */}
            <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Deposit
            </button>
            
            {/* Icons */}
            <div className="hidden sm:flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                ⭐
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
                🔔
              </button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="px-2 py-0.5 bg-secondary rounded text-xs">≡ 0</span>
              </div>
            </div>
            
            {/* Profile */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
              E8
            </div>
          </div>
        </header>

        {/* Secondary Nav */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2 py-1 bg-secondary/50 rounded text-2xs">
              <span className="text-primary">≡</span>
              PRESET 1
            </button>
            <div className="flex items-center gap-1 text-2xs text-muted-foreground">
              <span className="px-1.5 py-0.5 bg-secondary rounded">⬜ 1</span>
              <span className="px-1.5 py-0.5 bg-secondary rounded">≡ 0</span>
            </div>
            <span className="text-muted-foreground text-2xs">⚙️</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-2xs">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <span>📱</span> Wallet
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <span>𝕏</span> Twitter
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              ✨ Discover
            </button>
            <button className="flex items-center gap-1 text-primary">
              ⚡ Pulse
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              📊 PnL
            </button>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>🎰</span>
              <span className="text-positive">$124.36</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-2xs">
            <span className="flex items-center gap-1 text-positive">
              <span className="w-2 h-2 rounded-full bg-positive"></span>
              Connection is stable
            </span>
            <span className="text-muted-foreground">GLOBAL</span>
          </div>
        </div>

        {/* Main Content */}
        <main>
          <PulseGrid className="min-h-[calc(100vh-120px)]" />
        </main>
      </div>
    </>
  );
};

export default Index;
