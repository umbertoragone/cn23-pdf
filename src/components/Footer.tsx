"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import packageJson from "../../package.json";
import { cn } from "@/lib/utils";
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  type Language,
  uiCopy,
} from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FooterProps {
  language?: Language;
  className?: string;
  onLanguageChange?: (language: Language) => void;
  localizedPaths?: Partial<Record<Language, string>>;
}

export default function Footer({
  language = "en",
  className,
  onLanguageChange,
  localizedPaths,
}: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);

  useEffect(() => {
    if (onLanguageChange) {
      setCurrentLanguage(language);
      return;
    }

    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (isLanguage(storedLanguage)) {
        setCurrentLanguage(storedLanguage);
        return;
      }
    } catch {}

    setCurrentLanguage(language);
  }, [language, onLanguageChange]);

  const copy = uiCopy[currentLanguage];

  function handleLanguageChange(nextLanguage: string) {
    if (!isLanguage(nextLanguage)) {
      return;
    }

    setCurrentLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {}

    window.dispatchEvent(
      new CustomEvent<Language>(LANGUAGE_CHANGE_EVENT, {
        detail: nextLanguage,
      }),
    );

    onLanguageChange?.(nextLanguage);

    const nextPath = localizedPaths?.[nextLanguage];

    if (nextPath && nextPath !== pathname) {
      router.replace(nextPath);
    }
  }

  return (
    <footer
      className={cn(
        "w-full border-t border-neutral-200 px-4 py-4 text-sm text-neutral-500 dark:border-neutral-800",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>
          {" "}
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="font-semibold text-neutral-900 dark:text-neutral-100"
          >
            CN23.it
          </Link>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href="/blog"
              className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
            >
              {copy.blog}
            </Link>
            <Link
              href="/faq"
              className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
            >
              {copy.faq}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
            >
              {copy.privacy}
            </Link>
            <Link
              href="https://github.com/umbertoragone/cn23-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
            >
              {copy.viewOnGithub}
            </Link>
          </nav>
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger
              className="h-8 w-24 border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
              aria-label={copy.language}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-24">
              <SelectItem value="it">{uiCopy.it.italian}</SelectItem>
              <SelectItem value="en">{uiCopy.en.english}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
}
