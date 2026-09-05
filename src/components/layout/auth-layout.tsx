import React from "react";
import Image from "next/image";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F6F4FF] p-0 sm:p-5 flex flex-col">
      <div className="flex-1 w-full overflow-hidden bg-white sm:rounded-[22px] shadow-sm border border-slate-100">
        <div className="grid h-full w-full lg:grid-cols-[46%_54%]">
          <div className="flex h-full w-full flex-col items-center justify-center bg-white px-4 py-6 sm:px-8 lg:px-12">
            {children}
          </div>

          <div className="relative hidden bg-[#F5F3FF] lg:block">
            <Image
              src="/login/login-image.png"
              alt="Admin Portal Background"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}