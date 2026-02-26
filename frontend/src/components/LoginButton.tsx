import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      size="sm"
      className={
        isAuthenticated
          ? 'border-border text-muted-foreground hover:text-foreground'
          : 'bg-accent-yellow text-navy-dark hover:bg-accent-yellow/90 font-semibold'
      }
    >
      {isLoggingIn ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4 mr-1.5" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 mr-1.5" />
          Login
        </>
      )}
    </Button>
  );
}
