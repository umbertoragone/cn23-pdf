"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { LANGUAGE_STORAGE_KEY, isLanguage } from "@/lib/i18n";

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
    let nextLanguage = "en";

    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (isLanguage(storedLanguage)) {
        nextLanguage = storedLanguage;
      }
    } catch {}

    router.replace(`/blog/${nextLanguage}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <Loading width={720} />
    </div>
  );
}
