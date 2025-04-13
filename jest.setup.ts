import "@testing-library/jest-dom";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useFormatter: () => ({
    format: (value: any) => value
  }),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams()
}));
