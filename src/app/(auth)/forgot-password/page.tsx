import Link from "next/link";
import { Mail, ArrowLeft, Send, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <Link 
        href="/login" 
        className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Forgot Password?</h1>
      <p className="text-muted-foreground mb-8">
        Enter your registered email address and we'll send you instructions to reset your password.
      </p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold text-foreground">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email address" 
              className="pl-10 h-11 bg-background"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 text-base font-semibold" type="submit">
          <Send className="mr-2 h-5 w-5" />
          Send Reset Link
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
        <Button variant="outline" className="w-full h-12 text-base font-semibold border-border text-primary hover:bg-primary/5 hover:text-primary" asChild>
          <Link href="/login">
            <Lock className="mr-2 h-5 w-5" />
            Back to Login
          </Link>
        </Button>
      </form>
    </div>
  );
}

