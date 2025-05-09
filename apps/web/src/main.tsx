import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App';
import Chat from './pages/Chat';
import { AuthProvider } from './auth/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position='top-center' />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
