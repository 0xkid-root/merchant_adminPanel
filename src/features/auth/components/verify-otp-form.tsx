"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VerifyOtpForm() {
  return (
    <div className="w-full">
      <Link 
        href="/login" 
        className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Verify Your Identity</h1>
      <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
        We've sent a 6-digit verification code to <br/>
        <span className="font-semibold text-primary">admin@atmoonpe.com</span><br/>
        Enter the code below to continue.
      </p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* OTP Field */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-foreground">Verification Code</div>
          <div className="flex gap-3 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <Input 
                 key={i}
                 type="text" 
                 maxLength={1}
                 className="w-12 h-14 text-center text-xl font-bold bg-background shadow-sm border-border"
                 defaultValue={i === 1 ? "1" : ""}
               />
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground font-medium">Didn't receive the code?</span>
            <button type="button" className="text-sm font-semibold text-primary hover:underline flex items-center">
              Resend Code (00:45) <RefreshCw className="ml-1 h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 text-base font-semibold" type="submit">
          <ShieldCheck className="mr-2 h-5 w-5" />
          Verify Code
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Back to Login Outline Button */}
        <Button variant="outline" className="w-full h-12 text-base font-semibold border-border text-primary hover:bg-primary/5 hover:text-primary" type="button">
           <Mail className="mr-2 h-5 w-5" />
           Send code to a different email
        </Button>

        <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
             <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
             <p>For security reasons, this code will expire in 10 minutes.</p>
        </div>
      </form>
    </div>
  );
}
