import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movie Zone",
  description: "Watch your favorite movies and TV shows",
  keywords: ["movies", "TV shows", "streaming", "entertainment"],
  authors: [{ name: "Mohamed Ali", url: "https://github.com/devbn3li/" }],
  openGraph: {
    title: "Movie Zone",
    description: "Watch your favorite movies and TV shows for free, no ads, no interruptions, just pure entertainment.",
    url: "https://moviezonee.mooo.com/",
    type: "website",
    images: [
      {
        url: "https://moviezonee.mooo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Movie Zone OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Zone",
    description: "Watch your favorite movies and TV shows for free, no ads, no interruptions, just pure entertainment.",
    images: ["https://moviezonee.mooo.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="min-h-screen w-full">
              <div className="relative ">
                <div className="fixed top-0 left-0 w-full z-50">
                  <SidebarTrigger className="sidebar-trigger" />
                  <Navbar />
                </div>
              </div>
              <AppSidebar />
              <div className="pt-16 min-h-[calc(100vh-5.07rem)]">
                {children}
              </div>
              <div className="relative bottom-0 w-full">
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}