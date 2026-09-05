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

      {/* Title Area */}
      <div className="mb-8">
        <h2 className="mb-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[34px]">
          Welcome Back!
        </h2>
        <p className="text-base font-medium leading-relaxed text-slate-500">
          Login to access the AtMoonPe administration portal and manage platform operations.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="admin@atmoonpe.com"
              className="h-[52px] rounded-xl border-slate-200 bg-white/50 pl-12 text-base transition-all placeholder:text-slate-400 hover:bg-white focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-[52px] rounded-xl border-slate-200 bg-white/50 pl-12 pr-12 text-base transition-all placeholder:text-slate-400 hover:bg-white focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2.5">
            <Checkbox id="remember" className="h-5 w-5 rounded-[6px] border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <Label htmlFor="remember" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-bold text-primary transition-colors hover:text-primary/80"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button className="h-[52px] w-full rounded-xl bg-primary text-[15px] font-semibold text-white shadow-[0_4px_14px_0_rgba(99,102,241,0.25)] transition-all hover:-translate-y-[1px] hover:bg-primary/95 hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)]" type="submit">
          Login to Admin Dashboard
        </Button>
      </form>

      {/* Security Message */}
      <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-50/80 px-4 py-3 ring-1 ring-slate-100">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <p>Secure admin access for platform operations.</p>
      </div>
    </div>
  );
}
