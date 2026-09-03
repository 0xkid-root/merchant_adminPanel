import React from "react";
import { ShieldCheck, Eye, Zap } from "lucide-react";

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M12 2L2 22H22L12 2Z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M12 2L2 22H10L15 12L12 2Z" fill="currentColor"/>
      <path d="M7 16L12 6L17 16H7Z" fill="white"/>
    </svg>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Column - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-32 bg-white">
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mb-12 flex items-center gap-2">
            <LogoIcon />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold text-[#1F2A44] tracking-tight">AtMoonPe</span>
              <span className="text-[13px] font-medium text-muted-foreground">Admin Portal</span>
            </div>
          </div>
          
          {children}
          
          <div className="mt-12 flex items-center gap-3 text-sm text-muted-foreground/80">
             <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
             <p className="leading-snug">Secure admin access to manage your entire payments ecosystem.</p>
          </div>
        </div>
      </div>

      {/* Right Column - Marketing / Dashboard Mock */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary/5 p-12 lg:flex xl:p-24 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Complete Control.<br />
            <span className="text-primary">One Powerful Platform.</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage merchants, wallets, payouts, approvals, and platform operations in real-time with complete visibility and security.
          </p>
        </div>

        {/* Dashboard Mockup Placeholder */}
        <div className="relative z-10 mt-12 mb-12 flex-1 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl p-4 w-full h-[400px]">
           <div className="w-full h-full border border-border/40 rounded-lg bg-card/80 shadow-sm flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-border/40 flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                    <div className="w-3 h-3 rounded-full bg-warning/60"></div>
                    <div className="w-3 h-3 rounded-full bg-success/60"></div>
                 </div>
              </div>
              {/* Sidebar + Content */}
              <div className="flex flex-1 overflow-hidden">
                 <div className="w-16 border-r border-border/40 bg-card/50 flex flex-col items-center py-4 gap-4">
                    <div className="w-8 h-8 rounded bg-primary/20"></div>
                    <div className="w-8 h-8 rounded bg-muted"></div>
                    <div className="w-8 h-8 rounded bg-muted"></div>
                 </div>
                 <div className="flex-1 p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                       <div className="flex-1 h-24 rounded border border-border/40 bg-card"></div>
                       <div className="flex-1 h-24 rounded border border-border/40 bg-card"></div>
                       <div className="flex-1 h-24 rounded border border-border/40 bg-card"></div>
                    </div>
                    <div className="flex-1 rounded border border-border/40 bg-card"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Features Bottom */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Secure Access</h3>
            <p className="text-sm text-muted-foreground">Role-based administrative security and data protection.</p>
          </div>
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm text-primary">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Complete Visibility</h3>
            <p className="text-sm text-muted-foreground">Monitor merchants, wallets, payouts and transactions in real-time.</p>
          </div>
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Real-Time Operations</h3>
            <p className="text-sm text-muted-foreground">Manage platform activities, approvals and requests instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
