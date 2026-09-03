"use client";

import Link from "next/link";
import { ArrowLeft, Lock, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  return (
    <div className="w-full">
      <Link 
        href="/login" 
        className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Create New Password</h1>
      <p className="text-muted-foreground mb-8">
        Your new password must be strong and different from previously used passwords.
      </p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* New Password Field */}
        <div className="space-y-2">
          <Label htmlFor="new-password" className="font-semibold text-foreground">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              id="new-password" 
              type="password" 
              placeholder="Enter your new password" 
              className="pl-10 pr-10 h-11 bg-background"
            />
            <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              <EyeOff className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center mt-2 px-1">
            <div className="h-1.5 w-1/3 bg-warning rounded-l-full"></div>
            <div className="h-1.5 w-1/3 bg-muted"></div>
            <div className="h-1.5 w-1/3 bg-muted rounded-r-full"></div>
            <span className="text-xs text-muted-foreground ml-3 font-medium">Password strength: <span className="text-warning">Medium</span></span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="font-semibold text-foreground">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="Confirm your new password" 
              className="pl-10 pr-10 h-11 bg-background"
            />
            <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              <EyeOff className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Password Requirements Box */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
           <h4 className="text-sm font-semibold text-foreground mb-3">Password Requirements</h4>
           <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <div className="flex items-center text-xs font-medium text-success">
                 <CheckCircle2 className="mr-2 h-4 w-4" /> Minimum 8 characters
              </div>
              <div className="flex items-center text-xs font-medium text-success">
                 <CheckCircle2 className="mr-2 h-4 w-4" /> One number (0-9)
              </div>
              <div className="flex items-center text-xs font-medium text-success">
                 <CheckCircle2 className="mr-2 h-4 w-4" /> One uppercase letter (A-Z)
              </div>
              <div className="flex items-center text-xs font-medium text-success">
                 <CheckCircle2 className="mr-2 h-4 w-4" /> One special character (@, #, $, !, %)
              </div>
              <div className="flex items-center text-xs font-medium text-success">
                 <CheckCircle2 className="mr-2 h-4 w-4" /> One lowercase letter (a-z)
              </div>
           </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 text-base font-semibold" type="submit">
          <Lock className="mr-2 h-5 w-5" />
          Reset Password
        </Button>

        <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
             <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
             <p>For your security, all sessions will be logged out after password reset.</p>
        </div>
      </form>
    </div>
  );
}
