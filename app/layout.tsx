import Nav from "./components/Nav";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";

// fonts
import { Roboto, Lobster_Two } from "next/font/google";
import React from "react";

//Define main Font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "Ecommerce Store",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  // fetch the user
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body className={`mx-4 lg:mx-48 ${roboto.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
