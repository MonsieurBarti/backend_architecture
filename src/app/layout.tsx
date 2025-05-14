import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { auth } from "@/server/auth";

import { TRPCReactProvider } from "@/trpc/react";
import { SidebarNav } from "./_components/sidebar-nav";

export const metadata: Metadata = {
	title: "Expense Tracker",
	description: "Track your expenses and manage your finances",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await auth();

	return (
		<html lang="en" className={`${geist.variable}`}>
			<body className="bg-gray-50">
				<TRPCReactProvider>
					<div className="flex">
						{/* Only show sidebar when logged in */}
						{session && <SidebarNav />}
						<div className={`flex-1 ${session ? 'ml-64' : ''}`}>
							{children}
						</div>
					</div>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
