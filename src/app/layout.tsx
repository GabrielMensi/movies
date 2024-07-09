import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getData } from "@/lib/util";
import "@/styles/globals.css";
import { Providers } from "@/app/ThemeProvider";
import Navbar from "@/components/Navbar";
import StoreProvider from "@/app/StoreProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Movies app",
    description: "Welcome to the ultimate movie recommendation app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const movieGenres = await getData("/genre/movie/list");
    const tvGenres = await getData("/genre/tv/list");
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <StoreProvider
                    state={{ value: false, token: "", sessionId: "" }}
                >
                    <Providers>
                        <Navbar
                            movieGenres={movieGenres.genres}
                            tvGenres={tvGenres.genres}
                        />
                        <main className="flex min-h-screen flex-col w-full py-7 px-4 md:py-28 md:px-12 overflow-hidden max-w-7xl mx-auto">
                            {children}
                            <Analytics />
                            <SpeedInsights />
                        </main>
                    </Providers>
                </StoreProvider>
            </body>
        </html>
    );
}
