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
  title: "Movie App",
  description: "Watch your favorite movies and TV shows",
  keywords: ["movies", "TV shows", "streaming", "entertainment"],
  authors: [{ name: "Mohamed Ali", url: "https://github.com/devbn3li/" }],
  openGraph: {
    title: "Movie App",
    description: "Watch your favorite movies and TV shows",
    url: "https://moviezonee.mooo.com/",
    type: "website",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex flex-col justify-between min-h-screen w-full">
              <div className="relative ">
                <div className="fixed top-0 left-0 w-full z-50">
                <SidebarTrigger className="sidebar-trigger" />
                  <Navbar />
                </div>
              </div>
              <AppSidebar />
              <div className="pt-16">
                {children}
              </div>
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}