import { useState, useCallback, useEffect } from 'react';

const ADMIN_SESSION_KEY = 'droneX_admin_session';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'droneX2026';

let globalIsAdmin = !!sessionStorage.getItem(ADMIN_SESSION_KEY);
const adminListeners = new Set<() => void>();

function notifyAdminListeners() {
  adminListeners.forEach(fn => fn());
}

export function useAdminSession() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    adminListeners.add(listener);
    return () => { adminListeners.delete(listener); };
  }, []);

  const adminLogin = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
      globalIsAdmin = true;
      notifyAdminListeners();
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    globalIsAdmin = false;
    notifyAdminListeners();
  }, []);

  return {
    isAdminAuthenticated: globalIsAdmin,
    adminLogin,
    adminLogout,
  };
}
