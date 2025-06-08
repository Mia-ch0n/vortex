import { Inter } from "next/font/google";
import "./globals.css";
import DependenciesInjection from "../components/DependenciesInjection";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Vortex",
  description: "Vortex is a platform for discovering and playing games.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <DependenciesInjection>
            {children}
          </DependenciesInjection>
        </AuthProvider>
      </body>
    </html>
  );
}
