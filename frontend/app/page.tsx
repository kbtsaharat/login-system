'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  // ✅ ถ้ามี token ให้เด้งไป /dashboard ทันที
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 dark:from-zinc-900 dark:to-black font-sans">
      <main className="flex flex-col items-center justify-center w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-10 text-center border border-gray-100 dark:border-zinc-800">

        {/* โลโก้ */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* <Image
            src="/vizzeltrack-logo.svg" // ✅ ใส่โลโก้จริงของคุณ (ถ้ามี)
            alt="VizzelTrack logo"
            width={80}
            height={80}
            className="rounded-full dark:invert"
            priority
          /> */}
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            VizzelTrack
          </h1>
        </div>

        {/* ข้อความต้อนรับ */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Welcome to VizzelTrack
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
          The smarter way to <span className="font-medium text-blue-600">visualize </span> 
          and <span className="font-medium text-blue-600">track</span> your business data.
        </p>

        {/* ปุ่ม Sign In / Sign Up */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs">
          <Button
            asChild
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-[1.02]"
          >
            <a href="/login">Sign In</a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-all hover:scale-[1.02]"
          >
            <a href="/register">Sign Up</a>
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} VizzelTrack. All rights reserved.
        </p>
      </main>
    </div>
  );
}
