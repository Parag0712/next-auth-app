import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login Form",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="description" content={metadata.description!} />
            </head>
            <body >
                
                {children}
            </body>
        </html>
    );
}
