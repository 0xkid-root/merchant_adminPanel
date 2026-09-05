"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[480px] w-full flex flex-col justify-center">
      <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
          <Image
            src="/atmoonpe-logo.png"
            alt="AtMoonPe"
            width={80}
            height={80}
            priority
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            AtMoonPe
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Admin Portal
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1E293B] mb-2 sm:mb-3">Welcome Back!</h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Login to access the AtMoonPe administration portal and manage platform operations.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold text-[#1E293B] text-sm">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@atmoonpe.com" 
              className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus-visible:ring-primary focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="font-semibold text-[#1E293B] text-sm">Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              className="pl-11 pr-11 h-12 rounded-xl border-slate-200 bg-white focus-visible:ring-primary focus-visible:ring-offset-0 text-sm sm:text-base"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2.5">
            <Checkbox id="remember" className="rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <Label htmlFor="remember" className="text-sm font-medium text-[#1E293B] cursor-pointer">
              Remember me
            </Label>
          </div>
          <Link 
            href="/forgot-password" 
            className="text-sm font-semibold text-primary hover:text-primary/90 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-colors shadow-sm" type="submit">
          <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Login to Admin Dashboard
        </Button>
      </form>

      <div className="mt-8 flex items-start gap-3 text-sm text-slate-500">
         <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
         <p className="leading-snug">Secure admin access to manage your entire payments ecosystem.</p>
      </div>
    </div>
  );
}
