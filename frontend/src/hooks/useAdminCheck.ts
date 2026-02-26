import { useAdminSession } from './useAdminSession';

export function useAdminCheck() {
  const { isAdminAuthenticated } = useAdminSession();

  return {
    isAdmin: isAdminAuthenticated,
    isLoading: false,
    isAuthenticated: isAdminAuthenticated,
  };
}
