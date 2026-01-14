import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    weight: ['200', '400', '700'],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Angela Denise Almazan",
    description: "Portfolio built with NEXTJS",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${poppins.className} ${poppins.className} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
