import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAdminCheck } from '../hooks/useAdminCheck';
import { Shield, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { isAdmin, isLoading, isAuthenticated } = useAdminCheck();

  const isLoggingIn = loginStatus === 'logging-in';

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-accent-yellow" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Admin Access Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in with your Internet Identity to access the admin panel.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-semibold px-8"
          >
            {isLoggingIn ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...</>
            ) : (
              'Login with Internet Identity'
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-yellow" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have admin privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
