import { Link } from "react-router-dom";
import { ArrowLeftRight, Shield, Clock, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{t("footer.secureRegulated")}</h4>
                <p className="text-sm text-primary-foreground/70">{t("footer.bankLevelEncryption")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{t("footer.fastTransfers")}</h4>
                <p className="text-sm text-primary-foreground/70">{t("footer.moneyArrivesMinutes")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">{t("footer.247Support")}</h4>
                <p className="text-sm text-primary-foreground/70">{t("footer.alwaysHereToHelp")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-lg">RemitFlow</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-4">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/send" className="hover:text-primary-foreground transition-colors">{t("nav.sendMoney")}</Link></li>
              <li><Link to="/track" className="hover:text-primary-foreground transition-colors">{t("nav.trackTransfer")}</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/help" className="hover:text-primary-foreground transition-colors">{t("footer.helpCenter")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">{t("footer.privacyPolicy")}</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">{t("footer.termsOfService")}</Link></li>
              <li><Link to="/compliance" className="hover:text-primary-foreground transition-colors">{t("footer.compliance")}</Link></li>
              <li><Link to="/licenses" className="hover:text-primary-foreground transition-colors">{t("footer.licenses")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>support@remitflow.com</li>
              <li>+91 1800 123 4567</li>
              <li>+977 1 4123456</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>{t("footer.copyright")}</p>
            <div className="flex items-center gap-4">
              <span>🇮🇳 India</span>
              <span>↔</span>
              <span>🇳🇵 Nepal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
