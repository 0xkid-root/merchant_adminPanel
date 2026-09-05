"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
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
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1E293B] mb-2 sm:mb-3">Forgot Password?</h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Enter your registered email address and we'll send you instructions to reset your password.
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
              placeholder="Enter your email address" 
              className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus-visible:ring-primary focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-colors shadow-sm" type="submit">
          <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Send Reset Link
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs font-semibold uppercase text-slate-400 tracking-wider">
            <span className="bg-white px-4">OR</span>
          </div>
        </div>

        {/* Back to Login Outline Button */}
        <Link 
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full h-12 rounded-xl text-sm sm:text-base font-semibold border-slate-200 text-[#1E293B] hover:bg-slate-50 hover:text-[#1E293B] flex justify-center shadow-sm"
          )}
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}
