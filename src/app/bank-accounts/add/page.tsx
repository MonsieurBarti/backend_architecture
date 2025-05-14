import { Metadata } from 'next';
import { BankAccountForm } from '../components/bank-account-form';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

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
		<div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Add Bank Account</h1>
				<p className='mt-2 text-center text-sm text-gray-600'>
					Connect a new bank account to track your finances
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<BankAccountForm />
				</div>
			</div>
		</div>
	);
}
