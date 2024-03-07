import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Register Form",
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
