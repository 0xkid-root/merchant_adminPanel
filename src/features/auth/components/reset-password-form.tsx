"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, EyeOff, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Branding Header */}
      <div className="mb-10 flex items-center gap-3 sm:mb-12 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:h-14 sm:w-14">
          <Image
            src="/atmoonpe-logo.png"
            alt="AtMoonPe"
            width={80}
            height={80}
            priority
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            AtMoonPe
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Admin Portal
          </p>
        </div>
      </div>

      <Link
        href="/login"
        className="mb-8 inline-flex w-fit items-center text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      {/* Title Area */}
      <div className="mb-8">
        <h2 className="mb-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[34px]">
          Create New Password
        </h2>
        <p className="text-base font-medium leading-relaxed text-slate-500">
          Your new password must be strong and different from previously used passwords.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* New Password Field */}
        <div className="space-y-2.5">
          <Label htmlFor="new-password" className="text-sm font-semibold text-slate-700">New Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="h-[52px] rounded-xl border-slate-200 bg-white/50 pl-12 pr-12 text-base transition-all placeholder:text-slate-400 hover:bg-white focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-3 flex flex-col px-1">
            <div className="mb-1.5 flex w-full space-x-1.5">
              <div className="h-1.5 flex-1 rounded-l-full bg-yellow-500"></div>
              <div className="h-1.5 flex-1 bg-slate-200"></div>
              <div className="h-1.5 flex-1 rounded-r-full bg-slate-200"></div>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Password strength: <span className="text-yellow-600">Medium</span>
            </span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2.5">
          <Label htmlFor="confirm-password" className="text-sm font-semibold text-slate-700">Confirm Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              className="h-[52px] rounded-xl border-slate-200 bg-white/50 pl-12 pr-12 text-base transition-all placeholder:text-slate-400 hover:bg-white focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="h-[52px] w-full rounded-xl bg-primary text-[15px] font-semibold text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.25)] transition-all hover:-translate-y-[1px] hover:bg-primary/95 hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)]" type="submit">
          Reset Password
        </Button>
      </form>

      {/* Security Message */}
      <div className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-500 ring-1 ring-slate-100">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <p>For your security, all sessions will be logged out after reset.</p>
      </div>
    </div>
  );
}
