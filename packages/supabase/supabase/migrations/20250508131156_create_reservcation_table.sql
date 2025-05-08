create table reservations (
  reservation_id uuid primary key default gen_random_uuid(),
  event_id uuid not null references event(event_id) ,
  user_id uuid not null references users(user_id),

  reservation_attempt_time bigint not null,  -- Unix timestamp
  -- PENDING_FCFS: 선착순 대기 중
  -- IN_FCFS_QUEUE: 선착순 대기 중 (대기열에 있음)
  -- ACCEPTED_FOR_LOTTERY: 추첨에 포함됨
  -- REJECTED_FCFS_LIMIT: 선착순 마감으로 거부됨
  -- REJECTED_TOO_EARLY: 너무 이른 시간에 예약 시도
  -- REJECTED_ERROR: 오류로 인해 거부됨
  -- SELECTED_WINNER: 당첨됨
  -- NOT_SELECTED: 당첨되지 않음
  status text not null check (
    status in (
      'PENDING_FCFS',
      'IN_FCFS_QUEUE',
      'ACCEPTED_FOR_LOTTERY',
      'REJECTED_FCFS_LIMIT',
      'REJECTED_TOO_EARLY',
      'REJECTED_ERROR',
      'SELECTED_WINNER',
      'NOT_SELECTED'
    )
  ),

  processed_at bigint,
  notified_at bigint
);
