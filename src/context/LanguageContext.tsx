import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "hi" | "ne";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for English, Hindi, and Nepali
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.sendMoney": "Send Money",
    "nav.trackTransfer": "Track Transfer",
    "nav.about": "About",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.register": "Register",
    
    // Hero Section
    "hero.badge": "Instant cross-border payments",
    "hero.title1": "Send Money Between",
    "hero.title2": "India",
    "hero.title3": "&",
    "hero.title4": "Nepal",
    "hero.title5": "Instantly",
    "hero.subtitle": "The fastest, most affordable way to transfer money across borders. Bank-level security with the lowest fees in the market.",
    "hero.startSending": "Start Sending",
    "hero.learnMore": "Learn More",
    
    // Stats
    "stats.transferred": "Transferred",
    "stats.happyUsers": "Happy Users",
    "stats.uptime": "Uptime",
    
    // Calculator
    "calculator.title": "Quick Quote",
    "calculator.youSend": "You send",
    "calculator.recipientGets": "Recipient gets",
    "calculator.transferFee": "Transfer fee",
    "calculator.freeFirst": "₹0 (First transfer free!)",
    "calculator.continue": "Continue",
    "calculator.indiaToNepal": "India → Nepal",
    "calculator.nepalToIndia": "Nepal → India",
    
    // Features
    "features.title": "Why Choose",
    "features.subtitle": "We've built the most reliable cross-border payment system for India and Nepal.",
    "features.fast.title": "Lightning Fast",
    "features.fast.desc": "Money reaches in minutes, not days. Real-time tracking included.",
    "features.fees.title": "Lowest Fees",
    "features.fees.desc": "Up to 90% cheaper than traditional banks. No hidden charges.",
    "features.security.title": "Bank-Level Security",
    "features.security.desc": "256-bit encryption, regulatory compliant, fully audited.",
    "features.support.title": "24/7 Support",
    "features.support.desc": "Dedicated support in Hindi, English, and Nepali.",
    
    // How it Works
    "howItWorks.title": "Send Money in",
    "howItWorks.titleAccent": "3 Simple Steps",
    "howItWorks.subtitle": "No complicated forms. No lengthy verification. Just fast, simple transfers.",
    "howItWorks.step1.title": "Enter Details",
    "howItWorks.step1.desc": "Tell us how much you want to send and where it should go.",
    "howItWorks.step2.title": "Make Payment",
    "howItWorks.step2.desc": "Pay securely using Razorpay (India) or eSewa/Khalti (Nepal).",
    "howItWorks.step3.title": "Money Arrives",
    "howItWorks.step3.desc": "Recipient gets the money in their bank or wallet instantly.",
    "howItWorks.startFirst": "Start Your First Transfer",
    
    // Payment Methods
    "payment.title": "Multiple",
    "payment.titleAccent": "Payment Options",
    "payment.subtitle": "Pay the way you prefer. We support all major payment methods.",
    "payment.india.title": "Pay from India",
    "payment.india.via": "via Razorpay",
    "payment.nepal.title": "Pay from Nepal",
    "payment.nepal.via": "via eSewa & Khalti",
    
    // CTA
    "cta.title": "Ready to Send Money?",
    "cta.subtitle": "Join 100,000+ users who trust RemitFlow for their cross-border payments.",
    "cta.button": "Send Money Now",
    
    // Footer
    "footer.tagline": "The fastest way to send money between India and Nepal. Trusted by thousands.",
    "footer.quickLinks": "Quick Links",
    "footer.legal": "Legal",
    "footer.contact": "Contact",
    "footer.helpCenter": "Help Center",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.compliance": "Compliance",
    "footer.licenses": "Licenses",
    "footer.secureRegulated": "Secure & Regulated",
    "footer.bankLevelEncryption": "Bank-level encryption",
    "footer.fastTransfers": "Fast Transfers",
    "footer.moneyArrivesMinutes": "Money arrives in minutes",
    "footer.247Support": "24/7 Support",
    "footer.alwaysHereToHelp": "Always here to help",
    "footer.copyright": "© 2024 RemitFlow. All rights reserved.",
    
    // Send Money Page
    "send.howMuch": "How much would you like to send?",
    "send.amount": "Amount",
    "send.recipient": "Recipient",
    "send.payment": "Payment",
    "send.review": "Review",
    "send.transferAmount": "Transfer amount",
    "send.fee": "Fee",
    "send.totalToPay": "Total to pay",
    "send.exchangeRate": "Exchange rate",
    "send.recipientReceives": "Recipient receives",
    "send.whoSendingTo": "Who are you sending to?",
    "send.recipientName": "Recipient Name",
    "send.phoneNumber": "Phone Number",
    "send.email": "Email (optional)",
    "send.howReceive": "How should recipient receive money?",
    "send.bankAccount": "Bank Account",
    "send.wallet": "Wallet",
    "send.accountNumber": "Account Number",
    "send.ifscCode": "IFSC Code",
    "send.upiId": "UPI ID",
    "send.walletId": "Wallet ID",
    "send.back": "Back",
    
    // Track Transfer
    "track.title": "Track Your",
    "track.titleAccent": "Transfer",
    "track.subtitle": "Enter your transaction ID to see the status of your transfer",
    "track.placeholder": "Enter Transaction ID (e.g., TXN-2024-001234)",
    "track.button": "Track",
    "track.searching": "Searching...",
    "track.try": "Try:",
    "track.youSent": "You sent",
    "track.recipientGets": "Recipient gets",
    "track.timeline": "Transfer Timeline",
    "track.recipientDetails": "Recipient Details",
    "track.name": "Name",
    "track.phone": "Phone",
    "track.payoutVia": "Payout via",
    "track.needHelp": "Need Help?",
    "track.helpText": "If your transfer is taking longer than expected or you have any questions, our support team is here to help.",
    "track.contactSupport": "Contact Support",
    "track.emptyState": "Enter a transaction ID above to track your transfer",
    
    // Status
    "status.initiated": "Initiated",
    "status.paymentPending": "Payment Pending",
    "status.paid": "Paid",
    "status.processing": "Processing Payout",
    "status.completed": "Completed",
    "status.failed": "Failed",
    
    // About Page
    "about.heroTitle1": "Connecting",
    "about.heroTitle2": "Through",
    "about.heroTitle3": "Trust",
    "about.heroSubtitle": "RemitFlow is building the most reliable, affordable, and fast cross-border payment infrastructure between India and Nepal. We believe in making financial services accessible to everyone.",
    "about.missionTitle": "Our Mission",
    "about.missionP1": "Millions of people between India and Nepal send money to their families, pay for services, or conduct business across borders. Traditional methods are slow, expensive, and often unreliable.",
    "about.missionP2": "We're changing that. RemitFlow provides instant transfers with the lowest fees, backed by bank-level security and 24/7 support in local languages.",
    "about.valuesTitle": "What We Stand For",
    "about.valuesSubtitle": "Our values guide every decision we make and every feature we build.",
    "about.value1.title": "Security First",
    "about.value1.desc": "Bank-level encryption and regulatory compliance. Your money and data are always protected.",
    "about.value2.title": "Customer Obsessed",
    "about.value2.desc": "24/7 support in Hindi, English, and Nepali. We're here when you need us.",
    "about.value3.title": "Speed & Simplicity",
    "about.value3.desc": "Transfers in minutes, not days. Simple process that anyone can use.",
    "about.ctaTitle": "Ready to Experience the Difference?",
    "about.ctaSubtitle": "Join thousands of users who trust RemitFlow for their cross-border transfers.",
    "about.transferredSafely": "Transferred safely",
    "about.happyCustomers": "Happy customers",
    "about.averageTransfer": "Average transfer",
    
    // Auth Pages
    "auth.loginTitle": "Login to DidiBhai Pay",
    "auth.registerTitle": "Create Account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.country": "Country",
    "auth.phone": "Phone",
    "auth.loginButton": "Login",
    "auth.registerButton": "Register",
    "auth.noAccount": "Don't have an account?",
    "auth.haveAccount": "Already have an account?",
    "auth.nepal": "Nepal",
    "auth.india": "India",
    
    // Language
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.nepali": "नेपाली",
    "language.select": "Language",
  },
  
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.sendMoney": "पैसे भेजें",
    "nav.trackTransfer": "ट्रांसफर ट्रैक करें",
    "nav.about": "हमारे बारे में",
    "nav.admin": "एडमिन",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    "nav.register": "रजिस्टर",
    
    // Hero Section
    "hero.badge": "तत्काल सीमा-पार भुगतान",
    "hero.title1": "पैसे भेजें",
    "hero.title2": "भारत",
    "hero.title3": "और",
    "hero.title4": "नेपाल",
    "hero.title5": "तुरंत",
    "hero.subtitle": "सीमाओं के पार पैसे भेजने का सबसे तेज़ और सस्ता तरीका। बाज़ार में सबसे कम शुल्क के साथ बैंक-स्तरीय सुरक्षा।",
    "hero.startSending": "भेजना शुरू करें",
    "hero.learnMore": "और जानें",
    
    // Stats
    "stats.transferred": "स्थानांतरित",
    "stats.happyUsers": "खुश उपयोगकर्ता",
    "stats.uptime": "अपटाइम",
    
    // Calculator
    "calculator.title": "त्वरित कोट",
    "calculator.youSend": "आप भेजते हैं",
    "calculator.recipientGets": "प्राप्तकर्ता को मिलता है",
    "calculator.transferFee": "ट्रांसफर शुल्क",
    "calculator.freeFirst": "₹0 (पहला ट्रांसफर मुफ्त!)",
    "calculator.continue": "जारी रखें",
    "calculator.indiaToNepal": "भारत → नेपाल",
    "calculator.nepalToIndia": "नेपाल → भारत",
    
    // Features
    "features.title": "क्यों चुनें",
    "features.subtitle": "हमने भारत और नेपाल के लिए सबसे विश्वसनीय सीमा-पार भुगतान प्रणाली बनाई है।",
    "features.fast.title": "बिजली की तेज़ी",
    "features.fast.desc": "पैसे मिनटों में पहुंचते हैं, दिनों में नहीं। रियल-टाइम ट्रैकिंग शामिल।",
    "features.fees.title": "सबसे कम शुल्क",
    "features.fees.desc": "पारंपरिक बैंकों से 90% तक सस्ता। कोई छिपी हुई फीस नहीं।",
    "features.security.title": "बैंक-स्तरीय सुरक्षा",
    "features.security.desc": "256-बिट एन्क्रिप्शन, नियामक अनुपालन, पूर्ण ऑडिट।",
    "features.support.title": "24/7 सहायता",
    "features.support.desc": "हिंदी, अंग्रेज़ी और नेपाली में समर्पित सहायता।",
    
    // How it Works
    "howItWorks.title": "पैसे भेजें",
    "howItWorks.titleAccent": "3 सरल चरणों में",
    "howItWorks.subtitle": "कोई जटिल फॉर्म नहीं। कोई लंबा सत्यापन नहीं। बस तेज़, सरल स्थानांतरण।",
    "howItWorks.step1.title": "विवरण दर्ज करें",
    "howItWorks.step1.desc": "हमें बताएं कि आप कितना भेजना चाहते हैं और कहां जाना चाहिए।",
    "howItWorks.step2.title": "भुगतान करें",
    "howItWorks.step2.desc": "Razorpay (भारत) या eSewa/Khalti (नेपाल) का उपयोग करके सुरक्षित भुगतान करें।",
    "howItWorks.step3.title": "पैसे पहुंचें",
    "howItWorks.step3.desc": "प्राप्तकर्ता को तुरंत उनके बैंक या वॉलेट में पैसे मिलते हैं।",
    "howItWorks.startFirst": "अपना पहला ट्रांसफर शुरू करें",
    
    // Payment Methods
    "payment.title": "कई",
    "payment.titleAccent": "भुगतान विकल्प",
    "payment.subtitle": "अपनी पसंद के अनुसार भुगतान करें। हम सभी प्रमुख भुगतान विधियों का समर्थन करते हैं।",
    "payment.india.title": "भारत से भुगतान करें",
    "payment.india.via": "Razorpay के माध्यम से",
    "payment.nepal.title": "नेपाल से भुगतान करें",
    "payment.nepal.via": "eSewa और Khalti के माध्यम से",
    
    // CTA
    "cta.title": "पैसे भेजने के लिए तैयार?",
    "cta.subtitle": "100,000+ उपयोगकर्ताओं में शामिल हों जो अपने सीमा-पार भुगतान के लिए RemitFlow पर भरोसा करते हैं।",
    "cta.button": "अभी पैसे भेजें",
    
    // Footer
    "footer.tagline": "भारत और नेपाल के बीच पैसे भेजने का सबसे तेज़ तरीका। हज़ारों लोगों द्वारा विश्वसनीय।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.legal": "कानूनी",
    "footer.contact": "संपर्क",
    "footer.helpCenter": "सहायता केंद्र",
    "footer.privacyPolicy": "गोपनीयता नीति",
    "footer.termsOfService": "सेवा की शर्तें",
    "footer.compliance": "अनुपालन",
    "footer.licenses": "लाइसेंस",
    "footer.secureRegulated": "सुरक्षित और विनियमित",
    "footer.bankLevelEncryption": "बैंक-स्तरीय एन्क्रिप्शन",
    "footer.fastTransfers": "तेज़ स्थानांतरण",
    "footer.moneyArrivesMinutes": "पैसे मिनटों में पहुंचते हैं",
    "footer.247Support": "24/7 सहायता",
    "footer.alwaysHereToHelp": "हमेशा मदद के लिए यहां",
    "footer.copyright": "© 2024 RemitFlow. सर्वाधिकार सुरक्षित।",
    
    // Send Money Page
    "send.howMuch": "आप कितना भेजना चाहते हैं?",
    "send.amount": "राशि",
    "send.recipient": "प्राप्तकर्ता",
    "send.payment": "भुगतान",
    "send.review": "समीक्षा",
    "send.transferAmount": "ट्रांसफर राशि",
    "send.fee": "शुल्क",
    "send.totalToPay": "कुल भुगतान",
    "send.exchangeRate": "विनिमय दर",
    "send.recipientReceives": "प्राप्तकर्ता को मिलता है",
    "send.whoSendingTo": "आप किसको भेज रहे हैं?",
    "send.recipientName": "प्राप्तकर्ता का नाम",
    "send.phoneNumber": "फ़ोन नंबर",
    "send.email": "ईमेल (वैकल्पिक)",
    "send.howReceive": "प्राप्तकर्ता को पैसे कैसे मिलने चाहिए?",
    "send.bankAccount": "बैंक खाता",
    "send.wallet": "वॉलेट",
    "send.accountNumber": "खाता संख्या",
    "send.ifscCode": "IFSC कोड",
    "send.upiId": "UPI ID",
    "send.walletId": "वॉलेट ID",
    "send.back": "वापस",
    
    // Track Transfer
    "track.title": "अपना",
    "track.titleAccent": "ट्रांसफर ट्रैक करें",
    "track.subtitle": "अपने ट्रांसफर की स्थिति देखने के लिए अपना ट्रांजैक्शन ID दर्ज करें",
    "track.placeholder": "ट्रांजैक्शन ID दर्ज करें (जैसे, TXN-2024-001234)",
    "track.button": "ट्रैक करें",
    "track.searching": "खोज रहे हैं...",
    "track.try": "कोशिश करें:",
    "track.youSent": "आपने भेजा",
    "track.recipientGets": "प्राप्तकर्ता को मिलता है",
    "track.timeline": "ट्रांसफर टाइमलाइन",
    "track.recipientDetails": "प्राप्तकर्ता विवरण",
    "track.name": "नाम",
    "track.phone": "फ़ोन",
    "track.payoutVia": "पेआउट माध्यम",
    "track.needHelp": "मदद चाहिए?",
    "track.helpText": "यदि आपका ट्रांसफर अपेक्षा से अधिक समय ले रहा है या आपके कोई प्रश्न हैं, तो हमारी सहायता टीम मदद के लिए यहां है।",
    "track.contactSupport": "सहायता से संपर्क करें",
    "track.emptyState": "अपना ट्रांसफर ट्रैक करने के लिए ऊपर ट्रांजैक्शन ID दर्ज करें",
    
    // Status
    "status.initiated": "शुरू किया गया",
    "status.paymentPending": "भुगतान लंबित",
    "status.paid": "भुगतान हो गया",
    "status.processing": "पेआउट प्रोसेसिंग",
    "status.completed": "पूर्ण",
    "status.failed": "विफल",
    
    // About Page
    "about.heroTitle1": "जोड़ रहे हैं",
    "about.heroTitle2": "",
    "about.heroTitle3": "विश्वास के साथ",
    "about.heroSubtitle": "RemitFlow भारत और नेपाल के बीच सबसे विश्वसनीय, सस्ता और तेज़ सीमा-पार भुगतान बुनियादी ढांचा बना रहा है। हम वित्तीय सेवाओं को सभी के लिए सुलभ बनाने में विश्वास करते हैं।",
    "about.missionTitle": "हमारा मिशन",
    "about.missionP1": "भारत और नेपाल के बीच लाखों लोग अपने परिवारों को पैसे भेजते हैं, सेवाओं के लिए भुगतान करते हैं, या सीमाओं के पार व्यापार करते हैं। पारंपरिक तरीके धीमे, महंगे और अक्सर अविश्वसनीय होते हैं।",
    "about.missionP2": "हम इसे बदल रहे हैं। RemitFlow सबसे कम शुल्क के साथ तत्काल स्थानांतरण प्रदान करता है, बैंक-स्तरीय सुरक्षा और स्थानीय भाषाओं में 24/7 सहायता के साथ।",
    "about.valuesTitle": "हम किसके लिए खड़े हैं",
    "about.valuesSubtitle": "हमारे मूल्य हमारे हर निर्णय और हर सुविधा का मार्गदर्शन करते हैं।",
    "about.value1.title": "सुरक्षा पहले",
    "about.value1.desc": "बैंक-स्तरीय एन्क्रिप्शन और नियामक अनुपालन। आपका पैसा और डेटा हमेशा सुरक्षित रहता है।",
    "about.value2.title": "ग्राहक केंद्रित",
    "about.value2.desc": "हिंदी, अंग्रेज़ी और नेपाली में 24/7 सहायता। जब आपको हमारी ज़रूरत हो, हम यहां हैं।",
    "about.value3.title": "गति और सरलता",
    "about.value3.desc": "मिनटों में स्थानांतरण, दिनों में नहीं। सरल प्रक्रिया जो कोई भी उपयोग कर सकता है।",
    "about.ctaTitle": "अंतर अनुभव करने के लिए तैयार?",
    "about.ctaSubtitle": "हज़ारों उपयोगकर्ताओं में शामिल हों जो अपने सीमा-पार स्थानांतरण के लिए RemitFlow पर भरोसा करते हैं।",
    "about.transferredSafely": "सुरक्षित रूप से स्थानांतरित",
    "about.happyCustomers": "खुश ग्राहक",
    "about.averageTransfer": "औसत स्थानांतरण",
    
    // Auth Pages
    "auth.loginTitle": "DidiBhai Pay में लॉगिन करें",
    "auth.registerTitle": "खाता बनाएं",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.fullName": "पूरा नाम",
    "auth.country": "देश",
    "auth.phone": "फ़ोन",
    "auth.loginButton": "लॉगिन",
    "auth.registerButton": "रजिस्टर",
    "auth.noAccount": "खाता नहीं है?",
    "auth.haveAccount": "पहले से खाता है?",
    "auth.nepal": "नेपाल",
    "auth.india": "भारत",
    
    // Language
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.nepali": "नेपाली",
    "language.select": "भाषा",
  },
  
  ne: {
    // Navigation
    "nav.home": "गृहपृष्ठ",
    "nav.sendMoney": "पैसा पठाउनुहोस्",
    "nav.trackTransfer": "ट्रान्सफर ट्र्याक गर्नुहोस्",
    "nav.about": "हाम्रो बारेमा",
    "nav.admin": "एडमिन",
    "nav.login": "लगइन",
    "nav.logout": "लगआउट",
    "nav.register": "दर्ता गर्नुहोस्",
    
    // Hero Section
    "hero.badge": "तत्काल सीमापार भुक्तानी",
    "hero.title1": "पैसा पठाउनुहोस्",
    "hero.title2": "भारत",
    "hero.title3": "र",
    "hero.title4": "नेपाल",
    "hero.title5": "तुरुन्तै",
    "hero.subtitle": "सीमा पार पैसा पठाउने सबैभन्दा छिटो र सस्तो तरिका। बजारमा सबैभन्दा कम शुल्कसहित बैंक-स्तरीय सुरक्षा।",
    "hero.startSending": "पठाउन सुरु गर्नुहोस्",
    "hero.learnMore": "थप जान्नुहोस्",
    
    // Stats
    "stats.transferred": "स्थानान्तरित",
    "stats.happyUsers": "खुसी प्रयोगकर्ता",
    "stats.uptime": "अपटाइम",
    
    // Calculator
    "calculator.title": "द्रुत उद्धरण",
    "calculator.youSend": "तपाईं पठाउनुहुन्छ",
    "calculator.recipientGets": "प्राप्तकर्ताले पाउँछ",
    "calculator.transferFee": "ट्रान्सफर शुल्क",
    "calculator.freeFirst": "₹0 (पहिलो ट्रान्सफर नि:शुल्क!)",
    "calculator.continue": "जारी राख्नुहोस्",
    "calculator.indiaToNepal": "भारत → नेपाल",
    "calculator.nepalToIndia": "नेपाल → भारत",
    
    // Features
    "features.title": "किन छान्नुहोस्",
    "features.subtitle": "हामीले भारत र नेपालको लागि सबैभन्दा भरपर्दो सीमापार भुक्तानी प्रणाली बनाएका छौं।",
    "features.fast.title": "बिजुली झैं छिटो",
    "features.fast.desc": "पैसा मिनेटमा पुग्छ, दिनमा होइन। रियल-टाइम ट्र्याकिङ समावेश।",
    "features.fees.title": "सबैभन्दा कम शुल्क",
    "features.fees.desc": "परम्परागत बैंकहरू भन्दा ९०% सम्म सस्तो। कुनै लुकेको शुल्क छैन।",
    "features.security.title": "बैंक-स्तरीय सुरक्षा",
    "features.security.desc": "256-बिट एन्क्रिप्शन, नियामक अनुपालन, पूर्ण अडिट।",
    "features.support.title": "24/7 सहयोग",
    "features.support.desc": "हिन्दी, अंग्रेजी र नेपालीमा समर्पित सहयोग।",
    
    // How it Works
    "howItWorks.title": "पैसा पठाउनुहोस्",
    "howItWorks.titleAccent": "३ सरल चरणमा",
    "howItWorks.subtitle": "कुनै जटिल फारम छैन। कुनै लामो प्रमाणीकरण छैन। बस छिटो, सरल स्थानान्तरण।",
    "howItWorks.step1.title": "विवरण प्रविष्ट गर्नुहोस्",
    "howItWorks.step1.desc": "हामीलाई भन्नुहोस् तपाईं कति पठाउन चाहनुहुन्छ र कहाँ जानुपर्छ।",
    "howItWorks.step2.title": "भुक्तानी गर्नुहोस्",
    "howItWorks.step2.desc": "Razorpay (भारत) वा eSewa/Khalti (नेपाल) प्रयोग गरेर सुरक्षित भुक्तानी गर्नुहोस्।",
    "howItWorks.step3.title": "पैसा पुग्छ",
    "howItWorks.step3.desc": "प्राप्तकर्ताले तुरुन्तै उनीहरूको बैंक वा वालेटमा पैसा पाउँछ।",
    "howItWorks.startFirst": "आफ्नो पहिलो ट्रान्सफर सुरु गर्नुहोस्",
    
    // Payment Methods
    "payment.title": "धेरै",
    "payment.titleAccent": "भुक्तानी विकल्पहरू",
    "payment.subtitle": "आफ्नो मनपर्ने तरिकाले भुक्तानी गर्नुहोस्। हामी सबै प्रमुख भुक्तानी विधिहरू समर्थन गर्छौं।",
    "payment.india.title": "भारतबाट भुक्तानी गर्नुहोस्",
    "payment.india.via": "Razorpay मार्फत",
    "payment.nepal.title": "नेपालबाट भुक्तानी गर्नुहोस्",
    "payment.nepal.via": "eSewa र Khalti मार्फत",
    
    // CTA
    "cta.title": "पैसा पठाउन तयार?",
    "cta.subtitle": "100,000+ प्रयोगकर्ताहरूमा सामेल हुनुहोस् जसले सीमापार भुक्तानीको लागि RemitFlow मा भरोसा गर्छन्।",
    "cta.button": "अहिले पैसा पठाउनुहोस्",
    
    // Footer
    "footer.tagline": "भारत र नेपाल बीच पैसा पठाउने सबैभन्दा छिटो तरिका। हजारौंले विश्वास गरेको।",
    "footer.quickLinks": "द्रुत लिङ्कहरू",
    "footer.legal": "कानुनी",
    "footer.contact": "सम्पर्क",
    "footer.helpCenter": "सहयोग केन्द्र",
    "footer.privacyPolicy": "गोपनीयता नीति",
    "footer.termsOfService": "सेवाका सर्तहरू",
    "footer.compliance": "अनुपालन",
    "footer.licenses": "इजाजतपत्र",
    "footer.secureRegulated": "सुरक्षित र विनियमित",
    "footer.bankLevelEncryption": "बैंक-स्तरीय एन्क्रिप्शन",
    "footer.fastTransfers": "छिटो स्थानान्तरण",
    "footer.moneyArrivesMinutes": "पैसा मिनेटमा पुग्छ",
    "footer.247Support": "24/7 सहयोग",
    "footer.alwaysHereToHelp": "सधैं मद्दतको लागि यहाँ",
    "footer.copyright": "© 2024 RemitFlow. सर्वाधिकार सुरक्षित।",
    
    // Send Money Page
    "send.howMuch": "तपाईं कति पठाउन चाहनुहुन्छ?",
    "send.amount": "रकम",
    "send.recipient": "प्राप्तकर्ता",
    "send.payment": "भुक्तानी",
    "send.review": "समीक्षा",
    "send.transferAmount": "ट्रान्सफर रकम",
    "send.fee": "शुल्क",
    "send.totalToPay": "कुल भुक्तानी",
    "send.exchangeRate": "विनिमय दर",
    "send.recipientReceives": "प्राप्तकर्ताले पाउँछ",
    "send.whoSendingTo": "तपाईं कसलाई पठाउँदै हुनुहुन्छ?",
    "send.recipientName": "प्राप्तकर्ताको नाम",
    "send.phoneNumber": "फोन नम्बर",
    "send.email": "इमेल (वैकल्पिक)",
    "send.howReceive": "प्राप्तकर्ताले पैसा कसरी प्राप्त गर्ने?",
    "send.bankAccount": "बैंक खाता",
    "send.wallet": "वालेट",
    "send.accountNumber": "खाता नम्बर",
    "send.ifscCode": "IFSC कोड",
    "send.upiId": "UPI ID",
    "send.walletId": "वालेट ID",
    "send.back": "पछाडि",
    
    // Track Transfer
    "track.title": "आफ्नो",
    "track.titleAccent": "ट्रान्सफर ट्र्याक गर्नुहोस्",
    "track.subtitle": "आफ्नो ट्रान्सफरको स्थिति हेर्न आफ्नो कारोबार ID प्रविष्ट गर्नुहोस्",
    "track.placeholder": "कारोबार ID प्रविष्ट गर्नुहोस् (जस्तै, TXN-2024-001234)",
    "track.button": "ट्र्याक गर्नुहोस्",
    "track.searching": "खोज्दै...",
    "track.try": "प्रयास गर्नुहोस्:",
    "track.youSent": "तपाईंले पठाउनुभयो",
    "track.recipientGets": "प्राप्तकर्ताले पाउँछ",
    "track.timeline": "ट्रान्सफर टाइमलाइन",
    "track.recipientDetails": "प्राप्तकर्ता विवरण",
    "track.name": "नाम",
    "track.phone": "फोन",
    "track.payoutVia": "पेआउट माध्यम",
    "track.needHelp": "मद्दत चाहिन्छ?",
    "track.helpText": "यदि तपाईंको ट्रान्सफर अपेक्षित भन्दा बढी समय लिइरहेको छ वा तपाईंसँग कुनै प्रश्नहरू छन् भने, हाम्रो सहयोग टोली मद्दतको लागि यहाँ छ।",
    "track.contactSupport": "सहयोगसँग सम्पर्क गर्नुहोस्",
    "track.emptyState": "आफ्नो ट्रान्सफर ट्र्याक गर्न माथि कारोबार ID प्रविष्ट गर्नुहोस्",
    
    // Status
    "status.initiated": "सुरु गरियो",
    "status.paymentPending": "भुक्तानी बाँकी",
    "status.paid": "भुक्तानी भयो",
    "status.processing": "पेआउट प्रशोधन",
    "status.completed": "पूरा भयो",
    "status.failed": "असफल",
    
    // About Page
    "about.heroTitle1": "जोड्दै",
    "about.heroTitle2": "",
    "about.heroTitle3": "विश्वासको साथ",
    "about.heroSubtitle": "RemitFlow ले भारत र नेपाल बीच सबैभन्दा भरपर्दो, सस्तो र छिटो सीमापार भुक्तानी पूर्वाधार निर्माण गर्दैछ। हामी वित्तीय सेवाहरू सबैको लागि पहुँचयोग्य बनाउनमा विश्वास गर्छौं।",
    "about.missionTitle": "हाम्रो मिशन",
    "about.missionP1": "भारत र नेपाल बीच लाखौं मानिसहरूले आफ्ना परिवारलाई पैसा पठाउँछन्, सेवाहरूको लागि भुक्तानी गर्छन्, वा सीमा पार व्यापार गर्छन्। परम्परागत विधिहरू ढिलो, महँगो र प्रायः अविश्वसनीय छन्।",
    "about.missionP2": "हामी त्यसलाई परिवर्तन गर्दैछौं। RemitFlow ले सबैभन्दा कम शुल्कमा तत्काल स्थानान्तरण प्रदान गर्दछ, बैंक-स्तरीय सुरक्षा र स्थानीय भाषाहरूमा 24/7 सहयोगको साथ।",
    "about.valuesTitle": "हामी केको लागि उभिन्छौं",
    "about.valuesSubtitle": "हाम्रा मूल्यहरूले हाम्रो हरेक निर्णय र हरेक सुविधाको मार्गदर्शन गर्दछ।",
    "about.value1.title": "सुरक्षा पहिलो",
    "about.value1.desc": "बैंक-स्तरीय एन्क्रिप्शन र नियामक अनुपालन। तपाईंको पैसा र डाटा सधैं सुरक्षित छ।",
    "about.value2.title": "ग्राहक केन्द्रित",
    "about.value2.desc": "हिन्दी, अंग्रेजी र नेपालीमा 24/7 सहयोग। तपाईंलाई हामी चाहिँदा हामी यहाँ छौं।",
    "about.value3.title": "गति र सरलता",
    "about.value3.desc": "मिनेटमा स्थानान्तरण, दिनमा होइन। सरल प्रक्रिया जुन कसैले पनि प्रयोग गर्न सक्छ।",
    "about.ctaTitle": "भिन्नता अनुभव गर्न तयार?",
    "about.ctaSubtitle": "हजारौं प्रयोगकर्ताहरूमा सामेल हुनुहोस् जसले सीमापार स्थानान्तरणको लागि RemitFlow मा भरोसा गर्छन्।",
    "about.transferredSafely": "सुरक्षित रूपमा स्थानान्तरित",
    "about.happyCustomers": "खुसी ग्राहकहरू",
    "about.averageTransfer": "औसत स्थानान्तरण",
    
    // Auth Pages
    "auth.loginTitle": "DidiBhai Pay मा लगइन गर्नुहोस्",
    "auth.registerTitle": "खाता बनाउनुहोस्",
    "auth.email": "इमेल",
    "auth.password": "पासवर्ड",
    "auth.fullName": "पूरा नाम",
    "auth.country": "देश",
    "auth.phone": "फोन",
    "auth.loginButton": "लगइन",
    "auth.registerButton": "दर्ता गर्नुहोस्",
    "auth.noAccount": "खाता छैन?",
    "auth.haveAccount": "पहिले नै खाता छ?",
    "auth.nepal": "नेपाल",
    "auth.india": "भारत",
    
    // Language
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.nepali": "नेपाली",
    "language.select": "भाषा",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
