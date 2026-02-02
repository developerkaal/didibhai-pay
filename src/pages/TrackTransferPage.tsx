import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, TransactionStatus } from "@/components/ui/StatusBadge";
import { CurrencyBadge } from "@/components/ui/CurrencyBadge";
import { useLanguage } from "@/context/LanguageContext";
import { Search, ArrowRight, Clock, CheckCircle2, Copy, ExternalLink } from "lucide-react";

// Mock transaction data
const MOCK_TRANSACTION = {
  id: "TXN-2024-001234",
  status: "payout_processing" as TransactionStatus,
  sendAmount: 10000,
  sendCurrency: "INR" as const,
  receiveAmount: 16000,
  receiveCurrency: "NPR" as const,
  recipientName: "Ram Prasad Sharma",
  recipientPhone: "+977 9812345678",
  payoutMethod: "eSewa",
  createdAt: "2024-01-15T10:30:00Z",
  timeline: [
    { status: "initiated", label: "Transfer Initiated", time: "10:30 AM", completed: true },
    { status: "payment_pending", label: "Awaiting Payment", time: "10:30 AM", completed: true },
    { status: "paid", label: "Payment Received", time: "10:32 AM", completed: true },
    { status: "payout_processing", label: "Processing Payout", time: "10:33 AM", completed: false, current: true },
    { status: "completed", label: "Completed", time: "", completed: false },
  ],
};

export default function TrackTransferPage() {
  const [trackingId, setTrackingId] = useState("");
  const [transaction, setTransaction] = useState<typeof MOCK_TRANSACTION | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useLanguage();

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setTransaction(MOCK_TRANSACTION);
      setIsSearching(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In production, show toast notification
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("track.title")} <span className="text-accent">{t("track.titleAccent")}</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t("track.subtitle")}
          </p>

          <div className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={t("track.placeholder")}
                className="pl-12 h-12"
              />
            </div>
            <Button
              variant="accent"
              size="lg"
              onClick={handleSearch}
              disabled={!trackingId || isSearching}
            >
              {isSearching ? t("track.searching") : t("track.button")}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            {t("track.try")} <button onClick={() => { setTrackingId("TXN-2024-001234"); handleSearch(); }} className="text-accent hover:underline">TXN-2024-001234</button>
          </p>
        </div>

        {/* Transaction Details */}
        {transaction && (
          <div className="animate-slide-up space-y-6">
            {/* Main Status Card */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(transaction.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <span className="font-mono">{transaction.id}</span>
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <StatusBadge status={transaction.status} />
              </div>

              {/* Amount Summary */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl mb-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">{t("track.youSent")}</div>
                  <div className="text-2xl font-bold">{transaction.sendAmount.toLocaleString()}</div>
                  <CurrencyBadge currency={transaction.sendCurrency} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">{t("track.recipientGets")}</div>
                  <div className="text-2xl font-bold text-accent">{transaction.receiveAmount.toLocaleString()}</div>
                  <CurrencyBadge currency={transaction.receiveCurrency} />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                <h3 className="font-semibold mb-4">{t("track.timeline")}</h3>
                <div className="relative">
                  {transaction.timeline.map((step, index) => (
                    <div key={step.status} className="flex gap-4 pb-6 last:pb-0">
                      {/* Line */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            step.completed
                              ? "bg-success text-success-foreground"
                              : step.current
                              ? "bg-accent text-accent-foreground animate-pulse"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : step.current ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        {index < transaction.timeline.length - 1 && (
                          <div
                            className={`absolute top-8 w-0.5 h-full ${
                              step.completed ? "bg-success" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className={`font-medium ${step.current ? "text-accent" : step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </div>
                        {step.time && (
                          <div className="text-sm text-muted-foreground">{step.time}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
              <h3 className="font-semibold mb-4">{t("track.recipientDetails")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("track.name")}</span>
                  <span className="font-medium">{transaction.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("track.phone")}</span>
                  <span>{transaction.recipientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("track.payoutVia")}</span>
                  <span className="font-medium">{transaction.payoutMethod}</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-accent/5 rounded-2xl border border-accent/20 p-6">
              <h3 className="font-semibold mb-2">{t("track.needHelp")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("track.helpText")}
              </p>
              <Button variant="outline" size="sm">
                {t("track.contactSupport")}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!transaction && !isSearching && (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{t("track.emptyState")}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
