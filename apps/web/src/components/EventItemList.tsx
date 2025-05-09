import { useEffect, useState, useCallback } from 'react';
import useInfiniteProducts from '../hooks/useInfiniteProducts';
import { EventItem } from './EventItem';
import type { EventSummary } from '../types/event';

export function EventItemList() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<EventSummary[]>([]); // 누적 데이터
  const [isEnd, setIsEnd] = useState(false); // 마지막 페이지 여부
  const { data, isValidating } = useInfiniteProducts(page);

  // 새 데이터가 들어오면 누적
  useEffect(() => {
    if (data && data.length > 0) {
      setItems((prev) => {
        // 중복 방지 (event_id 기준)
        const ids = new Set(prev.map((d) => d.event_id));
        const filtered = data.filter((d) => !ids.has(d.event_id));
        return [...prev, ...filtered];
      });
      if (data.length < 20) setIsEnd(true); // 20개 미만이면 마지막 페이지
    } else if (data && data.length === 0) {
      setIsEnd(true);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (isValidating || isEnd) return;
    setPage((prev) => prev + 1);
  }, [isValidating, isEnd]);

  useEffect(() => {
    const sidebar = document.getElementById('event-list-container');
    if (!sidebar) return;
    const onScroll = () => {
      if (
        sidebar.scrollTop + sidebar.clientHeight >=
        sidebar.scrollHeight - 10
      ) {
        loadMore();
      }
    };
    sidebar.addEventListener('scroll', onScroll);
    return () => {
      sidebar.removeEventListener('scroll', onScroll);
    };
  }, [loadMore]);

  return (
    <div
      id='event-list-container'
      className='h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
    >
      <ul className='space-y-1.5 p-4'>
        {items.length === 0 && <li>Something wrong ...</li>}
        {items.map((d) => (
          <EventItem key={d.event_id} data={d} />
        ))}
        {isValidating && (
          <>
            <li className='animate-pulse w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700'></li>
            <li className='animate-pulse w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700'></li>
            <li className='animate-pulse w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700'></li>
            <li className='animate-pulse w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700'></li>
          </>
        )}
        {isEnd && items.length > 0 && (
          <li className='text-center text-xs text-gray-400 py-2'>
            마지막 이벤트입니다
          </li>
        )}
      </ul>
    </div>
  );
}
