"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base px-4 py-10 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[900px] items-center justify-center">
        <article className="w-full rounded-2xl border border-accent/30 bg-bg-card p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            Data Connection Error
          </p>
          <h1 className="mt-3 font-heading text-2xl tracking-tight sm:text-3xl">
            Unable to load dashboard courses
          </h1>
          <p className="mt-3 text-sm text-text-muted sm:text-base">
            Supabase could not be reached right now. Check your environment variables,
            project status, and table seed data.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex cursor-pointer items-center rounded-lg border border-accent/40 bg-bg-base px-4 py-2 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Retry
          </button>
        </article>
      </div>
    </div>
  );
}
