import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { 
  ArrowRight, 
  ArrowLeftRight, 
  Shield, 
  Zap, 
  TrendingDown,
  Users,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

// Mock exchange rate - in production this would come from API
const MOCK_RATE = {
  inrToNpr: 1.6,
  nprToInr: 0.625,
};

export default function LandingPage() {
  const [sendAmount, setSendAmount] = useState("10000");
  const [direction, setDirection] = useState<"india-nepal" | "nepal-india">("india-nepal");
  
  const isIndiaToNepal = direction === "india-nepal";
  const rate = isIndiaToNepal ? MOCK_RATE.inrToNpr : MOCK_RATE.nprToInr;
  const receiveAmount = (parseFloat(sendAmount || "0") * rate).toFixed(2);
  const sendCurrency = isIndiaToNepal ? "INR" : "NPR";
  const receiveCurrency = isIndiaToNepal ? "NPR" : "INR";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <img 
              src={heroImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-india/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Instant cross-border payments</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Send Money Between{" "}
                <span className="text-india">India</span> &{" "}
                <span className="text-nepal">Nepal</span>{" "}
                <span className="text-accent">Instantly</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                The fastest, most affordable way to transfer money across borders. 
                Bank-level security with the lowest fees in the market.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/send">
                  <Button variant="accent" size="xl">
                    Start Sending
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="xl">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">₹500Cr+</div>
                  <div className="text-sm text-muted-foreground">Transferred</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">100K+</div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right - Calculator Card */}
            <div className="lg:pl-8 animate-fade-in">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-semibold mb-6">Quick Quote</h2>
                
                {/* Direction Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setDirection("india-nepal")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      isIndiaToNepal 
                        ? "bg-india/10 text-india border-2 border-india" 
                        : "bg-secondary text-muted-foreground border-2 border-transparent hover:border-border"
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>India → Nepal</span>
                    <span>🇳🇵</span>
                  </button>
                  <button
                    onClick={() => setDirection("nepal-india")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      !isIndiaToNepal 
                        ? "bg-nepal/10 text-nepal border-2 border-nepal" 
                        : "bg-secondary text-muted-foreground border-2 border-transparent hover:border-border"
                    }`}
                  >
                    <span>🇳🇵</span>
                    <span>Nepal → India</span>
                    <span>🇮🇳</span>
                  </button>
                </div>

                {/* Amount Input */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">You send</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="w-full h-14 pl-4 pr-20 rounded-xl border-2 border-border bg-background text-lg font-semibold focus:outline-none focus:border-accent transition-colors"
                        placeholder="0.00"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        <span>{isIndiaToNepal ? "🇮🇳" : "🇳🇵"}</span>
                        <span>{sendCurrency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rate Display */}
                  <div className="flex items-center justify-center gap-3 py-3">
                    <div className="h-px flex-1 bg-border" />
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
                      <ArrowLeftRight className="w-4 h-4 text-accent" />
                      <span className="font-medium">1 {sendCurrency} = {rate} {receiveCurrency}</span>
                    </div>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Recipient gets</label>
                    <div className="relative">
                      <div className="w-full h-14 pl-4 pr-20 rounded-xl border-2 border-border bg-secondary/50 flex items-center text-lg font-semibold text-foreground">
                        {receiveAmount}
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        <span>{isIndiaToNepal ? "🇳🇵" : "🇮🇳"}</span>
                        <span>{receiveCurrency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Info */}
                  <div className="flex items-center justify-between text-sm py-3 border-t border-border">
                    <span className="text-muted-foreground">Transfer fee</span>
                    <span className="font-medium text-success">₹0 (First transfer free!)</span>
                  </div>

                  <Link to="/send" className="block">
                    <Button variant="accent" size="lg" className="w-full">
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-accent">RemitFlow</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              We've built the most reliable cross-border payment system for India and Nepal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Money reaches in minutes, not days. Real-time tracking included.",
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: TrendingDown,
                title: "Lowest Fees",
                description: "Up to 90% cheaper than traditional banks. No hidden charges.",
                color: "text-success",
                bg: "bg-success/10",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "256-bit encryption, regulatory compliant, fully audited.",
                color: "text-india",
                bg: "bg-india/10",
              },
              {
                icon: Users,
                title: "24/7 Support",
                description: "Dedicated support in Hindi, English, and Nepali.",
                color: "text-nepal",
                bg: "bg-nepal/10",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Send Money in <span className="text-accent">3 Simple Steps</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              No complicated forms. No lengthy verification. Just fast, simple transfers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-accent via-accent to-accent opacity-20" />
            
            {[
              {
                step: "01",
                title: "Enter Details",
                description: "Tell us how much you want to send and where it should go.",
              },
              {
                step: "02",
                title: "Make Payment",
                description: "Pay securely using Razorpay (India) or eSewa/Khalti (Nepal).",
              },
              {
                step: "03",
                title: "Money Arrives",
                description: "Recipient gets the money in their bank or wallet instantly.",
              },
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-glow">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/send">
              <Button variant="accent" size="lg">
                Start Your First Transfer
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Supported Payment Methods */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Multiple <span className="text-accent">Payment Options</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Pay the way you prefer. We support all major payment methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* India Side */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🇮🇳</span>
                <div>
                  <h3 className="font-semibold text-lg">Pay from India</h3>
                  <p className="text-sm text-muted-foreground">via Razorpay</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {["UPI", "Debit Card", "Credit Card", "Net Banking", "Wallets"].map((method) => (
                  <span key={method} className="px-3 py-1.5 bg-india/10 text-india rounded-full text-sm font-medium">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Nepal Side */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🇳🇵</span>
                <div>
                  <h3 className="font-semibold text-lg">Pay from Nepal</h3>
                  <p className="text-sm text-muted-foreground">via eSewa & Khalti</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {["eSewa", "Khalti", "Bank Transfer", "Mobile Banking"].map((method) => (
                  <span key={method} className="px-3 py-1.5 bg-nepal/10 text-nepal rounded-full text-sm font-medium">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-india rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Send Money?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Join 100,000+ users who trust RemitFlow for their cross-border payments.
              </p>
              <Link to="/send">
                <Button variant="accent" size="xl" className="shadow-glow">
                  Send Money Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
