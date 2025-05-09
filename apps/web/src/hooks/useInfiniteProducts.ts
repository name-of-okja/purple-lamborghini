import useSWR from 'swr';
import type { EventSummary } from '../types/event';

const EVENT_API = import.meta.env.VITE_EVENT_API;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInfiniteProducts = (page: number) => {
  const { data, error, isValidating } = useSWR<EventSummary[]>(
    `${EVENT_API}/event?page=${page}`, // 페이지 넘버를 URL에 포함
    fetcher,
    {
      revalidateOnFocus: false, // 페이지 포커스 시 재요청 방지
      keepPreviousData: true, // 이전 데이터를 유지해서 smooth한 사용자 경험 제공
    }
  );

  return {
    data,
    error,
    isValidating,
  };
};

export default useInfiniteProducts;
