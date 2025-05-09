import { Link } from 'react-router-dom';
import type { EventStatus, EventSummary } from '../types/event';
import type { JSX } from 'react';
import React from 'react';

const STATUS_BADGE: { [key in EventStatus]: JSX.Element } = {
  OPEN: (
    <span className='inline-flex items-center gap-x-1.0 py-1.0 px-2 rounded-full text-xs font-medium border border-teal-500 text-teal-500'>
      오픈
    </span>
  ),
  UPCOMING: (
    <span className='inline-flex items-center gap-x-1.0 py-1.0 px-2 rounded-full text-xs font-medium border border-gray-500 text-gray-500 dark:text-neutral-400'>
      예정
    </span>
  ),
  FCFS_CLOSED: (
    <span className='inline-flex items-center gap-x-1.0 py-1.0 px-2 rounded-full text-xs font-medium border border-red-500 text-red-500'>
      마감
    </span>
  ),
  LOTTERY_DRAWN: (
    <span className='inline-flex items-center gap-x-1.0 py-1.0 px-2 rounded-full text-xs font-medium border border-yellow-500 text-yellow-500'>
      완료
    </span>
  ),
  COMPLETED: (
    <span className='inline-flex items-center gap-x-1.0 py-1.0 px-2 rounded-full text-xs font-medium border border-white text-white'>
      종료
    </span>
  ),
};

type Props = {
  data: EventSummary;
};
function Component({ data: { event_id, name, status } }: Props) {
  return (
    <li>
      {STATUS_BADGE[status]}
      <Link
        to={`/chat/${event_id}`}
        className='flex items-center gap-x-2 py-1.5 px-1 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300 '
      >
        <p className='break-all'>{name}</p>
      </Link>
    </li>
  );
}

export const EventItem = React.memo(Component);
