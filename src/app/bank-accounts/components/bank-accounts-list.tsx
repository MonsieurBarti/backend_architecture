'use client';

import Link from 'next/link';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { useState } from 'react';

// This matches the DTO structure from the server
type BankAccountDto = {
  id: string;
  userId: string;
  name: string;
  iban: string;
  bic: string;
};

export function BankAccountsList({ initialAccounts }: { initialAccounts: BankAccountDto[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Use the mutation for removing bank accounts
  const removeBankAccount = api.accountManagement.removeBankAccount.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onSettled: () => {
      setIsDeleting(null);
    }
  });

  const handleRemove = (id: string) => {
    setIsDeleting(id);
    removeBankAccount.mutate({
      id,
      origin: 'WEB'
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Bank Accounts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your connected bank accounts
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/bank-accounts/add"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add account
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {initialAccounts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No bank accounts found. Add your first account to get started.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Bank
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        IBAN
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        BIC
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {initialAccounts.map((account) => (
                      <tr key={account.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {account.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {account.iban}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {account.bic}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleRemove(account.id)}
                            disabled={isDeleting === account.id}
                            className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            {isDeleting === account.id ? 'Removing...' : 'Remove'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
