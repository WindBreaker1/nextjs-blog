import { Geist, Geist_Mono, Roboto} from "next/font/google";
import "./globals.css";
import { UserProvider } from "./api/middleware/userContext";
import Header from "@/components/header/header";

// Fonts //

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata //

export const metadata = {
  title: "Blogly",
  description: "Quirky, fullstack, blog app.",
};

// App //

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
