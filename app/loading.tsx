import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CourseGridFallback } from "@/components/dashboard/CourseGridFallback";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <nav className="sticky top-0 z-30 border-b border-white/[0.05] bg-[#030108]/60 backdrop-blur-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
          </nav>

          <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
              {/* Hero Tile Skeleton */}
              <div className="flex flex-col justify-center rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 backdrop-blur-xl md:col-span-2 lg:p-8">
                <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
                <div className="mt-4 h-10 w-64 animate-pulse rounded bg-white/5" />
                <div className="mt-6 h-4 w-3/4 animate-pulse rounded bg-white/5" />
              </div>
              
              {/* Activity Tile Skeleton */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 backdrop-blur-xl md:col-span-2 lg:col-span-1">
                 <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
                 <div className="mt-6 grid grid-cols-7 gap-2">
                   {Array.from({ length: 35 }).map((_, i) => (
                     <div key={i} className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse rounded-[4px] bg-white/5" />
                   ))}
                 </div>
              </div>

              <CourseGridFallback />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
