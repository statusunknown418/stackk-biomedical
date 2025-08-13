"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Heart,
  Menu,
  Play,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { AnimateOnScroll } from "@stackk/ui/animate-on-scroll";
import { AnimatedBadge } from "@stackk/ui/animated-badge";
import { AnimatedCard } from "@stackk/ui/animated-card";
import { AnimatedIcon } from "@stackk/ui/animated-icon";
import { Badge } from "@stackk/ui/badge";
import { Button } from "@stackk/ui/button";
import { Card, CardContent } from "@stackk/ui/card";
import { CounterAnimation } from "@stackk/ui/counter-animation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@stackk/ui/dropdown-menu";
import { Input } from "@stackk/ui/input";
import { ScrollReveal } from "@stackk/ui/scroll-reveal";
import { StaggeredAnimation } from "@stackk/ui/staggered-animation";

export const MedStackLanding = () => {
  return (
    <div className="relative min-h-svh">
      {/* Header */}

      <header className="border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6 md:px-8">
          <AnimateOnScroll animation="slideRight" delay={100}>
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-foreground text-xl font-medium tracking-tight">
                StackMed
              </span>
            </Link>
          </AnimateOnScroll>

          {/* Desktop Navigation */}
          <AnimateOnScroll animation="slideDown" delay={200}>
            <nav className="hidden items-center space-x-8 text-sm font-normal md:flex">
              <Link
                href="#features"
                className="text-muted-foreground relative transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all after:duration-200 hover:scale-105 hover:text-indigo-500 hover:after:w-full"
              >
                Funcionalidades
              </Link>
              <Link
                href="#benefits"
                className="text-muted-foreground relative transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all after:duration-200 hover:scale-105 hover:text-indigo-500 hover:after:w-full"
              >
                Beneficios
              </Link>
              <Link
                href="#integration"
                className="text-muted-foreground relative transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all after:duration-200 hover:scale-105 hover:text-indigo-500 hover:after:w-full"
              >
                Integración
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground relative transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-500 after:transition-all after:duration-200 hover:scale-105 hover:text-indigo-500 hover:after:w-full"
              >
                Contacto
              </Link>
            </nav>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideLeft" delay={300}>
            <div className="hidden items-center space-x-4 md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>

              <Button
                size="sm"
                className="bg-indigo-500 font-normal text-white shadow-sm hover:bg-indigo-600"
                asChild
              >
                <Link href="/login">
                  Empieza ahora <ArrowRight />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 md:hidden">
                  <Menu className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/#features">Funcionalidades</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/#benefits">Beneficios</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/#integration">Integración</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/#contact">Contacto</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex w-full justify-center overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-900/30 dark:via-transparent dark:to-purple-800/30" />
        <div className="relative container flex items-center justify-center px-6 md:px-8">
          <div className="w-full max-w-7xl text-center lg:flex lg:items-center lg:justify-between lg:text-left">
            <div className="space-y-8">
              <AnimateOnScroll animation="slideUp" delay={200}>
                <AnimatedBadge
                  className="w-fit border-indigo-200 bg-indigo-50 font-normal text-indigo-600 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-400"
                  icon={<Sparkles className="h-3 w-3" />}
                >
                  Innovación en salud
                </AnimatedBadge>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slideUp" delay={400}>
                <h1 className="text-foreground text-4xl leading-tight font-light tracking-tight sm:text-5xl xl:text-6xl/tight">
                  Revoluciona la Gestión de
                  <span className="font-normal text-indigo-400"> Equipos Biomédicos</span>
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slideUp" delay={600}>
                <p className="text-muted-foreground max-w-[600px] text-lg leading-relaxed font-light">
                  Transforma tu centro de salud con nuestra plataforma integral para el{" "}
                  <span className="text-indigo-400">seguimiento de inventario</span>, la{" "}
                  <span className="text-indigo-400">programación de mantenimientos</span>{" "}
                  y el <span className="text-indigo-400">cumplimiento normativo</span>.
                  Reduce tiempos de inactividad, mejora la eficiencia operativa y
                  garantiza una atención médica de calidad superior.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slideUp" delay={800}>
                <div className="flex flex-col justify-start gap-4 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="group bg-indigo-500 text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:shadow-lg"
                  >
                    <Calendar className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                    Agenda una demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border hover:bg-muted/50 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <Play className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                    Ver soluciones
                  </Button>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fadeIn" delay={1000}>
                <div className="text-muted-foreground flex items-center justify-start space-x-8 text-sm font-light">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    FDA Validated
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    24/7 Support
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll animation="scaleIn" delay={600}>
              <div className="mt-8 flex items-center justify-center lg:mt-0 lg:ml-12">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/20 to-purple-500/20 blur-3xl"></div>
                  <Image
                    src={"/landing/hero.png"}
                    width="600"
                    height="500"
                    alt="StackMed Dashboard"
                    className="border-border/50 relative mx-auto rounded-2xl border shadow-2xl"
                  />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="flex w-full justify-center border-y py-16 md:py-24 lg:py-32">
        <div className="container px-6 md:px-8">
          <ScrollReveal direction="up" delay={200}>
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-foreground text-3xl font-light tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Desafíos Críticos en la Gestión de Equipos Biomédicos
                </h2>
                <p className="text-muted-foreground max-w-[800px] text-lg leading-relaxed font-light text-balance">
                  Los centros de salud enfrentan una presión creciente por mantener la
                  eficiencia de sus equipos sin comprometer la seguridad del paciente ni
                  el cumplimiento normativo. Los métodos tradicionales ya no son
                  suficientes para las demandas del entorno actual.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggeredAnimation
            animation="slideUp"
            staggerDelay={200}
            className="mx-auto grid max-w-6xl items-stretch gap-8 py-16 lg:grid-cols-3"
          >
            <AnimatedCard
              hoverColor="red"
              className="border-red-200/60 bg-red-50/30 hover:bg-red-50/50 dark:border-red-800/30 dark:bg-red-900/10 dark:hover:bg-red-950/30"
            >
              <CardContent className="flex h-full flex-col items-center space-y-6 p-8 text-center">
                <AnimatedIcon
                  bgColor="bg-red-100/80 dark:bg-red-900/30"
                  borderColor="border-red-200/60 dark:border-red-800/30"
                  hoverAnimation="rotate"
                >
                  <Database className="h-7 w-7 text-red-500 dark:text-red-500" />
                </AnimatedIcon>
                <div className="space-y-3">
                  <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                    Caos en el inventario
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    El seguimiento manual provoca pérdidas de equipos, sobrestock
                    innecesario y escasez crítica en momentos de emergencia.
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard
              hoverColor="orange"
              className="border-orange-200/60 bg-orange-50/30 hover:bg-orange-50/50 dark:border-orange-800/30 dark:bg-orange-900/10 dark:hover:bg-orange-950/30"
            >
              <CardContent className="flex h-full flex-col items-center space-y-6 p-8 text-center">
                <AnimatedIcon
                  bgColor="bg-orange-100/80 dark:bg-orange-900/30"
                  borderColor="border-orange-200/60 dark:border-orange-800/30"
                  hoverAnimation="rotate"
                >
                  <Wrench className="h-7 w-7 text-orange-500 dark:text-orange-400" />
                </AnimatedIcon>
                <div className="space-y-3">
                  <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    Retrasos en el Mantenimiento
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    Intervenciones tardías aumentan los tiempos de inactividad y reducen
                    la eficiencia operativa del centro médico
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard
              hoverColor="yellow"
              className="border-yellow-200/60 bg-yellow-50/30 hover:bg-yellow-50/50 dark:border-yellow-800/30 dark:bg-yellow-900/10 dark:hover:bg-yellow-950/30"
            >
              <CardContent className="flex h-full flex-col items-center space-y-6 p-8 text-center">
                <AnimatedIcon
                  bgColor="bg-yellow-100/80 dark:bg-yellow-900/30"
                  borderColor="border-yellow-200/60 dark:border-yellow-800/30"
                  hoverAnimation="rotate"
                >
                  <Shield className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </AnimatedIcon>
                <div className="space-y-3">
                  <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                    Riesgos Normativos
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    La falta de integración entre sistemas dificulta cumplir con las
                    normativas sanitarias y mantener trazabilidad para auditorías.
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-muted/20 flex w-full justify-center py-16 md:py-24 lg:py-32"
      >
        <div className="container px-6 md:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <Badge className="border-indigo-200 bg-indigo-50 font-normal text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-400">
                  Solución comprensiva
                </Badge>

                <h2 className="text-foreground text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
                  Tecnología que Transforma la{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-indigo-400 bg-clip-text text-transparent">
                    Gestión Biomédica
                  </span>
                </h2>

                <p className="text-muted-foreground max-w-[800px] self-center justify-self-center text-center text-lg font-light">
                  Nuestra plataforma cubre todos los aspectos de la gestión de equipos
                  médicos, combinando tecnología avanzada con flujos de trabajo diseñados
                  para el sector salud
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-6xl items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center space-y-10">
              <StaggeredAnimation
                animation="slideRight"
                staggerDelay={200}
                className="grid gap-10"
              >
                <div className="group flex items-start space-x-6">
                  <AnimatedIcon
                    bgColor="bg-indigo-100/80 dark:bg-indigo-900/30"
                    borderColor="border-indigo-200/60 dark:border-indigo-800/30"
                  >
                    <Database className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                  </AnimatedIcon>
                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium">
                      Gestión del inventario robusto
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Deja atrás las hojas de cálculo. Nuestra plataforma te permite
                      buscar equipos y accesorios de forma rápida y organizada gracias a
                      filtros inteligentes y una interfaz clara y moderna.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6">
                  <AnimatedIcon
                    bgColor="bg-emerald-100/80 dark:bg-emerald-900/30"
                    borderColor="border-emerald-200/60 dark:border-emerald-800/30"
                  >
                    <Bell className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                  </AnimatedIcon>
                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium">
                      Alertas Inteligentes en Tiempo Real
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Recibe notificaciones cuando un equipo necesita atención. Anticípate
                      al mantenimiento y mantén el control con alertas personalizadas que
                      llegan justo a tiempo.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6">
                  <AnimatedIcon
                    bgColor="bg-purple-100/80 dark:bg-purple-900/30"
                    borderColor="border-purple-200/60 dark:border-purple-800/30"
                  >
                    <Clock className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                  </AnimatedIcon>
                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium">
                      Programación Inteligente de Mantenimientos
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Olvídate de agendar manualmente. Programa mantenimientos preventivos
                      y correctivos de forma automática, recibe alertas y mantén un
                      historial completo, todo desde un solo lugar.
                    </p>
                  </div>
                </div>
              </StaggeredAnimation>
            </div>

            <ScrollReveal direction="left" delay={400}>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/15 to-purple-500/15 blur-2xl"></div>
                  <Image
                    src={"/landing/equipments.png"}
                    width="600"
                    height="500"
                    alt="Equipment Management Dashboard"
                    className="border-border/50 relative mx-auto rounded-2xl border shadow-xl"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section
        id="integration"
        className="flex w-full justify-center py-16 md:py-24 lg:py-32"
      >
        <div className="container px-6 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[500px_1fr] lg:gap-20 xl:grid-cols-[600px_1fr]">
            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/15 to-blue-500/15 blur-2xl"></div>
                <Image
                  src={"/landing/hl7.webp"}
                  width="600"
                  height="500"
                  alt="FHIR HL7 Integration"
                  className="border-border/50 relative mx-auto rounded-2xl border shadow-xl"
                />
              </div>
            </ScrollReveal>

            <div className="flex flex-col justify-center space-y-8">
              <AnimateOnScroll animation="slideLeft" delay={300}>
                <div className="space-y-4">
                  <Badge className="w-fit border-emerald-200 bg-emerald-50 font-normal text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                    Integración rápida y sin complicaciones
                  </Badge>
                  <h2 className="text-foreground text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
                    Conéctate con Historias Clínicas y Sistemas de Salud Sin
                    Complicaciones
                  </h2>
                  <p className="text-muted-foreground max-w-[600px] text-lg leading-relaxed font-light">
                    Integra tu plataforma con hospitales y clínicas sin necesidad de
                    desarrollos complejos. Cumplimos con los estándares FHIR y HL7 para
                    asegurar compatibilidad total con EMR, historiales médicos y flujos
                    clínicos digitales.
                  </p>
                </div>
              </AnimateOnScroll>

              <StaggeredAnimation animation="slideLeft" staggerDelay={100}>
                <ul className="grid gap-4 py-4">
                  <li className="flex space-x-3">
                    <CheckCircle className="size-6 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground font-light">
                      Evita riesgos gracias a una integración confiable con los estándares
                      más usados del sector.
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckCircle className="size-6 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground font-light">
                      Funciona con los sistemas que ya usas (EMR, HIS, etc.) sin necesidad
                      de adaptaciones complejas.
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckCircle className="size-6 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground font-light">
                      Los datos se actualizan al instante para que siempre tengas la
                      información correcta.
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <CheckCircle className="size-6 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground font-light">
                      Nos adaptamos a tus flujos clínicos, no al revés.
                    </span>
                  </li>
                </ul>
              </StaggeredAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="flex w-full justify-center bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 py-16 md:py-24 lg:py-32 dark:from-indigo-950/10 dark:via-transparent dark:to-purple-950/5"
      >
        <div className="container px-6 md:px-8">
          <ScrollReveal direction="up" delay={100}>
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <Badge className="border-indigo-200 bg-indigo-50 font-normal text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-400">
                  Alto impacto
                </Badge>
                <h2 className="text-foreground text-3xl font-light tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Transforma tu Centro de Salud desde el Primer Día
                </h2>
                <p className="text-muted-foreground max-w-[800px] justify-self-center text-center text-lg leading-relaxed font-light">
                  Experience significant improvements in efficiency, compliance, and
                  patient outcomes with our comprehensive equipment management solution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggeredAnimation
            animation="slideLeft"
            staggerDelay={150}
            className="mx-auto grid max-w-6xl items-stretch gap-8 py-16 lg:grid-cols-2"
          >
            <div className="grid gap-8">
              <Card className="bg-card/50 border-border/40 group cursor-pointer shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-md">
                <CardContent className="flex items-start space-x-6 p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-200/60 bg-indigo-100/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 dark:border-indigo-800/30 dark:bg-indigo-900/30">
                    <TrendingUp className="h-6 w-6 text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      Improved Operational Efficiency
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Reduce equipment search time by 75% and increase staff productivity
                      through automated workflows and real-time visibility across your
                      facility.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40 group cursor-pointer shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-md">
                <CardContent className="flex items-start space-x-6 p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-200/60 bg-emerald-100/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 dark:border-emerald-800/30 dark:bg-emerald-900/30">
                    <Zap className="h-6 w-6 text-emerald-500 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-400" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      Reduced Equipment Downtime
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Minimize unexpected failures by 60% through predictive maintenance
                      and proactive equipment monitoring with AI-powered insights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8">
              <Card className="bg-card/50 border-border/40 group cursor-pointer shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-md">
                <CardContent className="flex items-start space-x-6 p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-200/60 bg-purple-100/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 dark:border-purple-800/30 dark:bg-purple-900/30">
                    <Shield className="h-6 w-6 text-purple-500 transition-transform duration-300 group-hover:scale-110 dark:text-purple-400" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Enhanced Regulatory Compliance
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Maintain 100% audit readiness with automated documentation and
                      comprehensive compliance tracking across all regulatory
                      requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/40 group cursor-pointer shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-md">
                <CardContent className="flex items-start space-x-6 p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rose-200/60 bg-rose-100/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 dark:border-rose-800/30 dark:bg-rose-900/30">
                    <Heart className="h-6 w-6 text-rose-500 transition-transform duration-300 group-hover:scale-110 dark:text-rose-400" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-foreground text-xl font-medium transition-colors duration-300 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                      Better Patient Care
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      Ensure critical equipment availability when needed most, directly
                      improving patient outcomes and satisfaction scores across your
                      facility.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-border/50 flex w-full justify-center border-t py-16 md:py-24 lg:py-32">
        <div className="container px-6 md:px-8">
          <StaggeredAnimation
            animation="slideUp"
            staggerDelay={200}
            className="grid gap-12 lg:grid-cols-4"
          >
            <div className="group flex cursor-pointer flex-col items-center space-y-4 text-center transition-all duration-300 hover:scale-110">
              <div className="text-4xl font-light text-indigo-500 transition-all duration-300 group-hover:scale-125 group-hover:text-indigo-600">
                <CounterAnimation end={500} suffix="+" />
              </div>
              <div className="text-muted-foreground group-hover:text-foreground text-sm font-light transition-colors duration-300">
                Healthcare Facilities
              </div>
            </div>

            <div className="group flex cursor-pointer flex-col items-center space-y-4 text-center transition-all duration-300 hover:scale-110">
              <div className="text-4xl font-light text-emerald-500 transition-all duration-300 group-hover:scale-125 group-hover:text-emerald-600">
                <CounterAnimation end={75} suffix="%" />
              </div>
              <div className="text-muted-foreground group-hover:text-foreground text-sm font-light transition-colors duration-300">
                Reduction in Search Time
              </div>
            </div>

            <div className="group flex cursor-pointer flex-col items-center space-y-4 text-center transition-all duration-300 hover:scale-110">
              <div className="text-4xl font-light text-purple-500 transition-all duration-300 group-hover:scale-125 group-hover:text-purple-600">
                <CounterAnimation end={99.9} suffix="%" />
              </div>
              <div className="text-muted-foreground group-hover:text-foreground text-sm font-light transition-colors duration-300">
                System Uptime
              </div>
            </div>

            <div className="group flex cursor-pointer flex-col items-center space-y-4 text-center transition-all duration-300 hover:scale-110">
              <div className="text-4xl font-light text-orange-500 transition-all duration-300 group-hover:scale-125 group-hover:text-orange-600">
                24/7
              </div>
              <div className="text-muted-foreground group-hover:text-foreground text-sm font-light transition-colors duration-300">
                Expert Support
              </div>
            </div>
          </StaggeredAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="relative flex w-full justify-center overflow-hidden bg-gradient-to-r from-indigo-500/65 via-indigo-600/65 to-purple-600/65 py-16 md:py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative container px-6 md:px-8">
          <AnimateOnScroll animation="slideUp" delay={200}>
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Transform Your Equipment Management?
                </h2>
                <p className="mx-auto max-w-[600px] text-lg leading-relaxed font-light text-indigo-100">
                  Join hundreds of healthcare facilities already benefiting from our
                  comprehensive medical equipment management platform.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <form className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    className="flex-1 border-white/20 bg-white/10 font-light text-white backdrop-blur-sm placeholder:text-indigo-200 focus:bg-white/20"
                  />
                  <Button
                    type="submit"
                    className="bg-white font-normal text-indigo-600 shadow-sm hover:bg-indigo-50"
                  >
                    Get Demo
                  </Button>
                </form>
                <p className="text-xs font-light text-indigo-200">
                  Schedule a personalized demo today. No commitment required.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/20 bg-transparent font-normal text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:shadow-lg"
                >
                  <Users className="mr-2 h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
                  Talk to Sales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/20 bg-transparent font-normal text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:shadow-lg"
                >
                  <BarChart3 className="mr-2 h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
                  View Case Studies
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/40 bg-muted/20 flex w-full shrink-0 flex-col items-center gap-2 border-t px-6 py-8 sm:flex-row md:px-8">
        <p className="text-muted-foreground text-xs font-light">
          © 2024 StackMed. All rights reserved. HIPAA compliant healthcare technology.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-all duration-200 hover:scale-105 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-all duration-200 hover:scale-105 hover:underline"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-all duration-200 hover:scale-105 hover:underline"
          >
            HIPAA Compliance
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-all duration-200 hover:scale-105 hover:underline"
          >
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
};
