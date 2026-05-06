import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Home } from '../../pages/Home';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Login } from '../../pages/Login';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* redireciona a raiz para login */}
        <Route path='/' element={<Navigate to="/login" />} />

        {/* login */}
        <Route path='/login' element={<Login />} />

        {/* resto do app */}
        <Route path='/home' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/about-pomodoro' element={<AboutPomodoro />} />

        {/* fallback */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}