"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VerifyOtpForm() {
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
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1E293B] mb-2 sm:mb-3">Verify Your Identity</h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          We've sent a 6-digit verification code to:<br/>
          <span className="font-medium text-[#1E293B]">admin@atmoonpe.com</span><br/>
          Enter the code below to continue.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* OTP Field */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[#1E293B]">Verification Code</div>
          <div className="flex gap-2 sm:gap-3 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <Input 
                 key={i}
                 type="text" 
                 maxLength={1}
                 className="w-11 h-12 sm:w-12 sm:h-12 rounded-xl text-center text-xl font-bold bg-white border-slate-200 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all"
               />
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-slate-500 font-medium">Didn't receive the code?</span>
            <button type="button" className="text-sm font-semibold text-primary hover:text-primary/90 hover:underline transition-colors focus:outline-none">
              Resend Code (00:45)
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-colors shadow-sm mt-2" type="submit">
          Verify Code
        </Button>
      </form>
    </div>
  );
}
