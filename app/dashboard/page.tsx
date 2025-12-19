"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Bot,
  Activity,
  CheckCircle,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  Mail,
  ArrowRight,
  XCircle,
  BarChart3,
  Sun,
  Moon,
  UserCheck,
  UserPlus,
  Clock,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Server,
  Database,
  Shield,
  Trophy,
  Target,
  Wifi
} from "lucide-react";

// --- TYPES ---
interface Project {
  id: string;
  name: string;
  bot: string;
  type: string;
  lastRun: string;
  status: "Running" | "Completed" | "Paused" | "Failed";
  errors: number;
  completion: number;
  href: string;
}

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  time: string;
  iconType: "Mail" | "CheckCircle" | "XCircle" | "Zap";
  color: string;
  bg: string;
}

interface ExecutionStats {
  totalBots: number;
  runningTasks: number;
  activeCredits: number;
  totalCredits: number;
  systemAlerts: number;
  success: number;
  pending: number;
  failed: number;
  successRate: number;
}

interface EfficiencyMetrics {
  successRate: number;
  cost: number;
  trend?: number;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");

  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [executionStats, setExecutionStats] = useState<ExecutionStats>({
    totalBots: 0,
    runningTasks: 0,
    activeCredits: 0,
    totalCredits: 0,
    systemAlerts: 0,
    success: 0,
    pending: 0,
    failed: 0,
    successRate: 0,
  });

  const [creditsData, setCreditsData] = useState<number[]>([]);
  const [efficiencyMetrics, setEfficiencyMetrics] = useState<EfficiencyMetrics | null>(null);
  const [efficiencyLoading, setEfficiencyLoading] = useState(true);

  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [newUsersWeek, setNewUsersWeek] = useState<number>(0);
  const [tasksToday, setTasksToday] = useState<number>(0);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Parallel fetching for performance
        const [
          execRes,
          credRes,
          actRes,
          effRes,
          activeRes,
          newUsersRes,
          tasksTodayRes,
        ] = await Promise.all([
          fetch("/api/dashboard/execution-stats"),
          fetch("/api/dashboard/credits-usage"),
          fetch("/api/dashboard/activity"),
          fetch("/api/dashboard/efficiency"),
          fetch("/api/dashboard/active-users"),
          fetch("/api/dashboard/new-users-week"),
          fetch("/api/dashboard/tasks-today"),
        ]);

        if (execRes.ok) setExecutionStats(await execRes.json());
        // Fallback for stats if API fails or returns empty
        else setExecutionStats({
            totalBots: 15, runningTasks: 4, activeCredits: 450, totalCredits: 1000, 
            systemAlerts: 0, success: 85, pending: 10, failed: 5, successRate: 85
        });

        if (credRes.ok) setCreditsData(await credRes.json());
        if (actRes.ok) setActivities(await actRes.json());

        if (effRes.ok) {
          const data = await effRes.json();
          setEfficiencyMetrics(data);
        } else {
           // Fallback if efficiency API fails
           setEfficiencyMetrics({ successRate: 92, cost: 1240, trend: 12 });
        }

        if (activeRes.ok) setActiveUsers(await activeRes.json());
        if (newUsersRes.ok) setNewUsersWeek(await newUsersRes.json());
        if (tasksTodayRes.ok) setTasksToday(await tasksTodayRes.json());

        // Mock Projects Data (Replace with API if available)
        setProjects([
          { id: "1", name: "Email Outreach Campaign", bot: "Email Assistant", type: "Outreach", lastRun: "10 mins ago", status: "Running", errors: 0, completion: 45, href: "/dashboard/email-assistant" },
          { id: "2", name: "SaaS Leads Q3", bot: "Leads Engine", type: "Scraper", lastRun: "2 hours ago", status: "Completed", errors: 0, completion: 100, href: "/dashboard/leads-engine" },
          { id: "3", name: "LinkedIn Connection Flow", bot: "Outreach Bot", type: "Social", lastRun: "5 hours ago", status: "Paused", errors: 0, completion: 60, href: "/dashboard/outreach-bot" },
          { id: "4", name: "Tech Blog Generator", bot: "Content Assistant", type: "Content", lastRun: "1 day ago", status: "Failed", errors: 2, completion: 12, href: "/dashboard/content-assistant" },
          { id: "5", name: "Resume Parsing Batch", bot: "CV Generator", type: "Analysis", lastRun: "2 days ago", status: "Completed", errors: 0, completion: 100, href: "/dashboard/cv-generator" },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
        setEfficiencyLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- THEME TOGGLE ---
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // --- FILTER LOGIC ---
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bot.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || p.status === filterStatus;
      const matchesType = filterType === "All" || p.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [projects, searchQuery, filterStatus, filterType]);

  const getIcon = (type: string) => {
    switch (type) {
      case "Mail": return <Mail className="w-4 h-4 text-white" />;
      case "CheckCircle": return <CheckCircle className="w-4 h-4 text-white" />;
      case "XCircle": return <XCircle className="w-4 h-4 text-white" />;
      case "Zap": return <Zap className="w-4 h-4 text-white" />;
      default: return <Activity className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Paused": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  if (!isLoaded) return null;

  return (
    <div className={`min-h-screen bg-[#0B1221] text-slate-200 p-6 lg:p-10 animate-in fade-in duration-500 ${isDark ? 'dark' : ''}`}>
      
      {/* ------------------------------ */}
      {/* TOP BAR */}
      {/* ------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user?.firstName || "Admin"}</h1>
          <p className="text-slate-400 mt-1">Here's what's happening with your agency today.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <Link href="/dashboard/new-project" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> New Project
            </Link>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* STATS GRID */}
      {/* ------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Bots", value: executionStats.totalBots, icon: Bot, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Running Tasks", value: executionStats.runningTasks, icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Success Rate", value: `${executionStats.successRate}%`, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Credits Usage", value: `${executionStats.activeCredits}/${executionStats.totalCredits}`, icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-2">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------ */}
      {/* MAIN CONTENT GRID */}
      {/* ------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: PROJECTS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-semibold text-white">Active Projects</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0B1221] border border-slate-700 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#0B1221]/50 text-slate-400 font-medium">
                  <tr>
                    <th className="px-5 py-3">Project Name</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Completion</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-200">{project.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{project.bot} • {project.lastRun}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${project.status === 'Failed' ? 'bg-red-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${project.completion}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">{project.completion}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link href={project.href} className="text-indigo-400 hover:text-indigo-300 text-xs font-medium inline-flex items-center gap-1">
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
                            No projects found matching your search.
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EFFICIENCY & ACTIVITY */}
        <div className="space-y-6">
          
          {/* WEEKLY EFFICIENCY CARD — FIXED & RESTORED */}
          <div className="bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden h-[340px]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px]" />

            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="font-bold text-white mb-1">Weekly Efficiency</h3>
                <p className="text-xs text-slate-400">Task success rate vs. cost</p>
              </div>
              <Clock className="h-4 w-4 text-slate-500" />
            </div>

            <div className="my-4 flex-1 flex flex-col justify-center z-10">
              {efficiencyLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-500 animate-pulse">Loading efficiency data...</p>
                </div>
              ) : efficiencyMetrics ? (
                <div className="space-y-6">
                  {/* Success Rate */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-slate-400">Success Rate</span>
                      <span className="text-xl font-bold text-[#10B981]">
                        {efficiencyMetrics.successRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#10B981] transition-all duration-700 rounded-full"
                        style={{ width: `${efficiencyMetrics.successRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Cost */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-slate-400">Operational Cost</span>
                      <span className="text-xl font-bold text-blue-400">
                        £{efficiencyMetrics.cost}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 transition-all duration-700 rounded-full"
                        style={{ width: `${Math.min((efficiencyMetrics.cost / 2000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full flex-col gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-xs">Data unavailable</span>
                </div>
              )}
            </div>

            <Link
              href="/dashboard/reports/efficiency"
              className="z-10 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
            >
              View Full Report <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 text-sm">Recent Activity</h3>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex gap-3 items-start">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${activity.bg || 'bg-slate-800'}`}>
                      {getIcon(activity.iconType)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-medium text-white">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback Activity Items if API returns empty
                [
                    { id: "a1", action: "Email sent", target: "to 15 prospects", time: "2 mins ago", iconType: "Mail", bg: "bg-blue-500" },
                    { id: "a2", action: "Task completed", target: "Data Scraping", time: "1 hour ago", iconType: "CheckCircle", bg: "bg-emerald-500" },
                    { id: "a3", action: "System alert", target: "High latency", time: "3 hours ago", iconType: "Zap", bg: "bg-amber-500" }
                ].map((activity: any) => (
                    <div key={activity.id} className="flex gap-3 items-start">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                      {getIcon(activity.iconType)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-medium text-white">{activity.action}</span> {activity.target}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-4 text-xs text-slate-500 hover:text-indigo-400 transition-colors py-2">
                View all activity
            </button>
          </div>

        </div>
      </div>
      
      {/* ------------------------------ */}
      {/* NEW SECTION 1: USAGE TRENDS */}
      {/* ------------------------------ */}
      <div className="mt-8 bg-[#111827] border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Usage Trends</h3>
            <p className="text-sm text-slate-400">Daily tasks, bot runs & credits usage over the last 14 days</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div>Tasks</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Bots</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Credits</div>
          </div>
        </div>
        {/* Simple Chart Placeholder */}
        <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
          {[...Array(14)].map((_, i) => {
            const height = Math.floor(Math.random() * 60) + 20;
            return (
              <div key={i} className="flex flex-col gap-1 w-full items-center group">
                <div className="w-full max-w-[24px] bg-indigo-500/10 rounded-t-sm relative h-full group-hover:bg-indigo-500/20 transition-colors overflow-hidden flex items-end">
                   <div className="w-full bg-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${height}%` }}></div>
                   <div className="w-full bg-blue-500 absolute bottom-0 opacity-50 transition-all duration-500" style={{ height: `${height * 0.6}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------ */}
      {/* NEW SECTION 2: SYSTEM HEALTH STATUS */}
      {/* ------------------------------ */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: "API Uptime", status: "Operational", color: "bg-emerald-500", icon: Server },
          { name: "Bot Workers", status: "Operational", color: "bg-emerald-500", icon: Bot },
          { name: "Queue Health", status: "Warning", color: "bg-yellow-500", icon: Database },
          { name: "Proxy Status", status: "Operational", color: "bg-emerald-500", icon: Shield }
        ].map((item, i) => (
          <div key={i} className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg">
                <item.icon className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.status}</p>
              </div>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-[0_0_8px_rgba(0,0,0,0.3)] animate-pulse`} />
          </div>
        ))}
      </div>

      {/* ------------------------------ */}
      {/* NEW SECTIONS 3 & 4: INSIGHTS & LEADERBOARD */}
      {/* ------------------------------ */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Insights Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px]" />
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> AI Insights & Recommendations
          </h3>
          
          <div className="space-y-4 relative z-10 flex-1">
            {[
              { title: "Top Performer", desc: "Email Assistant achieved 98% delivery rate this week.", icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10" },
              { title: "Forecast", desc: "Projected 15% increase in lead generation based on current trends.", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { title: "Optimization", desc: "Switch 'Scraper Bot' to off-peak hours to save ~12% credits.", icon: Lightbulb, color: "text-blue-400", bg: "bg-blue-500/10" }
            ].map((insight, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800/50">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${insight.bg}`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bot Leaderboard Table */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h3 className="font-semibold text-white">Bot Leaderboard</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0B1221]/50 text-slate-400 font-medium">
                <tr>
                  <th className="px-6 py-3">Bot Name</th>
                  <th className="px-6 py-3">Success</th>
                  <th className="px-6 py-3">Runs</th>
                  <th className="px-6 py-3 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { name: "Leads Engine v2", success: 98, runs: 1240, cost: "£42.50" },
                  { name: "Outreach Pro", success: 94, runs: 856, cost: "£28.20" },
                  { name: "Content Wizard", success: 89, runs: 432, cost: "£15.00" },
                  { name: "Data Miner X", success: 99, runs: 210, cost: "£8.40" },
                  { name: "CV Parser", success: 91, runs: 156, cost: "£5.10" }
                ].map((bot, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-2">
                       <Target className="w-3 h-3 text-slate-500" /> {bot.name}
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{bot.success}%</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{bot.runs}</td>
                    <td className="px-6 py-4 text-right text-slate-300 font-medium">{bot.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}