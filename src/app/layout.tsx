import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jot. — Personal Notes",
  description: "A quiet place to collect, edit, and revisit your thoughts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
