export const metadata = {
  title: "Expense Dashboard",
  description: "Track personal expenses locally in your browser"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
