import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Sparkles, Shield, Clock, Star, CheckCircle, Phone, Mail, MapPin,
  ChevronRight, Menu, X, Facebook, Instagram, Twitter, Leaf, Award,
  Users, ThumbsUp, Home as HomeIcon, Zap, RefreshCw, ArrowRight, HeartHandshake,
  CalendarCheck, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  // { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: HomeIcon,
    title: "Regular Cleaning",
    description: "Keep your home consistently fresh and tidy with our scheduled weekly or bi-weekly cleaning visits.",
    features: ["Vacuuming & mopping", "Bathroom & kitchen sanitizing", "Dusting all surfaces", "Trash removal"],
    image: "/images/service-regular.png",
    badge: "Most Popular",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "A thorough top-to-bottom clean that tackles every corner, ideal for seasonal refreshes or first-time clients.",
    features: ["Inside oven & fridge", "Baseboards & blinds", "Grout & tile scrubbing", "Window sills & tracks"],
    image: "/images/service-deep-clean.png",
    badge: "Recommended",
  },
  {
    icon: RefreshCw,
    title: "Move-In / Move-Out",
    description: "Start fresh or leave on a high note. We ensure every space is spotless for incoming or outgoing tenants.",
    features: ["Full property deep clean", "Inside all cabinets", "Appliance cleaning", "Wall & door wipe-down"],
    image: "/images/service-movein.png",
    badge: null,
  },
  {
    icon: Zap,
    title: "Post-Renovation",
    description: "Construction dust and debris are no match for our specialized post-renovation cleaning service.",
    features: ["Dust & debris removal", "Paint splatter clean-up", "Surface polishing", "Window streak removal"],
    image: "/images/service-post-renovation.jpg",
    badge: "Specialty",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "120",
    period: "per visit",
    description: "Perfect for small apartments or studios needing regular upkeep.",
    features: [
      "Up to 2 bedrooms",
      "1–2 bathrooms",
      "Kitchen & living areas",
      "Weekly or bi-weekly schedule",
      "Eco-friendly products",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Home Essential",
    price: "185",
    period: "per visit",
    description: "Our most popular plan for medium-sized family homes.",
    features: [
      "Up to 4 bedrooms",
      "Up to 3 bathrooms",
      "Full home coverage",
      "Flexible scheduling",
      "Eco-friendly products",
      "Priority booking",
    ],
    cta: "Book Now",
    highlight: true,
  },
  {
    name: "Premium Glow",
    price: "299",
    period: "per visit",
    description: "Complete luxury care for large homes and estates.",
    features: [
      "5+ bedrooms",
      "4+ bathrooms",
      "Deep clean included",
      "Same-day availability",
      "Eco-friendly products",
      "Priority + dedicated team",
      "Monthly deep clean bonus",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Brampton, ON",
    rating: 5,
    text: "Saomee Glow has completely transformed our home! Their team is thorough, professional, and always on time. I love coming home after they've been — everything sparkles.",
    avatar: "SM",
  },
  {
    name: "James K.",
    location: "Vancouver, BC",
    rating: 5,
    text: "We hired them for a move-out clean and our landlord was blown away. Got our full deposit back! The attention to detail is unmatched. Highly recommend.",
    avatar: "JK",
  },
  {
    name: "Priya R.",
    location: "Calgary, AB",
    rating: 5,
    text: "I've tried several cleaning services before, but none compare to Saomee Glow. They use eco-friendly products which matters a lot to me as a parent. Absolutely fantastic!",
    avatar: "PR",
  },
  {
    name: "Michael T.",
    location: "Brampton, ON",
    rating: 5,
    text: "Outstanding service from start to finish. The booking process was simple, the team was friendly, and my condo has never looked better. Will definitely keep using them.",
    avatar: "MT",
  },
  {
    name: "Linda F.",
    location: "Edmonton, AB",
    rating: 5,
    text: "I'm a busy mom of three and Saomee Glow is a lifesaver. Reliable, thorough, and they always bring a smile. My house feels like a hotel after each visit!",
    avatar: "LF",
  },
];

const FAQ_ITEMS = [
  {
    question: "What areas in Canada do you serve?",
    answer: "We currently serve Toronto, Vancouver, Calgary, Edmonton, Ottawa, and surrounding areas. We are actively expanding to new cities. Contact us to check availability in your specific location.",
  },
  {
    question: "Are your cleaning products safe for children and pets?",
    answer: "Absolutely! We use only eco-friendly, non-toxic cleaning products that are safe for the whole family, including children and pets. We can also accommodate special requests if you have specific sensitivities.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't need to be home. Many of our clients provide us with a key or entry code. We are fully insured and bonded, and our team undergoes thorough background checks for your peace of mind.",
  },
  {
    question: "How do I book a cleaning service?",
    answer: "You can book through our website contact form, call us directly, or send us an email. We'll confirm your appointment within 24 hours and send a reminder before each scheduled visit.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "We ask for at least 24 hours notice for cancellations or rescheduling. Cancellations with less notice may incur a small fee. We understand life happens and try to be as flexible as possible.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer: "Yes, every member of our team is fully insured, bonded, and has undergone comprehensive background checks. We take your safety and trust very seriously.",
  },
  {
    question: "Do you bring your own cleaning supplies?",
    answer: "Yes, we bring all necessary cleaning equipment and eco-friendly products. If you prefer we use specific products from your home, just let us know in advance.",
  },
];

const SERVICE_AREAS = [
  "Toronto", "Mississauga", "Brampton", "Calgary",
  "Vancouver", "Burnaby", "Edmonton", "Hamilton",
];

const STATS = [
  { value: "100+", label: "Happy Clients", icon: Users },
  { value: "100+", label: "Homes Cleaned", icon: HomeIcon },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "100%", label: "Satisfaction Rate", icon: ThumbsUp },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <img src="/images/site-icon.png" className="w-24" />
            <span className={`font-bold text-lg tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
              Saomee <span className="text-primary">Glow</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => handleNavClick("#contact")}
              data-testid="button-nav-quote"
            >
              Book appointment
            </Button>
          </div>

          <button
            className={`md:hidden p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-card border-b border-border shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
                className="text-sm font-medium text-foreground text-left py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => handleNavClick("#contact")}
              data-testid="button-mobile-quote"
              className="mt-2"
            >
              Book appointment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="section-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cleaning.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-teal-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex justify-center mb-6">
          <Badge
            data-testid="badge-hero-tagline"
            className="bg-white/15 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-1.5"
          >
            <Leaf className="w-3.5 h-3.5 mr-1.5" />
            Canada's Trusted Eco-Friendly Cleaners
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Your Home, Cleaned<br />
          <span className="text-primary">to Perfection</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
          Professional, reliable, and eco-friendly house cleaning across Canada.
          Let Saomee Glow Services bring the sparkle back to your home.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            onClick={() => handleScroll("#contact")}
            data-testid="button-hero-cta"
            className="text-base px-8"
          >
            Book an Appointment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScroll("#services")}
            data-testid="button-hero-services"
            className="text-base px-8 bg-white/10 border-white/40 text-white backdrop-blur-sm"
          >
            Explore Services
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          {[
            { icon: CheckCircle, text: "No long-term contracts" },
            { icon: Shield, text: "Fully insured & bonded" },
            { icon: Leaf, text: "Eco-friendly products" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      data-testid="section-stats"
      className="py-12 bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-center text-white"
            >
              <div className="flex justify-center mb-2">
                <Icon className="w-6 h-6 text-white/70" />
              </div>
              <div className="text-3xl font-bold mb-1">{value}</div>
              <div className="text-sm text-white/75">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" data-testid="section-services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4" data-testid="badge-services">Our Services</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cleaning Solutions for Every Home
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From routine maintenance to complete transformations — we have the perfect service for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <Card
              key={service.title}
              data-testid={`card-service-${i}`}
              className="group hover-elevate overflow-visible"
            >
              {service.image && (
                <div className="relative h-52 rounded-t-lg overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {service.badge && (
                    <div className="absolute top-3 right-3">
                      <Badge data-testid={`badge-service-${service.title}`}>
                        {service.badge}
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              {!service.image && service.badge && (
                <div className="px-6 pt-6">
                  <Badge data-testid={`badge-service-${service.title}`}>{service.badge}</Badge>
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Fully Insured & Bonded",
      description: "Complete peace of mind — all our cleaners are background-checked, insured, and bonded.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "We use only non-toxic, environmentally responsible products — safe for kids, pets, and the planet.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Morning, evening, weekends — we work around your lifestyle for maximum convenience.",
    },
    {
      icon: Award,
      title: "Satisfaction Guaranteed",
      description: "Not happy with something? We'll come back and make it right, completely free of charge.",
    },
    {
      icon: HeartHandshake,
      title: "Locally Owned & Operated",
      description: "A proudly Canadian business that cares about its community and customers.",
    },
    {
      icon: CalendarCheck,
      title: "Easy Online Booking",
      description: "Book your cleaning in minutes through our website or give us a quick call.",
    },
  ];

  return (
    <section
      data-testid="section-why-us"
      className="py-20 bg-muted"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4" data-testid="badge-why-us">Why Choose Us</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Saomee Glow Difference
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don't just clean houses — we create environments where families thrive and feel at home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              data-testid={`card-reason-${i}`}
              className="bg-card rounded-lg p-6 hover-elevate"
            >
              <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" data-testid="section-pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4" data-testid="badge-pricing">Transparent Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Honest Rates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No hidden fees, no surprises. Just crystal-clear pricing for a sparkling clean home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING.map((plan, i) => (
            <div
              key={plan.name}
              data-testid={`card-pricing-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
              className={`rounded-lg p-8 relative hover-elevate ${
                plan.highlight
                  ? "bg-primary text-white ring-2 ring-primary shadow-lg"
                  : "bg-card border border-card-border"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-white border-accent px-3">
                    Best Value
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-white/75" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  CAD {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-white/80" : "text-accent"}`} />
                    <span className={plan.highlight ? "text-white/90" : "text-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "secondary" : "default"}
                className="w-full"
                onClick={() => handleScroll("#contact")}
                data-testid={`button-pricing-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {plan.cta}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          All prices are estimates. Final pricing depends on home size and specific requirements.
          <button
            onClick={() => handleScroll("#contact")}
            className="text-primary ml-1 underline underline-offset-2 cursor-pointer"
            data-testid="link-custom-quote"
          >
            Request a custom quote
          </button>
          .
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" data-testid="section-about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Badge className="mb-4" data-testid="badge-about">About Us</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Passionate Team That Cares About Your Home
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Saomee Glow Services was founded with a simple mission: to bring joy and cleanliness to Canadian homes. We believe a clean home is a happy home, and we take that seriously.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Our team of dedicated professionals treats every home as if it were their own. We bring experience, heart, and the finest eco-friendly products to every job — ensuring your space not only looks clean, but feels clean.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Years in Business", value: "1+" },
                { label: "Cities Served", value: "12+" },
                { label: "Cleaning Hours", value: "6K+" },
                { label: "5-Star Reviews", value: "100+" },
              ].map(({ label, value }) => (
                <div key={label} data-testid={`stat-about-${label.toLowerCase().replace(/\s/g, "-")}`} className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="button-about-cta"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/about-team.png"
                alt="Saomee Glow Services Team"
                data-testid="img-about-team"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-lg p-4 shadow-lg border border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Certified & Insured</div>
                  <div className="text-xs text-muted-foreground">Fully bonded professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" data-testid="section-testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4" data-testid="badge-testimonials">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real reviews from real Canadians who trust Saomee Glow with their homes.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
            {TESTIMONIALS.map((testimonial, i) => (
              <Card
                key={testimonial.name}
                data-testid={`card-testimonial-${i}`}
                className={`hover-elevate transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ServiceAreasSection() {
  return (
    <section
      data-testid="section-service-areas"
      className="py-16 bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Proudly Serving Across Canada
        </h2>
        <p className="text-white/75 text-base mb-8 max-w-xl mx-auto">
          Although our main area of operation is Brampton, We're expanding every month. Here are the areas we currently cover:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area}
              data-testid={`badge-area-${area.toLowerCase()}`}
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20"
            >
              <MapPin className="w-3.5 h-3.5" />
              {area}
            </div>
          ))}
        </div>
        <p className="text-white/60 text-sm mt-6">
          Don't see your city? <span className="text-white underline cursor-pointer" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>Contact us</span> — we may still be able to help!
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" data-testid="section-faq" className="py-20 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4" data-testid="badge-faq">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before booking with us.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3" data-testid="accordion-faq">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="bg-card rounded-lg border border-card-border px-5"
            >
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="text-left text-base font-medium text-foreground py-5 hover:no-underline"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-muted-foreground text-sm leading-relaxed pb-5"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.service) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and service type.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const recipient = "Gloriaobasu@gmail.com";
    const subject = encodeURIComponent("I would like a Cleaning service");
    const body = encodeURIComponent(`Hello Saomee Glow, I would like a Cleaning Service for my home.\nname: ${formData.name}\nService Type: ${formData.service}`);
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    // window.location.href = mailtoLink;
    window.open(mailtoLink)
    setLoading(false);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section id="contact" data-testid="section-contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Badge className="mb-4" data-testid="badge-contact">Get in Touch</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready for a Sparkling Clean Home?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Fill out the form and we'll get back to you with a free, no-obligation quote within 24 hours. We can't wait to make your home glow!
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  detail: "+1 437 882 2129",
                  sub: "Mon–Sat, 8am–7pm EST",
                  testid: "contact-phone",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  detail: "Gloriaobasu@gmail.com",
                  sub: "We respond within 24 hours",
                  testid: "contact-email",
                },
                {
                  icon: MapPin,
                  title: "Serving",
                  detail: "Brampton & across Canada",
                  sub: "See all service areas above",
                  testid: "contact-location",
                },
                {
                  icon: MessageSquare,
                  title: "Social Media",
                  detail: "@saomeeglowservices",
                  sub: "DM us on Instagram & Facebook",
                  testid: "contact-social",
                },
              ].map(({ icon: Icon, title, detail, sub, testid }) => (
                <div
                  key={title}
                  data-testid={`card-${testid}`}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{title}</div>
                    <div className="text-sm text-foreground">{detail}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">Get Your Free Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
              <div className="grid grid-cols-1">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-name"
                  />
                </div>
                {/* <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (416) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service" className="text-sm font-medium">Service Type *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(v) => setFormData({ ...formData, service: v })}
                    data-testid="select-service"
                  >
                    <SelectTrigger id="service" data-testid="trigger-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Cleaning</SelectItem>
                      <SelectItem value="deep">Deep Cleaning</SelectItem>
                      <SelectItem value="movein">Move-In / Move-Out</SelectItem>
                      <SelectItem value="post-reno">Post-Renovation</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-medium">Additional Details</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your home: number of rooms, special requirements, preferred dates..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
                data-testid="button-submit-quote"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Book an Appointment
                  </span>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to be contacted regarding your cleaning request.
                We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="footer" className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Saomee <span className="text-primary">Glow</span> Services
              </span>
            </div>
            <p className="text-background/65 text-sm leading-relaxed max-w-xs mb-5">
              Bringing professional, eco-friendly house cleaning to Canadian homes. Your satisfaction is our guarantee.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: Facebook, label: "Facebook", testid: "link-facebook", url: "https://www.facebook.com/share/1BCP7uvvq5/?mibextid=wwXIfr" },
                { icon: Instagram, label: "Instagram", testid: "link-instagram", url: "https://www.instagram.com/saomee75_2005?igsh=MTJ4ejVsdTJrdmNrOQ==" },
              ].map(({ icon: Icon, label, testid, url }) => (
                <a
                  key={label}
                  target="_blank"
                  href={url}
                  aria-label={label}
                  data-testid={testid}
                  className="w-9 h-9 rounded-md bg-background/10 flex items-center justify-center hover-elevate"
                >
                  <Icon className="w-4 h-4 text-background/75" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-background font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {["Regular Cleaning", "Deep Cleaning", "Move-In / Move-Out", "Post-Renovation"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => handleScroll("#services")}
                    data-testid={`footer-link-${s.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    className="text-sm text-background/60 cursor-pointer hover:text-background/90 transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-background font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: "About Us", href: "#about" },
                // { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => handleScroll(href)}
                    data-testid={`footer-link-${label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm text-background/60 cursor-pointer hover:text-background/90 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-background font-semibold mb-3 text-sm uppercase tracking-wide">Hours</h4>
              <div className="space-y-1">
                <div className="text-xs text-background/60">Mon – Fri: 7am – 8pm</div>
                <div className="text-xs text-background/60">Saturday: 8am – 6pm</div>
                <div className="text-xs text-background/60">Sunday: 9am – 4pm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Saomee Glow Services. All rights reserved.
          </p>
          <p className="text-xs text-background/50">
            <a href="https://saomeeglowservices.com" className="hover:text-background/80 transition-colors" data-testid="link-domain">
              saomeeglowservices.com
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-background/50 hover:text-background/80 transition-colors" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="text-xs text-background/50 hover:text-background/80 transition-colors" data-testid="link-terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      {/* <PricingSection /> */}
      <AboutSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
