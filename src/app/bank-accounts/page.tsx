import { Metadata } from 'next';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { api } from '@/trpc/server';
import { BankAccountsList } from './components/bank-accounts-list';

export const metadata: Metadata = {
	title: 'Bank Accounts',
	description: 'Manage your bank accounts',
};

export default async function BankAccountsPage() {
	const session = await auth();
	if (!session) {
		redirect('/api/auth/signin');
	}

	const bankAccounts = await api.accountManagement.getAllBankAccounts();

	return <BankAccountsList initialAccounts={bankAccounts} />;
}
