import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AuviaMart | Pure. Curated. Delivered.",
  description: "High-end e-commerce platform for organic and premium products in Pakistan.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
