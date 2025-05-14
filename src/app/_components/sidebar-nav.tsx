'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Bank Accounts', href: '/bank-accounts', icon: BanknotesIcon },
  // Add more navigation items here as the app grows
];

export function SidebarNav() {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full flex-col bg-indigo-800 text-white w-64 fixed left-0 top-0 bottom-0">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">Expense Tracker</h1>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive ? 'text-indigo-300' : 'text-indigo-300 group-hover:text-indigo-200'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
