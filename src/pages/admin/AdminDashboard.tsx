import { useState } from "react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, TransactionStatus } from "@/components/ui/StatusBadge";
import { CurrencyBadge } from "@/components/ui/CurrencyBadge";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Settings, 
  Users, 
  TrendingUp, 
  Bell,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronDown,
  DollarSign,
  Activity,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

// Mock data for dashboard
const MOCK_STATS = {
  totalVolume: 52340000,
  totalTransactions: 1234,
  pendingPayouts: 23,
  successRate: 98.5,
};

const MOCK_TRANSACTIONS: {
  id: string;
  sender: string;
  receiver: string;
  sendAmount: number;
  sendCurrency: "INR" | "NPR";
  receiveAmount: number;
  receiveCurrency: "INR" | "NPR";
  status: TransactionStatus;
  date: string;
}[] = [
  {
    id: "TXN-2024-001234",
    sender: "Amit Kumar",
    receiver: "Ram Sharma",
    sendAmount: 10000,
    sendCurrency: "INR",
    receiveAmount: 16000,
    receiveCurrency: "NPR",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "TXN-2024-001235",
    sender: "Priya Patel",
    receiver: "Sita Thapa",
    sendAmount: 25000,
    sendCurrency: "INR",
    receiveAmount: 40000,
    receiveCurrency: "NPR",
    status: "payout_processing",
    date: "2024-01-15",
  },
  {
    id: "TXN-2024-001236",
    sender: "Bikash Gurung",
    receiver: "Rajan Singh",
    sendAmount: 50000,
    sendCurrency: "NPR",
    receiveAmount: 31250,
    receiveCurrency: "INR",
    status: "paid",
    date: "2024-01-15",
  },
  {
    id: "TXN-2024-001237",
    sender: "Sunita Devi",
    receiver: "Gita Rai",
    sendAmount: 15000,
    sendCurrency: "INR",
    receiveAmount: 24000,
    receiveCurrency: "NPR",
    status: "failed",
    date: "2024-01-14",
  },
  {
    id: "TXN-2024-001238",
    sender: "Prakash Limbu",
    receiver: "Anil Verma",
    sendAmount: 100000,
    sendCurrency: "NPR",
    receiveAmount: 62500,
    receiveCurrency: "INR",
    status: "completed",
    date: "2024-01-14",
  },
];

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Transactions", url: "/admin/transactions", icon: ArrowLeftRight },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: TrendingUp },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export default function AdminDashboard() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-sidebar-border">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sidebar-foreground">RemitFlow</span>
                <span className="text-[10px] text-sidebar-foreground/60">Admin Panel</span>
              </div>
            </Link>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          end={item.url === "/admin"}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent"
                          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                A
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs text-success font-medium">+12.5%</span>
                </div>
                <div className="text-2xl font-bold">₹{(MOCK_STATS.totalVolume / 10000000).toFixed(1)}Cr</div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-india/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-india" />
                  </div>
                  <span className="text-xs text-success font-medium">+8.2%</span>
                </div>
                <div className="text-2xl font-bold">{MOCK_STATS.totalTransactions.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Transactions</div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <span className="text-xs text-destructive font-medium">+3</span>
                </div>
                <div className="text-2xl font-bold">{MOCK_STATS.pendingPayouts}</div>
                <div className="text-sm text-muted-foreground">Pending Payouts</div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{MOCK_STATS.successRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-card rounded-xl border border-border">
              <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search transactions..."
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Sender</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Receiver</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Sent</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Received</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-sm text-accent">{tx.id}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{tx.sendCurrency === "INR" ? "🇮🇳" : "🇳🇵"}</span>
                            <span className="font-medium">{tx.sender}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{tx.receiveCurrency === "INR" ? "🇮🇳" : "🇳🇵"}</span>
                            <span className="font-medium">{tx.receiver}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-semibold">{tx.sendAmount.toLocaleString()}</span>
                            <CurrencyBadge currency={tx.sendCurrency} />
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-semibold">{tx.receiveAmount.toLocaleString()}</span>
                            <CurrencyBadge currency={tx.receiveCurrency} />
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={tx.status} />
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{tx.date}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Showing 5 of 1,234 transactions</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
