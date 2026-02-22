import type { Metadata } from "next";
// import {
//   Geist,
//   Geist_Mono,
//   Metal_Mania,
//   Michroma,
//   Poppins,
// } from "next/font/google";
import "./global.css";
import ClientLayout from '../hydrationFix/clientLayout'
import { WebSocketProvider } from "@/app/context/WebSocketContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const metalMania = Metal_Mania({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-metal-mania",
// });

// const michroma = Michroma({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-michroma",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-poppins",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Code Red",
//   description: "Anonymous app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <WebSocketProvider>{children}</WebSocketProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
