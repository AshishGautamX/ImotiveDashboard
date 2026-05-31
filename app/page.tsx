import { Binary, DatabaseZap, Globe, Server } from "lucide-react";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";

const staticCourses = [
  { title: "Data Science", progress: 34, seatsLeft: 6, lessonsLabel: "17/50 lessons", icon: DatabaseZap },
  { title: "Backend Java", progress: 18, seatsLeft: 9, lessonsLabel: "8/45 lessons", icon: Server },
  { title: "Full Stack", progress: 52, seatsLeft: 4, lessonsLabel: "31/60 lessons", icon: Globe },
  { title: "CS Essentials", progress: 71, seatsLeft: 3, lessonsLabel: "50/70 lessons", icon: Binary },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <nav className="border-b border-accent/20 bg-bg-card px-4 py-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent sm:text-sm">
              Ashish&apos;s Learning Dashboard
            </p>
          </nav>

          <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 md:pb-6 lg:px-8">
            <section
              aria-label="Dashboard tiles"
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
            >
              <HeroTile />

              <ActivityTile className="md:col-span-2 lg:col-span-1" />

              {staticCourses.map((course) => (
                <CourseCard
                  key={course.title}
                  title={course.title}
                  progress={course.progress}
                  seatsLeft={course.seatsLeft}
                  lessonsLabel={course.lessonsLabel}
                  icon={course.icon}
                />
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
