'use client';

import { api } from '@/trpc/react';

export function UserActions() {
	const { data: actions, isLoading } = api.action.findAll.useQuery();

	return (
		<div className='w-full max-w-lg'>
			<h2 className='mb-4 font-bold text-xl '>User Activity Log</h2>

			{isLoading ? (
				<p>Loading actions...</p>
			) : actions && actions.length > 0 ? (
				<div className='space-y-3'>
					{actions.map(action => (
						<div
							key={action.id}
							className={`rounded-lg p-3 ${action.success ? 'bg-green-800/20' : 'bg-red-800/20'}`}
						>
							<div className='flex justify-between'>
								<span className='font-medium'>
									{action.entityType}: {action.methodName}
								</span>
								<span className='text-sm opacity-70'>
									{new Date(action.createdAt).toLocaleString()}
								</span>
							</div>
							<div className='mt-1 text-sm'>
								<p>Entity ID: {action.entityId}</p>
								<p>Origin: {action.origin}</p>
								{action.payload && (
									<details className='mt-1'>
										<summary className='cursor-pointer text-xs'>View payload</summary>
										<pre className='mt-1 max-h-24 overflow-auto rounded bg-black/30 p-2 text-xs'>
											{action.payload}
										</pre>
									</details>
								)}
								{!action.success && action.failureReason && (
									<p className='mt-1 text-red-400'>Failed: {action.failureReason}</p>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No actions recorded yet.</p>
			)}
		</div>
	);
}
