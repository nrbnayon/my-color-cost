// app\layout.tsx
import type { Metadata } from "next";
import { Inter, Geist_Mono, Nunito_Sans, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import StoreProvider from "@/redux/StoreProvider";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const zilla = Zilla_Slab({
  variable: "--font-zilla",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "My Color Cost - Retailer Dashboard",
    template: "%s | My Color Cost",
  },
  description:
    "My Color Cost - Retailer Dashboard for managing your orders, products, customers, and more. Streamline your workflow with our intuitive admin panel.",
  keywords: [
    "My Color Cost",
    "Retailer Dashboard",
    "Admin Panel",
    "User Management",
    "Product Management",
    "Order Management",
    "Customer Management",
    "privacy policy",
    "terms and conditions",
    "about us",
    "contact us",
    "faq",
    "blog",
    "help center",
    "support",
  ],
  // PWA Configuration
  manifest: "/manifest.json",
  authors: [{ name: "Nayon" }],
  creator: "Nayon",
  publisher: "Nayon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "My Color Cost",
    title: "My Color Cost - Retailer Dashboard",
    description:
      "My Color Cost - Retailer Dashboard for managing your orders, products, customers, and more. Streamline your workflow with our intuitive admin panel.",
    images: [
      {
        url: "/icons/logo.png",
        width: 1200,
        height: 630,
        alt: "My Color Cost Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Color Cost - Retailer Dashboard",
    description:
      "My Color Cost - Retailer Dashboard for managing your orders, products, customers, and more. Streamline your workflow with our intuitive admin panel.",
    images: ["/icons/logo.png"],
    creator: "@nrbnayon",
  },
  alternates: {
    canonical: "/",
  },
  category: "Software",
  classification: "Dashboard Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#F3A6BE" />
        <link rel="icon" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "My Color Cost",
              applicationCategory: "Dashboard Management System",
              operatingSystem: "Web",
              description:
                "My Color Cost - Retailer Dashboard for managing your orders, products, customers, and more. Streamline your workflow with our intuitive admin panel.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "1",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} ${nunito.variable} ${zilla.variable} antialiased bg-background font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <StoreProvider>
              {children}
              <Toaster richColors position="top-center" />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
