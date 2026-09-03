import React from "react";
import Image from "next/image";
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

      {/* Right Column - Image */}
      <div className="hidden w-1/2 relative lg:block bg-slate-50/50">
        <Image 
          src="/login/login-image.png" 
          alt="Login Background"
          fill
          className="object-contain p-8 lg:p-16"
          priority
        />
      </div>
    </div>
  );
}
