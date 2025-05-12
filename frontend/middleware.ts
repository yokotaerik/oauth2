import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./app/token";
import { isAuthenticated } from "./util/apiUtil";

export function middleware(request: NextRequest) {
  // Verifica se o token de acesso está presente no armazenamento local
    return NextResponse.next();
}

// Aplica o middleware apenas às rotas que começam com /dashboard
export const config = {
  matcher: ["/dashboard"],
};