import { Inter } from "next/font/google";
import Header from "./components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Generates metadata for the page.
 *
 * @param {string} productTitle - The title of the product to include in the metadata.
 * @returns {Object} - An object containing the title and description for the page metadata.
 */
export function getMetadata(productTitle) {
  return {
    title: `${productTitle} DigitizeMart.`,
    description: `This is the product page for ${productTitle} on DigitizeMart, an E-commerce Store project designed as a web application to allow users to browse, search, filter, and sort products from a mock e-commerce API.`,
    manifest: '/site.webmanifest',
    icons: [
      { rel: "icon", href: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { rel: "icon", href: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "shortcut icon", href: "/favicon.ico" }
    ]
  };
}


/**
 * Root layout component that wraps the entire application.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {string} [props.productTitle=""] - The title of the product for metadata.
 * @returns {JSX.Element} - The rendered root layout.
 */
export default function RootLayout({ children, productTitle = "" }) {
  const metadata = getMetadata(productTitle);

  return (
    <html lang="en" className="bg-white">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {metadata.icons.map((icon, idx) => (
          <link key={idx} rel={icon.rel} href={icon.href} sizes={icon.sizes} type={icon.type} />
        ))}
        <link rel="manifest" href={metadata.manifest} />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
