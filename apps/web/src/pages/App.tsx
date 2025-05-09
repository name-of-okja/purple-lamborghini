import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, login, user } = useAuth();

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setEmail(user.email);
    }
  }, [user, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('이메일을 입력 해주세요.');
      return;
    }

    try {
      await login(email);
      navigate('/chat');
    } catch (err) {
      console.error(err);
      toast.error('로그인 실패');
    }
  };

  return (
    <div className='h-screen flex flex-col pb-6'>
      <div className='h-full flex flex-col justify-center'>
        <div className='-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white'>
            Welcome to Purple-Lamborghini
          </h1>
          <p className='mt-3 text-gray-600 dark:text-neutral-400'>
            K-Devcon Mentoring, Thanks to Jungwoo Kim Mentor
          </p>
        </div>

        <div className='mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <form className='relative' onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='p-3 sm:p-4 block w-full border-gray-200 rounded-full sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Input your Email...'
            />
            <div className='absolute top-1/2 end-2 -translate-y-1/2'>
              <button
                type='submit'
                className='size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:bg-neutral-800 dark:hover:text-white dark:focus:text-white'
              >
                <svg
                  className='shrink-0 size-6'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round' // React에서는 stroke-linejoin 대신 strokeLinejoin
                >
                  <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
                  <polyline points='10 17 15 12 10 7' />
                  <line x1='15' x2='3' y1='12' y2='12' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className='mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8'>
        <p className='text-xs text-gray-600 dark:text-neutral-500'>
          © 2025 Preline Labs.
        </p>
      </footer>
    </div>
  );
}

export default App;
