import { type ReactNode } from 'react';

type Props = {
  message: string;
  children?: ReactNode;
};

export function MyChat({ message, children }: Props) {
  return (
    <li className='py-2 sm:py-4'>
      <div className='max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto'>
        <div className='max-w-2xl flex gap-x-2 sm:gap-x-4'>
          <span className='shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-gray-600'>
            <span className='text-sm font-medium text-white'>ME</span>
          </span>

          <div className='grow mt-2 space-y-3'>
            <p className='text-gray-800 dark:text-neutral-200'>{message}</p>
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}
