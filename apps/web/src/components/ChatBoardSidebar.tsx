import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { EventItemList } from '../components/EventItemList';
export function ChatBoardSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div
      id='hs-application-sidebar'
      className='hs-overlay [--auto-close:lg]
      hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform
      hidden
      fixed top-0 start-0 bottom-0 z-60
      w-64 h-full
      bg-white border-e border-gray-200
      lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
      dark:bg-neutral-900 dark:border-neutral-700'
      role='dialog'
      aria-label='Sidebar'
    >
      <nav className='size-full flex flex-col'>
        <div className='flex flex-col bg-white shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70'>
          <div className='p-4 md:p-5'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              Purple Lamborghini
            </h3>
            <p className='mt-1 text-gray-500 dark:text-neutral-400'>
              Hello World
            </p>
          </div>
        </div>

        <hr className='border-gray-500 dark:border-neutral-500'></hr>

        <EventItemList />

        <div className='mt-auto'>
          <div className='p-4 border-t border-gray-200 dark:border-neutral-700'>
            <a
              onClick={handleLogout}
              className='flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300'
              href='#'
            >
              Log out
              <svg
                className='shrink-0 size-4'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
                <polyline points='10 17 15 12 10 7' />
                <line x1='15' x2='3' y1='12' y2='12' />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
