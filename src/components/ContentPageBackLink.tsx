"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  type Language,
  uiCopy,
} from "@/lib/i18n";

interface ContentPageBackLinkProps {
  defaultLanguage?: Language;
}

export default function ContentPageBackLink({
  defaultLanguage = "en",
}: ContentPageBackLinkProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (isLanguage(storedLanguage)) {
        setLanguage(storedLanguage);
      }
    } catch {}

    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail;

      if (isLanguage(nextLanguage)) {
        setLanguage(nextLanguage);
      }
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, []);

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/" className="inline-flex items-center gap-2">
        <ChevronLeft className="size-4" />
        {uiCopy[language].backToGenerator}
      </Link>
    </Button>
  );
}
