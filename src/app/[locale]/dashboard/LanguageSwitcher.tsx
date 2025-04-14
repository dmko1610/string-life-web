"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLanguage("en")} disabled={locale === "en"}>
        EN
      </button>
      <button onClick={() => switchLanguage("ru")} disabled={locale === "ru"}>
        RU
      </button>
    </div>
  );
}
