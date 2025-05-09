export type EventSummary = {
  event_id: string;
  name: string;
  status: EventStatus;
};

export type EventStatus =
  | 'OPEN'
  | 'UPCOMING'
  | 'FCFS_CLOSED'
  | 'LOTTERY_DRAWN'
  | 'COMPLETED';
