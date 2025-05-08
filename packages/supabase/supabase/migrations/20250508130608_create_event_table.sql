create table event (
  event_id uuid primary key default gen_random_uuid(),
  name text not null,
  open_time bigint not null,         -- Unix timestamp (seconds)
  fcfs_limit integer not null,
  winner_count integer not null,
  --UPCOMING: 예정된 이벤트 (default)
  --OPEN: 예약 진행 중
  --FCFS_CLOSED: 선착순 마감
  --LOTTERY_DRAWN: 추첨 완료
  --COMPLETED: 이벤트 종료
  status text not null default 'UPCOMING' check (
    status in ('UPCOMING', 'OPEN', 'FCFS_CLOSED', 'LOTTERY_DRAWN', 'COMPLETED')
  ),
  created_at timestamp with time zone not null default now()
);




