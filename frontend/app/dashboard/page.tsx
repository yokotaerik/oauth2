"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Calendar, ChevronRight, Clock, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUser, logout } from "@/util/apiUtil";
import { get } from "http";
import { redirect } from "next/navigation";

export default function Dashboard() {

  const [userName, setUserName] = useState(null);
  const [imgUser, setImgUser] = useState("/placeholder.svg?height=40&width=40");
  const [dots, setDots] = useState<{ width: string; height: string; top: string; left: string }[]>([]);

  const handleSair = () => {
    logout()
    redirect("/login")
  };

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        console.log("User data:", user);
        if (user) {
          setUserName(user.name);
          setImgUser(user.imageUrl);
        } else {
          console.log("User not found");
          redirect("/login")
        }
      })
      .catch((error) => {
        redirect("/login")
        console.error("Error fetching user data:", error);
      });



    const generatedDots = Array.from({ length: 50 }).map(() => ({
      width: Math.random() * 10 + 5 + "px",
      height: Math.random() * 10 + 5 + "px",
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
    }));
    setDots(generatedDots);
  }, []);

  return (
    <div className="min-h-screen bg-[#EBF3FF] relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-300/20"
            style={{
              width: dot.width,
              height: dot.height,
              top: dot.top,
              left: dot.left,
            }}
          />
        ))}
      </div>

      {/* Mobile header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4 md:hidden flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-medium">
                <User className="h-5 w-5" />
                Perfil
              </Link>
              <Link href="/dashboard/calendar" className="flex items-center gap-2 text-lg font-medium">
                <Calendar className="h-5 w-5" />
                Calendário
              </Link>
              <Link href="/dashboard/messages" className="flex items-center gap-2 text-lg font-medium">
                <MessageSquare className="h-5 w-5" />
                Mensagens
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-lg font-medium">
                <Settings className="h-5 w-5" />
                Configurações
              </Link>
              <CardFooter className="p-3">
                <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleSair}>
                  <LogOut className="h-5 w-5" />
                  Sair
                </Button>
              </CardFooter>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold text-center">Dashboard</h1>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notificações</span>
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:flex flex-col gap-6 w-64">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={imgUser} alt="Avatar" />
                {/* <AvatarImage src={user?.image} alt="Avatar" /> */}
                {/* <AvatarImage src={user?.image} alt="Avatar" /> */}
                <AvatarFallback>ED</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">Olá, {userName}</h2>
              <p className="text-muted-foreground">Bem-vindo de volta</p>
              <Button variant="outline" className="mt-4 w-full">
                Editar perfil
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 p-3 hover:bg-slate-50 border-l-2 border-purple-600"
                >
                  <User className="h-5 w-5" />
                  <span>Perfil</span>
                </Link>
                <Link href="/dashboard/calendar" className="flex items-center gap-2 p-3 hover:bg-slate-50">
                  <Calendar className="h-5 w-5" />
                  <span>Calendário</span>
                </Link>
                <Link href="/dashboard/messages" className="flex items-center gap-2 p-3 hover:bg-slate-50">
                  <MessageSquare className="h-5 w-5" />
                  <span>Mensagens</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2 p-3 hover:bg-slate-50">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Link>
              </nav>
            </CardContent>
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleSair}>
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </Card>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao seu Dashboard</CardTitle>
              <CardDescription>Veja suas atividades recentes e próximos eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Próximos eventos</h3>
                    <p className="text-sm text-muted-foreground">Você tem 3 eventos agendados hoje</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 text-white">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mensagens não lidas</h3>
                    <p className="text-sm text-muted-foreground">Você tem 5 mensagens não lidas</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eventos de hoje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="bg-slate-100 rounded p-2 text-slate-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Reunião com equipe</h4>
                    <p className="text-sm text-muted-foreground">10:00 - 11:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="bg-slate-100 rounded p-2 text-slate-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Almoço com cliente</h4>
                    <p className="text-sm text-muted-foreground">12:30 - 14:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="bg-slate-100 rounded p-2 text-slate-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Revisão de projeto</h4>
                    <p className="text-sm text-muted-foreground">15:00 - 16:30</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ver todos os eventos
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mensagens recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">João Silva</h4>
                    <p className="text-sm text-muted-foreground truncate">Olá, podemos conversar sobre o projeto?</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-auto">09:45</p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Maria Costa</h4>
                    <p className="text-sm text-muted-foreground truncate">Enviei os documentos que você pediu</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-auto">Ontem</p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Pedro Santos</h4>
                    <p className="text-sm text-muted-foreground truncate">Precisamos agendar uma reunião</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-auto">Ontem</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ver todas as mensagens
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}   