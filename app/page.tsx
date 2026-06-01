import { Suspense } from "react";
import Image from "next/image";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { AnimatedTiles } from "@/components/dashboard/AnimatedTiles";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseGridFallback } from "@/components/dashboard/CourseGridFallback";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <nav className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.05] bg-[#030108]/60 backdrop-blur-xl px-4 py-4 sm:px-6 lg:px-8">
            <Image 
              src="/logo.png" 
              alt="Imotive Logo" 
              width={24} 
              height={24} 
              className="rounded object-cover lg:hidden"
            />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              Imotive Learning Dashboard
            </p>
          </nav>

          <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-6 lg:px-8">
            <AnimatedTiles
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
            >
              <HeroTile />

              <ActivityTile className="md:col-span-2 lg:col-span-1" />

              <Suspense fallback={<CourseGridFallback />}>
                <CourseGrid />
              </Suspense>
            </AnimatedTiles>
          </main>
        </div>
      </div>
    </div>
  );
}
