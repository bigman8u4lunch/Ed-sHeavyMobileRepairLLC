import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business } from "@/lib/site-data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edsheavymobile.com"),
  title: {
    default: business.name,
    template: `%s | ${business.name}`,
  },
  description:
    "Ed's Heavy Mobile Repair provides professional heavy duty truck & diesel repair in Escondido, CA. Services include DOT/CVIP Inspection, General Diesel Repair, and more.",
  robots: "index, follow",
  openGraph: {
    title: business.name,
    description:
      "Professional heavy duty truck & diesel repair in Escondido, CA.",
    type: "website",
    url: "https://edsheavymobile.com",
    siteName: business.name,
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/images/logo.webp",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  url: "https://edsheavymobile.com",
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "US",
  },
  logo: "https://edsheavymobile.com/images/logo.webp",
  image: "https://edsheavymobile.com/images/logo.webp",
  openingHoursSpecification: [
    { dayOfWeek: "Monday", opens: "07:00", closes: "17:00" },
    { dayOfWeek: "Tuesday", opens: "07:00", closes: "17:00" },
    { dayOfWeek: "Wednesday", opens: "07:00", closes: "17:00" },
    { dayOfWeek: "Thursday", opens: "07:00", closes: "17:00" },
    { dayOfWeek: "Friday", opens: "07:00", closes: "17:00" },
    { dayOfWeek: "Saturday", opens: "07:00", closes: "12:00" },
    { dayOfWeek: "Sunday", opens: "07:00", closes: "12:00" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${business.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${business.gtmId}');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
