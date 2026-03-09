import packageJson from "../../package.json";
import { type Language, uiCopy } from "@/lib/i18n";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const copy = uiCopy[language];

  return (
    <footer className="w-full text-center text-sm text-neutral-500 p-2">
      <p>
        v{packageJson.version}
        {" • "}
        <a
          href="https://github.com/umbertoragone/cn23-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {copy.viewOnGithub}
        </a>
      </p>
    </footer>
  );
}
