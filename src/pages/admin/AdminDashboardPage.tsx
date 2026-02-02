import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, TransactionStatus } from "@/components/ui/StatusBadge";
import { CurrencyBadge } from "@/components/ui/CurrencyBadge";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  DollarSign,
  Activity,
  Clock,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { getTransactions, getAnalytics } from "@/lib/api";

interface Transaction {
  id: string;
  sender_details: any;
  receiver_details: any;
  amount: number;
  currency: string;
  payout_amount: number;
  status: string;
  created_at: string;
}

interface AnalyticsData {
  totalVolume: number;
  totalTransactions: number;
  avgTransaction: number;
  completedTransactions: number;
  totalUsers: number;
  pendingPayouts: number;
  successRate: number;
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsRes, analyticsRes] = await Promise.all([
        getTransactions(),
        getAnalytics("30d"),
      ]);

      setTransactions(transactionsRes.data.rows.slice(0, 5)); // Only show recent 5
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-success font-medium">+12.5%</span>
          </div>
          <div className="text-2xl font-bold">
            ₹{(analytics?.totalVolume || 0) / 10000000}Cr
          </div>
          <div className="text-sm text-muted-foreground">Total Volume</div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-success font-medium">+8.2%</span>
          </div>
          <div className="text-2xl font-bold">
            {analytics?.totalTransactions?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Transactions
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <span className="text-xs text-destructive font-medium">+3</span>
          </div>
          <div className="text-2xl font-bold">
            {analytics?.pendingPayouts || 0}
          </div>
          <div className="text-sm text-muted-foreground">Pending Payouts</div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="text-2xl font-bold">
            {analytics?.successRate?.toFixed(1) || 0}%
          </div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
      </div>

      {/* Recent Transactions */}
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
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Transaction ID
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Sender
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Receiver
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Sent
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Received
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm text-accent">
                        {tx.id.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {tx.currency === "INR" ? "🇮🇳" : "🇳🇵"}
                        </span>
                        <span className="font-medium">
                          {tx.sender_details?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {tx.currency === "INR" ? "🇳🇵" : "🇮🇳"}
                        </span>
                        <span className="font-medium">
                          {tx.receiver_details?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-semibold">
                          {Number(tx.amount).toLocaleString()}
                        </span>
                        <CurrencyBadge
                          currency={tx.currency as "INR" | "NPR"}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-semibold">
                          {Number(tx.payout_amount).toLocaleString()}
                        </span>
                        <CurrencyBadge
                          currency={
                            (tx.currency === "INR" ? "NPR" : "INR") as
                              | "INR"
                              | "NPR"
                          }
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          (tx.status.toLowerCase() as TransactionStatus) ||
                          "initiated"
                        }
                      />
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {transactions.length} recent transactions
          </span>
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/transactions">View All</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
