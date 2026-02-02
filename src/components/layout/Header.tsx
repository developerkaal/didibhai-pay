import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Menu, X, User, Shield, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/send", label: t("nav.sendMoney") },
    { href: "/track", label: t("nav.trackTransfer") },
    { href: "/about", label: t("nav.about") },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              <ArrowLeftRight className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">
                RemitFlow
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                India ↔ Nepal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4 mr-1" />
                      {t("nav.admin")}
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.fullName}</span>
                  {user.role === "admin" && (
                    <Shield className="w-4 h-4 text-accent" />
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  {t("nav.logout")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    <Shield className="w-4 h-4 mr-1" />
                    {t("nav.admin")}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-1" />
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/send">
                  <Button variant="accent" size="sm">
                    {t("nav.sendMoney")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-border mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="w-4 h-4" />
                    <span>{user.fullName}</span>
                    {user.role === "admin" && (
                      <Shield className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/send" className="flex-1">
                    <Button variant="accent" className="w-full">
                      {t("nav.sendMoney")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
