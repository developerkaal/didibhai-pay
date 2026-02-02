import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Shield, Zap, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t("about.heroTitle1")} <span className="text-india">{t("hero.title2")}</span> {t("hero.title3")}{" "}
              <span className="text-nepal">{t("hero.title4")}</span> {t("about.heroTitle2")}{" "}
              <span className="text-accent">{t("about.heroTitle3")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("about.heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("about.missionTitle")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("about.missionP1")}
              </p>
              <p className="text-muted-foreground mb-6">
                {t("about.missionP2")}
              </p>
              <div className="flex gap-4">
                <Link to="/send">
                  <Button variant="accent">{t("hero.startSending")}</Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline">{t("hero.learnMore")}</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-accent">₹500Cr+</div>
                <div className="text-sm text-muted-foreground">{t("about.transferredSafely")}</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-india">100K+</div>
                <div className="text-sm text-muted-foreground">{t("about.happyCustomers")}</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-nepal">99.9%</div>
                <div className="text-sm text-muted-foreground">{t("stats.uptime")}</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-success">&lt;5min</div>
                <div className="text-sm text-muted-foreground">{t("about.averageTransfer")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("about.valuesTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.valuesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: t("about.value1.title"),
                description: t("about.value1.desc"),
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: HeartHandshake,
                title: t("about.value2.title"),
                description: t("about.value2.desc"),
                color: "text-india",
                bg: "bg-india/10",
              },
              {
                icon: Zap,
                title: t("about.value3.title"),
                description: t("about.value3.desc"),
                color: "text-nepal",
                bg: "bg-nepal/10",
              },
            ].map((value, index) => (
              <div key={index} className="p-6 bg-card rounded-2xl border border-border">
                <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            {t("about.ctaTitle")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            {t("about.ctaSubtitle")}
          </p>
          <Link to="/send">
            <Button variant="accent" size="xl" className="shadow-glow">
              {t("cta.button")}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
