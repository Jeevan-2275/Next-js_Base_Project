import "./globals.css";
import ThemeRegistry from "./ThemeRegistry"; // client component

export const metadata = {
  title: "MF Dashboard",
  description: "Assignment Dual Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
