import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Welcome Back!</h1>
      <p className="text-muted-foreground mb-8">
        Login to access the AtMoonPe administration portal and manage platform operations.
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
              placeholder="admin@atmoonpe.com" 
              className="pl-10 h-11 bg-background"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="pl-10 pr-10 h-11 bg-background"
            />
            <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <Label htmlFor="remember" className="text-sm font-medium text-foreground cursor-pointer">
              Remember me
            </Label>
          </div>
          <Link 
            href="/forgot-password" 
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 text-base font-semibold" type="submit">
          <Lock className="mr-2 h-5 w-5" />
          Login to Admin Dashboard
        </Button>
      </form>
    </div>
  );
}
