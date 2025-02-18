import packageJson from "../../package.json";

export default function Footer() {
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
          View on GitHub
        </a>
      </p>
    </footer>
  );
}
