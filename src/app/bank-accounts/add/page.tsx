import { Metadata } from 'next';
import { BankAccountForm } from '../components/bank-account-form';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
	title: 'Add Bank Account',
	description: 'Add a new bank account to your profile',
};

export default async function AddBankAccountPage() {
	const session = await auth();
	if (!session) {
		redirect('/api/auth/signin');
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-900'>
			<div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='mb-6'>
					<Link
						href='/bank-accounts'
						className='inline-flex items-center text-indigo-200 hover:text-white transition-colors'
					>
						<ArrowLeftIcon className='h-4 w-4 mr-2' />
						Back to Bank Accounts
					</Link>
				</div>
				
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h1 className='mt-6 text-center text-3xl font-extrabold text-white'>Add Bank Account</h1>
					<p className='mt-2 text-center text-sm text-indigo-200'>
						Connect a new bank account to track your finances
					</p>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<BankAccountForm />
					</div>
				</div>
			</div>
		</div>
	);
}
