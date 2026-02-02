import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowRight, 
  ArrowLeftRight, 
  Shield, 
  Zap, 
  TrendingDown,
  Users,
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
  const { t } = useLanguage();
  
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
                <span>{t("hero.badge")}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t("hero.title1")}{" "}
                <span className="text-india">{t("hero.title2")}</span> {t("hero.title3")}{" "}
                <span className="text-nepal">{t("hero.title4")}</span>{" "}
                <span className="text-accent">{t("hero.title5")}</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/send">
                  <Button variant="accent" size="xl">
                    {t("hero.startSending")}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="xl">
                    {t("hero.learnMore")}
                  </Button>
                </Link>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">₹500Cr+</div>
                  <div className="text-sm text-muted-foreground">{t("stats.transferred")}</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">100K+</div>
                  <div className="text-sm text-muted-foreground">{t("stats.happyUsers")}</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">{t("stats.uptime")}</div>
                </div>
              </div>
            </div>

            {/* Right - Calculator Card */}
            <div className="lg:pl-8 animate-fade-in">
              <div className="bg-card rounded-2xl shadow-xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-semibold mb-6">{t("calculator.title")}</h2>
                
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
                    <span>{t("calculator.indiaToNepal")}</span>
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
                    <span>{t("calculator.nepalToIndia")}</span>
                    <span>🇮🇳</span>
                  </button>
                </div>

                {/* Amount Input */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t("calculator.youSend")}</label>
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
                    <label className="text-sm text-muted-foreground mb-2 block">{t("calculator.recipientGets")}</label>
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
                    <span className="text-muted-foreground">{t("calculator.transferFee")}</span>
                    <span className="font-medium text-success">{t("calculator.freeFirst")}</span>
                  </div>

                  <Link to="/send" className="block">
                    <Button variant="accent" size="lg" className="w-full">
                      {t("calculator.continue")}
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
              {t("features.title")} <span className="text-accent">RemitFlow</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: t("features.fast.title"),
                description: t("features.fast.desc"),
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: TrendingDown,
                title: t("features.fees.title"),
                description: t("features.fees.desc"),
                color: "text-success",
                bg: "bg-success/10",
              },
              {
                icon: Shield,
                title: t("features.security.title"),
                description: t("features.security.desc"),
                color: "text-india",
                bg: "bg-india/10",
              },
              {
                icon: Users,
                title: t("features.support.title"),
                description: t("features.support.desc"),
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
              {t("howItWorks.title")} <span className="text-accent">{t("howItWorks.titleAccent")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-accent via-accent to-accent opacity-20" />
            
            {[
              {
                step: "01",
                title: t("howItWorks.step1.title"),
                description: t("howItWorks.step1.desc"),
              },
              {
                step: "02",
                title: t("howItWorks.step2.title"),
                description: t("howItWorks.step2.desc"),
              },
              {
                step: "03",
                title: t("howItWorks.step3.title"),
                description: t("howItWorks.step3.desc"),
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
                {t("howItWorks.startFirst")}
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
              {t("payment.title")} <span className="text-accent">{t("payment.titleAccent")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("payment.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* India Side */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🇮🇳</span>
                <div>
                  <h3 className="font-semibold text-lg">{t("payment.india.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("payment.india.via")}</p>
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
                  <h3 className="font-semibold text-lg">{t("payment.nepal.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("payment.nepal.via")}</p>
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
                {t("cta.title")}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                {t("cta.subtitle")}
              </p>
              <Link to="/send">
                <Button variant="accent" size="xl" className="shadow-glow">
                  {t("cta.button")}
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
