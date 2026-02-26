import { useIsCallerAdmin } from './useQueries';
import { useInternetIdentity } from './useInternetIdentity';

export function useAdminCheck() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  return {
    isAdmin: !!isAdmin,
    isLoading,
    isAuthenticated: !!identity,
  };
}
