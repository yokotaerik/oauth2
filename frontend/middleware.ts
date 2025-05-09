import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization"); // Obtém o cabeçalho Authorization

  // Verifica se o cabeçalho Authorization está presente e contém um token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Redireciona para a página de login se o token não estiver presente ou for inválido
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = authHeader.split(" ")[1]; // Extrai o token do formato "Bearer <token>"

  // Aqui você pode adicionar lógica adicional para validar o token, se necessário

  // Permite o acesso à rota
  return NextResponse.next();
}

// Aplica o middleware apenas às rotas que começam com /dashboard
export const config = {
  matcher: ["/dashboard"],
};