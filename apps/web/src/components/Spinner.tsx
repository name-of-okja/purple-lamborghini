export function Spinner() {
  return (
    <div
      className='animate-spin inline-block size-8 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-white'
      role='status'
      aria-label='loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
