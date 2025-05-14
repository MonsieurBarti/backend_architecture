'use client';

import { api } from '@/trpc/react';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export function UserActions() {
	const { data: actions, isLoading } = api.action.findAll.useQuery();

	return (
		<div className='w-full max-w-4xl mx-auto'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='font-bold text-xl text-indigo-100'>User Activity Log</h2>
				<div className='text-sm text-indigo-200 flex items-center'>
					<ClockIcon className='h-4 w-4 mr-1' />
					<span>Last updated: {new Date().toLocaleTimeString()}</span>
				</div>
			</div>

			{isLoading ? (
				<div className='bg-white/10 rounded-lg p-6 text-center'>
					<div className='animate-pulse'>Loading activity logs...</div>
				</div>
			) : actions && actions.length > 0 ? (
				<div className='bg-white/10 rounded-lg p-4'>
					<div className='max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
						<div className='space-y-3'>
							{actions.map(action => (
								<div
									key={action.id}
									className={`rounded-lg p-4 border ${action.success ? 'bg-green-900/20 border-green-700/30' : 'bg-red-900/20 border-red-700/30'}`}
								>
									<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
										<div className='flex items-center'>
											{action.success ? (
												<CheckCircleIcon className='h-5 w-5 text-green-400 mr-2 flex-shrink-0' />
											) : (
												<XCircleIcon className='h-5 w-5 text-red-400 mr-2 flex-shrink-0' />
											)}
											<span className='font-medium text-indigo-100'>
												{action.entityType}: <span className='text-indigo-300'>{action.methodName}</span>
											</span>
										</div>
										<span className='text-sm text-indigo-300 mt-1 sm:mt-0'>
											{format(new Date(action.createdAt), 'MMM d, yyyy h:mm a')}
										</span>
									</div>
									<div className='mt-2 text-sm grid grid-cols-2 gap-2'>
										<div className='bg-black/20 px-3 py-2 rounded'>
											<span className='text-indigo-300 text-xs'>Entity ID</span>
											<p className='text-indigo-100 truncate' title={action.entityId}>{action.entityId}</p>
										</div>
										<div className='bg-black/20 px-3 py-2 rounded'>
											<span className='text-indigo-300 text-xs'>Origin</span>
											<p className='text-indigo-100'>{action.origin}</p>
										</div>
									</div>
									{action.payload && (
										<details className='mt-3 bg-black/30 rounded-md'>
											<summary className='cursor-pointer text-xs p-2 text-indigo-300 hover:text-indigo-100 transition-colors'>
												View payload data
											</summary>
											<div className='p-3 border-t border-indigo-800/30'>
												<div className='text-xs text-indigo-200 whitespace-pre-wrap break-words'>
													{action.payload}
												</div>
											</div>
										</details>
									)}
									{!action.success && action.failureReason && (
										<div className='mt-3 bg-red-900/30 border border-red-800/30 rounded-md p-3'>
											<p className='text-red-300 text-sm flex items-center'>
												<XCircleIcon className='h-4 w-4 mr-1' />
												Error: {action.failureReason}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className='bg-white/10 rounded-lg p-6 text-center text-indigo-200'>
					<p>No activity logs recorded yet.</p>
					<p className='text-sm mt-2'>Actions will appear here when you perform operations like adding or removing bank accounts.</p>
				</div>
			)}
		</div>
	);
}
