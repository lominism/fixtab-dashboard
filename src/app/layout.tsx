import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixtab Dashboard",
  description: "Fixtab Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BreadcrumbProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 z-10 bg-white shadow flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 h-4 w-px bg-amber-700"
                  />
                  <BreadcrumbHeader />
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <p className="text-3xl font-bold">Admin Dashboard</p>
                </div>
              </header>
              <main>{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </BreadcrumbProvider>
      </body>
    </html>
  );
}
