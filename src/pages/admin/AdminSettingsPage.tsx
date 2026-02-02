import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { Save, RefreshCw } from "lucide-react";

interface SettingsData {
  fxRates: { pair: string; rate: number }[];
  fees: { fixedFee: number; percentFee: number };
}

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    fxRates: [],
    fees: { fixedFee: 0, percentFee: 0 },
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Fetch FX rates and fees
      const [fxRatesRes, feesRes] = await Promise.all([
        api.get("/admin/fx-rates"),
        api.get("/admin/fees"),
      ]);

      setSettings({
        fxRates: fxRatesRes.data.rows || [],
        fees: feesRes.data || { fixedFee: 0, percentFee: 0 },
      });
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateFxRate = async (pair: string, rate: number) => {
    try {
      await api.post("/admin/fx-rate", { pair, rate });
      toast({
        title: "Success",
        description: `FX rate for ${pair} updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update FX rate",
        variant: "destructive",
      });
    }
  };

  const updateFees = async () => {
    try {
      setSaving(true);
      await api.post("/admin/fees", settings.fees);
      toast({
        title: "Success",
        description: "Fees updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update fees",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings, fees, and exchange rates
        </p>
      </div>

      {/* FX Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Exchange Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.fxRates.map((rate) => (
            <div key={rate.pair} className="flex items-center gap-4">
              <Label className="w-20">{rate.pair}</Label>
              <Input
                type="number"
                step="0.0001"
                value={rate.rate}
                onChange={(e) => {
                  const newRate = parseFloat(e.target.value);
                  setSettings((prev) => ({
                    ...prev,
                    fxRates: prev.fxRates.map((r) =>
                      r.pair === rate.pair ? { ...r, rate: newRate } : r,
                    ),
                  }));
                }}
                className="w-32"
              />
              <Button
                size="sm"
                onClick={() => updateFxRate(rate.pair, rate.rate)}
              >
                Update
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fixedFee">Fixed Fee (₹)</Label>
              <Input
                id="fixedFee"
                type="number"
                step="0.01"
                value={settings.fees.fixedFee}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    fees: {
                      ...prev.fees,
                      fixedFee: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentFee">Percentage Fee (%)</Label>
              <Input
                id="percentFee"
                type="number"
                step="0.01"
                value={settings.fees.percentFee}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    fees: {
                      ...prev.fees,
                      percentFee: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
              />
            </div>
          </div>
          <Button onClick={updateFees} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Fees
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>Version: 1.0.0</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
