import Link from 'next/link';
import { auth } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import { UserActions } from './_components/action';
import { BanknotesIcon } from '@heroicons/react/24/outline';

export default async function Home() {
	const session = await auth();

	return (
		<HydrateClient>
			<main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-900 text-white'>
				<div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
					<h1 className='font-extrabold text-5xl tracking-tight text-center sm:text-[5rem]'>
						Expense <span className='text-indigo-200'>Tracker</span>
					</h1>

					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 max-w-4xl'>
						<Link
							className='flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition-all items-center justify-center'
							href='/bank-accounts'
						>
							<BanknotesIcon className='h-12 w-12 text-indigo-200' />
							<h3 className='font-bold text-2xl'>Manage Bank Accounts</h3>
							<div className='text-lg text-center'>
								Add, view, and manage your connected bank accounts
							</div>
						</Link>

						{/* Additional feature cards can be added here */}
					</div>

					{session ? (
						<div className='flex flex-col items-center gap-6 mt-8'>
							<div className='w-full max-w-lg'>
								<UserActions />
							</div>

							<div className='flex flex-col items-center justify-center gap-4'>
								<p className='text-center text-xl text-indigo-100'>Logged in as {session.user?.name}</p>
								<Link
									href='/api/auth/signout'
									className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
								>
									Sign out
								</Link>
							</div>
						</div>
					) : (
						<div className='flex flex-col items-center gap-6 mt-8'>
							<p className='text-indigo-100 text-xl'>Sign in to track your expenses</p>
							<Link
								href='/api/auth/signin'
								className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
							>
								Sign in
							</Link>
						</div>
					)}
				</div>
			</main>
		</HydrateClient>
	);
}
