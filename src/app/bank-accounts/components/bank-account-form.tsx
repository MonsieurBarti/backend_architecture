'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

// Form validation schema using Zod
const bankAccountFormSchema = z.object({
  name: z.enum(['BOURSORAMA', 'TRADE_REPUBLIC'], {
    required_error: 'Please select a bank',
  }),
  iban: z.string().min(15, {
    message: 'IBAN must be at least 15 characters',
  }),
  bic: z.string().min(8, {
    message: 'BIC must be at least 8 characters',
  }),
});

type BankAccountFormValues = z.infer<typeof bankAccountFormSchema>;

export function BankAccountForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up the form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues: {
      name: undefined,
      iban: '',
      bic: '',
    },
  });

  // Use tRPC mutation for adding a bank account
  const addBankAccount = api.accountManagement.addBankAccount.useMutation({
    onSuccess: () => {
      setIsSubmitting(false);
      reset();
      router.push('/bank-accounts');
      router.refresh();
    },
    onError: (error) => {
      setIsSubmitting(false);
      console.error('Failed to add bank account:', error);
    },
  });

  // Form submission handler
  const onSubmit = async (data: BankAccountFormValues) => {
    setIsSubmitting(true);
    addBankAccount.mutate({
      name: data.name,
      iban: data.iban,
      bic: data.bic,
      origin: 'WEB',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Bank
          </label>
          <select
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a bank</option>
            <option value="BOURSORAMA">Boursorama</option>
            <option value="TRADE_REPUBLIC">Trade Republic</option>
          </select>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
            IBAN
          </label>
          <input
            id="iban"
            type="text"
            {...register('iban')}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.iban && (
            <p className="mt-1 text-sm text-red-600">{errors.iban.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bic" className="block text-sm font-medium text-gray-700">
            BIC
          </label>
          <input
            id="bic"
            type="text"
            {...register('bic')}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.bic && (
            <p className="mt-1 text-sm text-red-600">{errors.bic.message}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add Bank Account'}
        </button>
      </div>
    </form>
  );
}
