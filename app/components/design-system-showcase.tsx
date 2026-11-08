"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Copy,
  Database,
  Ellipsis,
  ExternalLink,
  FlaskConical,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClusterSelect } from "./cluster-select";
import { ThemeToggle } from "./theme-toggle";
import { WalletButton } from "./wallet-button";

const palette = [
  ["Primary", "#8B5CF6", "primary"],
  ["Primary hover", "#7C3AED", "primary-hover"],
  ["Primary deep", "#6D28D9", "primary-deep"],
  ["Background", "#0B0B0F", "background"],
  ["Surface", "#111116", "surface"],
  ["Surface alt", "#18181F", "surface-alt"],
  ["Border", "#27272F", "border"],
  ["Muted", "#A1A1AA", "muted-foreground"],
  ["Text", "#F5F5F7", "foreground"],
  ["Success", "#22C55E", "success"],
  ["Warning", "#F59E0B", "warning"],
  ["Danger", "#EF4444", "destructive"],
  ["Info", "#60A5FA", "info"],
];

const projects = [
  {
    name: "Dexterous grasping",
    type: "Manipulation",
    submissions: 28,
    gain: "+12.8%",
    status: "Evaluating",
    icon: Bot,
  },
  {
    name: "Warehouse navigation",
    type: "Navigation",
    submissions: 19,
    gain: "+8.4%",
    status: "Open",
    icon: Layers3,
  },
  {
    name: "Reflective object detection",
    type: "Perception",
    submissions: 34,
    gain: "+6.2%",
    status: "Open",
    icon: Sparkles,
  },
];

const chartValues = [72, 58, 64, 49, 56, 38, 44, 30, 36, 24, 32, 18];

export function DesignSystemShowcase() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("7 days");
  const [page, setPage] = useState(1);
  const [compact, setCompact] = useState(true);
  const [copied, setCopied] = useState(false);
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-[360px] bg-[radial-gradient(ellipse_at_top,rgba(109,40,217,0.25),transparent_68%)]" />
      <header className="relative z-10 border-b border-border/80 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1580px] items-center justify-between gap-5 px-5 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#a779ff] to-primary-deep text-white shadow-[0_8px_28px_-12px_rgba(139,92,246,0.9)]">
              <Bot className="size-5" />
            </div>
            <div className="flex items-center gap-5">
              <span className="text-lg font-semibold tracking-tight">
                Kynetic
              </span>
              <span className="hidden rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
                Component library
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs font-medium text-muted-foreground md:inline">
              Design system
            </span>
            <span className="hidden size-1 rounded-full bg-muted-foreground/60 md:inline-block" />
            <span className="hidden text-xs text-muted-foreground md:inline">
              Dark
            </span>
            <ThemeToggle />
            <div className="hidden sm:block">
              <ClusterSelect />
            </div>
            <WalletButton />
            <Button variant="outline" size="icon" aria-label="More options">
              <Ellipsis />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-[1580px] grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 lg:py-7">
        <aside className="flex flex-col gap-4">
          <Card className="p-0">
            <CardHeader className="pb-2">
              <CardTitle>Color palette</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-3 gap-y-3 pb-5 sm:grid-cols-3 lg:grid-cols-1">
              {palette.map(([label, hex, token]) => (
                <div className="flex min-w-0 items-center gap-2.5" key={token}>
                  <span
                    className="size-8 shrink-0 rounded-xl border border-white/10 shadow-inner"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium">
                    {label}
                  </span>
                  <span className="hidden font-mono text-body text-muted-foreground xl:inline">
                    {hex}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardHeader className="pb-1">
              <CardTitle>Gradients</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              <div className="flex items-center gap-3">
                <span className="h-12 flex-1 rounded-xl bg-[linear-gradient(135deg,#301056_0%,#6d28d9_58%,#8b5cf6_100%)]" />
                <div className="min-w-0 text-xs">
                  <p className="font-medium">Hero glow</p>
                  <p className="mt-1 text-muted-foreground">violet · 180deg</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-12 flex-1 rounded-xl bg-[linear-gradient(135deg,#6d28d9_0%,#8b5cf6_55%,#c4a6ff_100%)]" />
                <div className="min-w-0 text-xs">
                  <p className="font-medium">Action gradient</p>
                  <p className="mt-1 text-muted-foreground">deep → bright</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hidden p-4 lg:block">
            <div className="flex items-center gap-2 text-xs font-medium">
              <ShieldCheck className="size-4 text-primary" />
              Design principles
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Measured outcomes. Transparent rewards. Calm, precise interface
              language.
            </p>
          </Card>
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(290px,0.9fr)]">
            <Card className="p-0">
              <CardHeader className="border-b border-border/80 pb-4">
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 py-5 md:grid-cols-[1fr_1.2fr]">
                <div className="flex items-center gap-4 border-b border-border/70 pb-5 md:border-r md:border-b-0 md:pb-0">
                  <span className="text-6xl font-medium leading-none tracking-[-0.06em]">
                    Aa
                  </span>
                  <div>
                    <p className="text-lg font-semibold">Inter</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Clear, modern, versatile
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <p className="text-2xl font-bold">
                    H1{" "}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      40 / Semibold
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Body{" "}
                    <span className="ml-2 text-xs text-foreground">
                      14 / Regular
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    H2{" "}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      20 / Semibold
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Muted <span className="ml-2 text-xs">14 / Regular</span>
                  </p>
                  <p className="text-base font-semibold">
                    H3{" "}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      20 / Semibold
                    </span>
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Caption{" "}
                    <span className="ml-2 text-foreground">14 / Medium</span>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="border-b border-border/80 pb-4">
                <CardTitle>Logo / brand</CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-[122px] items-center justify-center gap-3 py-6">
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#a779ff] to-primary-deep text-white">
                  <Bot className="size-6" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">
                  Kynetic
                </span>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            <Card className="p-0">
              <CardHeader className="pb-3">
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2.5 pb-5">
                <Button className="rounded-full bg-gradient-to-r from-primary-deep to-primary px-5 hover:from-primary-hover hover:to-primary">
                  Primary
                </Button>
                <Button variant="outline" className="rounded-full px-5">
                  Secondary
                </Button>
                <Button variant="ghost" className="rounded-full px-5">
                  Ghost
                </Button>
                <Button variant="link" className="px-2">
                  Link
                </Button>
                <span className="hidden h-7 w-px bg-border sm:block" />
                <Button size="icon" className="rounded-full bg-primary">
                  <Search />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowDownLeft />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Ellipsis />
                </Button>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="pb-3">
                <CardTitle>Badges / status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2 pb-5">
                <Badge
                  variant="secondary"
                  className="rounded-full border border-border bg-secondary px-3 py-1"
                >
                  Default
                </Badge>
                <Badge className="rounded-full border border-success/25 bg-success/10 px-3 py-1 text-success hover:bg-success/10">
                  Success
                </Badge>
                <Badge className="rounded-full border border-warning/25 bg-warning/10 px-3 py-1 text-warning hover:bg-warning/10">
                  Warning
                </Badge>
                <Badge
                  variant="destructive"
                  className="rounded-full border border-destructive/25 px-3 py-1"
                >
                  Danger
                </Badge>
                <Badge className="rounded-full border border-info/25 bg-info/10 px-3 py-1 text-info hover:bg-info/10">
                  Info
                </Badge>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr_0.65fr_1fr]">
            <Card className="p-0">
              <CardHeader className="pb-2">
                <CardTitle>Search input</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search challenges..."
                    className="h-10 rounded-full border-border bg-surface-alt pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="pb-2">
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <Select
                  value={period}
                  onValueChange={(value) => setPeriod(value ?? "7 days")}
                >
                  <SelectTrigger className="h-10 w-full rounded-full border-border bg-surface-alt">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24 hours">Last 24 hours</SelectItem>
                    <SelectItem value="7 days">Last 7 days</SelectItem>
                    <SelectItem value="30 days">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="pb-2">
                <CardTitle>Toggle</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between pb-5 pt-1">
                <Switch
                  checked={compact}
                  onCheckedChange={setCompact}
                  aria-label="Compact view"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Enable notifications"
                >
                  <Check className="text-primary" />
                </Button>
                <button
                  className="size-7 rounded-md border border-border bg-surface-alt"
                  aria-label="Unchecked checkbox"
                />
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="pb-2">
                <CardTitle>Pagination</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between pb-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-lg"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft />
                </Button>
                {[1, 2, 3].map((number) => (
                  <Button
                    key={number}
                    variant={number === page ? "default" : "ghost"}
                    size="icon"
                    className="size-8 rounded-lg"
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </Button>
                ))}
                <span className="text-muted-foreground">···</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg"
                  onClick={() => setPage(10)}
                >
                  10
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-lg"
                  onClick={() => setPage(Math.min(10, page + 1))}
                  aria-label="Next page"
                >
                  <ChevronRight />
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <Metric
              icon={ArrowRight}
              label="Total submissions"
              value="12,846"
              delta="+1,204 this week"
            />
            <Metric icon={Database} label="Datasets evaluated" value="3,291" />
            <Metric
              icon={Zap}
              label="Avg. model lift"
              value="+8.42%"
              delta="+1.16%"
            />
            <Metric
              icon={Wallet}
              label="Rewards paid"
              value="2,480 SOL"
              delta="Across 46 challenges"
            />
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <Card className="p-0">
              <CardHeader className="flex-row items-center justify-between border-b border-border/80 pb-4">
                <CardTitle>Model improvement</CardTitle>
                <Select
                  value={period}
                  onValueChange={(value) => setPeriod(value ?? "7 days")}
                >
                  <SelectTrigger className="h-8 w-[130px] rounded-full border-border bg-surface-alt text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24 hours">24 hours</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pb-5 pt-4">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">
                      +8.42%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Average benchmark lift
                    </p>
                  </div>
                  <Badge className="rounded-full border border-success/25 bg-success/10 text-success hover:bg-success/10">
                    <ArrowUpRight /> 12.6%
                  </Badge>
                </div>
                <div className="relative flex h-32 items-end gap-2 border-b border-border bg-[linear-gradient(to_bottom,transparent_32%,var(--border)_33%,transparent_34%,transparent_65%,var(--border)_66%,transparent_67%)] px-1">
                  {chartValues.map((height, index) => (
                    <div
                      key={index}
                      className="group relative flex-1 rounded-t-sm bg-gradient-to-t from-primary/20 to-primary/80 transition hover:to-[#c4a6ff]"
                      style={{ height: `${height}%` }}
                      title={`${height}% benchmark score`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-body text-muted-foreground">
                  <span>Oct 28</span>
                  <span>Oct 30</span>
                  <span>Nov 01</span>
                  <span>Nov 03</span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="flex-row items-center justify-between border-b border-border/80 pb-4">
                <CardTitle>Active challenges</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all <ArrowRight />
                </Button>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-body uppercase tracking-wide text-muted-foreground">
                        <th className="py-3 font-medium">Challenge</th>
                        <th className="py-3 font-medium">Entries</th>
                        <th className="py-3 font-medium">Model lift</th>
                        <th className="py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => {
                        const Icon = project.icon;
                        return (
                          <tr
                            key={project.name}
                            className="border-b border-border/70 last:border-0"
                          >
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                                  <Icon className="size-4" />
                                </span>
                                <span>
                                  <span className="block font-medium">
                                    {project.name}
                                  </span>
                                  <span className="mt-0.5 block text-body text-muted-foreground">
                                    {project.type}
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td className="py-3 tabular-nums">
                              {project.submissions}
                            </td>
                            <td className="py-3 font-medium text-success">
                              {project.gain}
                            </td>
                            <td className="py-3">
                              <Badge
                                variant="secondary"
                                className="rounded-full px-2.5"
                              >
                                {project.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filteredProjects.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No challenges match “{search}”.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr_1fr]">
            <Card className="p-0">
              <CardHeader className="border-b border-border/80 pb-3">
                <CardTitle>Latest settlements</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-surface-alt">
                    <Layers3 className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      Shiny object perception
                    </p>
                    <p className="mt-1 text-body text-muted-foreground">
                      Completed 12 min ago · 8 contributors
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-success">
                    +18.4%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-surface-alt">
                    <FlaskConical className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      Precision pick and place
                    </p>
                    <p className="mt-1 text-body text-muted-foreground">
                      Completed 1 hr ago · 5 contributors
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-success">
                    +9.7%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="border-b border-border/80 pb-3">
                <CardTitle>Reward hover card</CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-[118px] items-center justify-center py-5">
                <HoverCard>
                  <HoverCardTrigger
                    render={
                      <Button variant="outline" className="rounded-full" />
                    }
                  >
                    <CircleHelp /> How rewards work
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="top"
                    className="w-80 rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold tracking-tight">
                          Rewards follow results
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Every payout is based on verified benchmark
                          improvement.
                        </p>
                      </div>
                      <Badge className="shrink-0 rounded-full border border-success/25 bg-success/10 text-success hover:bg-success/10">
                        Escrowed
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                      <span className="text-muted-foreground">
                        Contributor share
                      </span>
                      <span className="font-medium">
                        Proportional to model lift
                      </span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardHeader className="border-b border-border/80 pb-3">
                <CardTitle>Navigation tabs</CardTitle>
              </CardHeader>
              <CardContent className="py-5">
                <Tabs defaultValue="overview">
                  <TabsList className="h-auto w-full justify-between rounded-full border border-border bg-surface-alt p-1">
                    <TabsTrigger
                      value="overview"
                      className="rounded-full data-active:bg-primary data-active:text-primary-foreground"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="rounded-full">
                      Challenges
                    </TabsTrigger>
                    <TabsTrigger value="datasets" className="rounded-full">
                      Datasets
                    </TabsTrigger>
                    <TabsTrigger value="rewards" className="rounded-full">
                      Rewards
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border/80 py-5 text-xs text-muted-foreground">
            <span>
              Kynetic design system <span className="mx-1 text-border">·</span>{" "}
              v1.0
            </span>
            <button
              className="inline-flex items-center gap-2 transition hover:text-foreground"
              onClick={async () => {
                await navigator.clipboard.writeText("#8B5CF6");
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
              }}
            >
              <span>{copied ? "Copied #8B5CF6" : "Copy primary token"}</span>
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
            <a
              href="https://solana.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              Built for Solana <ExternalLink className="size-3" />
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof ArrowRight;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <Card className="flex-row items-center gap-3 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-alt text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight">
          {value}
        </p>
      </div>
      {delta && (
        <span className="ml-auto hidden text-body font-medium text-success sm:inline">
          {delta}
        </span>
      )}
    </Card>
  );
}
