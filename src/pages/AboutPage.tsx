import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Users, Zap, Award, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Connecting <span className="text-india">India</span> & <span className="text-nepal">Nepal</span> Through{" "}
              <span className="text-accent">Trust</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              RemitFlow is building the most reliable, affordable, and fast cross-border payment 
              infrastructure between India and Nepal. We believe in making financial services 
              accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Millions of people between India and Nepal send money to their families, 
                pay for services, or conduct business across borders. Traditional methods 
                are slow, expensive, and often unreliable.
              </p>
              <p className="text-muted-foreground mb-6">
                We're changing that. RemitFlow provides instant transfers with the lowest 
                fees, backed by bank-level security and 24/7 support in local languages.
              </p>
              <div className="flex gap-4">
                <Link to="/send">
                  <Button variant="accent">Start Sending</Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-accent">₹500Cr+</div>
                <div className="text-sm text-muted-foreground">Transferred safely</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-india">100K+</div>
                <div className="text-sm text-muted-foreground">Happy customers</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-nepal">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-success">&lt;5min</div>
                <div className="text-sm text-muted-foreground">Average transfer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Security First",
                description: "Bank-level encryption and regulatory compliance. Your money and data are always protected.",
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: HeartHandshake,
                title: "Customer Obsessed",
                description: "24/7 support in Hindi, English, and Nepali. We're here when you need us.",
                color: "text-india",
                bg: "bg-india/10",
              },
              {
                icon: Zap,
                title: "Speed & Simplicity",
                description: "Transfers in minutes, not days. Simple process that anyone can use.",
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
            Ready to Experience the Difference?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Join thousands of users who trust RemitFlow for their cross-border transfers.
          </p>
          <Link to="/send">
            <Button variant="accent" size="xl" className="shadow-glow">
              Send Money Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
