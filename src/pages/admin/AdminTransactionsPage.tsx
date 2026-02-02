import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CurrencyBadge } from "@/components/ui/CurrencyBadge";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  RefreshCw,
} from "lucide-react";
import { getTransactions } from "@/lib/api";

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

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await getTransactions();
      setTransactions(res.data.rows || []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender_details?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tx.receiver_details?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and monitor all transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchTransactions}
            disabled={loading}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, sender, or receiver..."
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
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
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
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
                        <CurrencyBadge currency={tx.currency} />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-semibold">
                          {Number(tx.payout_amount).toLocaleString()}
                        </span>
                        <CurrencyBadge
                          currency={tx.currency === "INR" ? "NPR" : "INR"}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={tx.status.toLowerCase()} />
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
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
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
