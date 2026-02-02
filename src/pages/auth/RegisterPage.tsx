import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    country: "NP",
    phone: ""
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      login(res.data.token, res.data.user);
      toast({ title: "Welcome!", description: "Account created successfully." });
      navigate("/");
    } catch (err: any) {
      toast({ 
        title: "Registration failed", 
        description: err.response?.data?.error || "Something went wrong",
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{t("auth.registerTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>{t("auth.fullName")}</Label>
              <Input 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>{t("auth.email")}</Label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>{t("auth.password")}</Label>
              <Input 
                type="password"
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>{t("auth.country")}</Label>
                    <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v})}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="NP">{t("auth.nepal")}</SelectItem>
                            <SelectItem value="IN">{t("auth.india")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>{t("auth.phone")}</Label>
                    <Input 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        required 
                    />
                </div>
            </div>
            <Button type="submit" className="w-full">{t("auth.registerButton")}</Button>
            <div className="text-center text-sm">
              {t("auth.haveAccount")} <Link to="/login" className="text-accent hover:underline">{t("nav.login")}</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
