'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ACCESS_TOKEN } from '@/app/token';
import { getCurrentUser } from '@/util/apiUtil';

const OAuth2RedirectHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);

      getCurrentUser()
        .then((user) => {
          console.log("Usuário autenticado:", user);
          router.replace('/dashboard');
        })
        .catch((err) => {
          console.error("Erro ao buscar usuário:", err);
          router.replace('/login?from=oauth&error=Falha ao autenticar o usuário');
        });
    } else {
      const errorMsg = error ?? 'OAuth failed';
      router.replace(`/login?from=oauth&error=${encodeURIComponent(errorMsg)}`);
    }
  }, [token, error, router]);

  return <p>Redirecionando...</p>;
};

export default OAuth2RedirectHandler;
