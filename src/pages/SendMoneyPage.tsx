import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyBadge } from "@/components/ui/CurrencyBadge";
import { 
  ArrowRight, 
  ArrowLeftRight, 
  User, 
  CreditCard, 
  Building2,
  Wallet,
  ChevronLeft,
  CheckCircle2,
  Info
} from "lucide-react";

type Step = "amount" | "recipient" | "payment" | "review";
type Direction = "india-nepal" | "nepal-india";

// Mock exchange rate
const MOCK_RATE = {
  inrToNpr: 1.6,
  nprToInr: 0.625,
};

const FEE_PERCENTAGE = 0.5; // 0.5%

export default function SendMoneyPage() {
  const [currentStep, setCurrentStep] = useState<Step>("amount");
  const [direction, setDirection] = useState<Direction>("india-nepal");
  const [sendAmount, setSendAmount] = useState("");
  const [recipientDetails, setRecipientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    payoutMethod: "" as "bank" | "upi" | "wallet" | "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    walletId: "",
  });

  const isIndiaToNepal = direction === "india-nepal";
  const rate = isIndiaToNepal ? MOCK_RATE.inrToNpr : MOCK_RATE.nprToInr;
  const sendCurrency = isIndiaToNepal ? "INR" : "NPR";
  const receiveCurrency = isIndiaToNepal ? "NPR" : "INR";
  
  const amount = parseFloat(sendAmount || "0");
  const fee = amount * (FEE_PERCENTAGE / 100);
  const amountAfterFee = amount - fee;
  const receiveAmount = amountAfterFee * rate;

  const steps: { key: Step; label: string }[] = [
    { key: "amount", label: "Amount" },
    { key: "recipient", label: "Recipient" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      index <= currentStepIndex
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${index <= currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-2 ${index < currentStepIndex ? "bg-accent" : "bg-border"}`} style={{ minWidth: "40px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6 lg:p-8">
          {/* Step 1: Amount */}
          {currentStep === "amount" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">How much would you like to send?</h2>
              
              {/* Direction Toggle */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setDirection("india-nepal")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-medium transition-all ${
                    isIndiaToNepal 
                      ? "bg-india/10 text-india border-2 border-india" 
                      : "bg-secondary text-muted-foreground border-2 border-transparent hover:border-border"
                  }`}
                >
                  <span className="text-xl">🇮🇳</span>
                  <span>India to Nepal</span>
                  <span className="text-xl">🇳🇵</span>
                </button>
                <button
                  onClick={() => setDirection("nepal-india")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-medium transition-all ${
                    !isIndiaToNepal 
                      ? "bg-nepal/10 text-nepal border-2 border-nepal" 
                      : "bg-secondary text-muted-foreground border-2 border-transparent hover:border-border"
                  }`}
                >
                  <span className="text-xl">🇳🇵</span>
                  <span>Nepal to India</span>
                  <span className="text-xl">🇮🇳</span>
                </button>
              </div>

              {/* Amount Inputs */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">You send</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="h-14 pl-4 pr-24 text-xl font-semibold border-2"
                      placeholder="0.00"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CurrencyBadge currency={sendCurrency} />
                    </div>
                  </div>
                </div>

                {/* Exchange Rate Display */}
                <div className="flex items-center justify-center gap-3 py-4">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
                    <ArrowLeftRight className="w-4 h-4 text-accent" />
                    <span className="font-medium">1 {sendCurrency} = {rate} {receiveCurrency}</span>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Recipient gets</Label>
                  <div className="relative">
                    <div className="h-14 pl-4 pr-24 rounded-lg border-2 border-border bg-secondary/50 flex items-center text-xl font-semibold">
                      {receiveAmount.toFixed(2)}
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CurrencyBadge currency={receiveCurrency} />
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                {amount > 0 && (
                  <div className="p-4 bg-secondary/50 rounded-xl space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transfer amount</span>
                      <span>{amount.toFixed(2)} {sendCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee ({FEE_PERCENTAGE}%)</span>
                      <span>-{fee.toFixed(2)} {sendCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exchange rate</span>
                      <span>×{rate}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-semibold">
                      <span>Recipient receives</span>
                      <span className="text-accent">{receiveAmount.toFixed(2)} {receiveCurrency}</span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-8"
                onClick={handleNext}
                disabled={!sendAmount || parseFloat(sendAmount) <= 0}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Recipient */}
          {currentStep === "recipient" && (
            <div className="animate-fade-in">
              <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              
              <h2 className="text-2xl font-bold mb-6">Who are you sending to?</h2>

              <div className="space-y-6">
                {/* Recipient Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Recipient Name</Label>
                    <Input
                      id="name"
                      value={recipientDetails.name}
                      onChange={(e) => setRecipientDetails({ ...recipientDetails, name: e.target.value })}
                      placeholder="Full name as per ID"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={recipientDetails.phone}
                      onChange={(e) => setRecipientDetails({ ...recipientDetails, phone: e.target.value })}
                      placeholder={isIndiaToNepal ? "+977 98XXXXXXXX" : "+91 98XXXXXXXX"}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={recipientDetails.email}
                    onChange={(e) => setRecipientDetails({ ...recipientDetails, email: e.target.value })}
                    placeholder="recipient@email.com"
                    className="mt-1"
                  />
                </div>

                {/* Payout Method */}
                <div>
                  <Label className="mb-3 block">How should recipient receive money?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setRecipientDetails({ ...recipientDetails, payoutMethod: "bank" })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        recipientDetails.payoutMethod === "bank"
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <Building2 className={`w-6 h-6 ${recipientDetails.payoutMethod === "bank" ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Bank Account</span>
                    </button>
                    <button
                      onClick={() => setRecipientDetails({ ...recipientDetails, payoutMethod: "upi" })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        recipientDetails.payoutMethod === "upi"
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <CreditCard className={`w-6 h-6 ${recipientDetails.payoutMethod === "upi" ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{isIndiaToNepal ? "eSewa/Khalti" : "UPI"}</span>
                    </button>
                    <button
                      onClick={() => setRecipientDetails({ ...recipientDetails, payoutMethod: "wallet" })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        recipientDetails.payoutMethod === "wallet"
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <Wallet className={`w-6 h-6 ${recipientDetails.payoutMethod === "wallet" ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Wallet</span>
                    </button>
                  </div>
                </div>

                {/* Payout Details based on method */}
                {recipientDetails.payoutMethod === "bank" && (
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-xl">
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={recipientDetails.accountNumber}
                        onChange={(e) => setRecipientDetails({ ...recipientDetails, accountNumber: e.target.value })}
                        placeholder="Account number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">{isIndiaToNepal ? "Bank Code" : "IFSC Code"}</Label>
                      <Input
                        id="ifscCode"
                        value={recipientDetails.ifscCode}
                        onChange={(e) => setRecipientDetails({ ...recipientDetails, ifscCode: e.target.value })}
                        placeholder={isIndiaToNepal ? "Bank code" : "IFSC code"}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {recipientDetails.payoutMethod === "upi" && (
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <Label htmlFor="upiId">{isIndiaToNepal ? "eSewa/Khalti ID" : "UPI ID"}</Label>
                    <Input
                      id="upiId"
                      value={recipientDetails.upiId}
                      onChange={(e) => setRecipientDetails({ ...recipientDetails, upiId: e.target.value })}
                      placeholder={isIndiaToNepal ? "98XXXXXXXX" : "name@upi"}
                      className="mt-1"
                    />
                  </div>
                )}

                {recipientDetails.payoutMethod === "wallet" && (
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <Label htmlFor="walletId">Wallet ID / Mobile Number</Label>
                    <Input
                      id="walletId"
                      value={recipientDetails.walletId}
                      onChange={(e) => setRecipientDetails({ ...recipientDetails, walletId: e.target.value })}
                      placeholder="Wallet ID or mobile number"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-8"
                onClick={handleNext}
                disabled={!recipientDetails.name || !recipientDetails.phone || !recipientDetails.payoutMethod}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === "payment" && (
            <div className="animate-fade-in">
              <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              
              <h2 className="text-2xl font-bold mb-6">Choose your payment method</h2>

              {/* Payment Options */}
              <div className="space-y-4">
                {isIndiaToNepal ? (
                  <>
                    <div className="p-4 border-2 border-accent rounded-xl bg-accent/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-india/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-india" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Pay via Razorpay</h3>
                          <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking & more</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-xl opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Bank Transfer</h3>
                          <p className="text-sm text-muted-foreground">Coming soon</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 border-2 border-accent rounded-xl bg-accent/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-nepal/10 flex items-center justify-center text-xl">
                          💚
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Pay via eSewa</h3>
                          <p className="text-sm text-muted-foreground">Nepal's #1 digital wallet</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-xl hover:border-accent/50 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-nepal/10 flex items-center justify-center text-xl">
                          💜
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Pay via Khalti</h3>
                          <p className="text-sm text-muted-foreground">Fast & secure payments</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Amount Summary */}
              <div className="mt-8 p-4 bg-secondary/50 rounded-xl">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">You'll pay</span>
                  <span className="font-semibold">{amount.toFixed(2)} {sendCurrency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recipient gets</span>
                  <span className="font-semibold text-accent">{receiveAmount.toFixed(2)} {receiveCurrency}</span>
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-8"
                onClick={handleNext}
              >
                Review Transfer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === "review" && (
            <div className="animate-fade-in">
              <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              
              <h2 className="text-2xl font-bold mb-6">Review your transfer</h2>

              {/* Summary Cards */}
              <div className="space-y-4">
                {/* Amount Card */}
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Transfer Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">You send</span>
                      <span className="font-semibold">{amount.toFixed(2)} {sendCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee</span>
                      <span>{fee.toFixed(2)} {sendCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exchange rate</span>
                      <span>1 {sendCurrency} = {rate} {receiveCurrency}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-medium">Recipient gets</span>
                      <span className="font-bold text-accent text-lg">{receiveAmount.toFixed(2)} {receiveCurrency}</span>
                    </div>
                  </div>
                </div>

                {/* Recipient Card */}
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Recipient Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">{recipientDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{recipientDetails.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payout method</span>
                      <span className="capitalize">{recipientDetails.payoutMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-xl border border-accent/20">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    By confirming, you agree to our Terms of Service and Privacy Policy. 
                    Transfer is subject to verification and may take up to 24 hours.
                  </p>
                </div>
              </div>

              <Button
                variant="accent"
                size="xl"
                className="w-full mt-8"
                onClick={() => {
                  // In production, this would initiate payment
                  alert("Payment integration will be connected with backend!");
                }}
              >
                Confirm & Pay {amount.toFixed(2)} {sendCurrency}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
