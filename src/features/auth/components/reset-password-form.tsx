"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, EyeOff, Eye, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-[480px] flex flex-col justify-center">
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

      <Link 
        href="/login" 
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#1E293B] transition-colors mb-8 w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1E293B] mb-2 sm:mb-3">Create New Password</h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Your new password must be strong and different from previously used passwords.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* New Password Field */}
        <div className="space-y-2">
          <Label htmlFor="new-password" className="font-semibold text-[#1E293B] text-sm">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              id="new-password" 
              type={showNewPassword ? "text" : "password"} 
              placeholder="Enter your new password" 
              className="pl-11 pr-11 h-12 rounded-xl border-slate-200 bg-white focus-visible:ring-primary focus-visible:ring-offset-0 text-sm sm:text-base"
            />
            <button 
              type="button" 
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
          <div className="flex items-center mt-2 px-1">
            <div className="h-1.5 w-1/3 bg-warning rounded-l-full"></div>
            <div className="h-1.5 w-1/3 bg-slate-200"></div>
            <div className="h-1.5 w-1/3 bg-slate-200 rounded-r-full"></div>
            <span className="text-[11px] sm:text-xs text-slate-500 ml-3 font-medium">Password strength: <span className="text-warning">Medium</span></span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="font-semibold text-[#1E293B] text-sm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              id="confirm-password" 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm your new password" 
              className="pl-11 pr-11 h-12 rounded-xl border-slate-200 bg-white focus-visible:ring-primary focus-visible:ring-offset-0 text-sm sm:text-base"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Password Requirements Box */}
        <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
           <h4 className="text-sm font-semibold text-[#1E293B] mb-2 sm:mb-3">Password Requirements</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-2.5 gap-x-4">
              <div className="flex items-center text-[11px] sm:text-xs font-medium text-slate-600">
                 <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Minimum 8 characters
              </div>
              <div className="flex items-center text-[11px] sm:text-xs font-medium text-slate-600">
                 <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> One number
              </div>
              <div className="flex items-center text-[11px] sm:text-xs font-medium text-slate-600">
                 <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> One uppercase letter
              </div>
              <div className="flex items-center text-[11px] sm:text-xs font-medium text-slate-600">
                 <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> One special character
              </div>
              <div className="flex items-center text-[11px] sm:text-xs font-medium text-slate-600">
                 <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> One lowercase letter
              </div>
           </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-colors shadow-sm" type="submit">
          <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Reset Password
        </Button>
      </form>

      <div className="mt-8 flex items-start gap-3 text-xs sm:text-sm text-slate-500">
         <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
         <p className="leading-snug">For your security, all sessions will be logged out after password reset.</p>
      </div>
    </div>
  );
}
