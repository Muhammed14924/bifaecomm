"use client";

import { BifaLogo } from "@/app/_components/bifa-logo";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUp,
  Send,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const footerLinks = [
  {
    title: "تسوق معنا",
    links: [
      { label: "الإلكترونيات", href: "/products?category=electronics" },
      { label: "أزياء رجالية", href: "/products?category=men" },
      { label: "أزياء نسائية", href: "/products?category=women" },
      { label: "المنزل والمطبخ", href: "/products?category=home" },
      { label: "العروض الأسبوعية", href: "/offers" },
    ],
  },
  {
    title: "خدمة العملاء",
    links: [
      { label: "مركز المساعدة", href: "/help" },
      { label: "تتبع الطلب", href: "/track-order" },
      { label: "طرق الشحن", href: "/shipping" },
      { label: "سياسة الاستبدال", href: "/returns" },
      { label: "اتصل بنا", href: "/contact" },
    ],
  },
  {
    title: "عن بيفا",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "الشروط والأحكام", href: "/terms" },
      { label: "المدونة", href: "/blog" },
      { label: "الوظائف", href: "/careers" },
    ],
  },
];

const features = [
  {
    icon: Truck,
    title: "توصيل سريع",
    desc: "لكل أنحاء المملكة",
  },
  {
    icon: ShieldCheck,
    title: "دفع آمن",
    desc: "تشفير كامل للبيانات",
  },
  {
    icon: RotateCcw,
    title: "استبدال مرن",
    desc: "خلال 14 يوم عمل",
  },
  {
    icon: Headphones,
    title: "دعم فني",
    desc: "متواجدون لخدمتكم",
  },
];

export default function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-[#f6f1ea] pt-16 dark:bg-[#0a0a0a] overflow-hidden">
      {/* Top decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#8a1818] to-transparent opacity-50" />

      {/* Newsletter & Features Part */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              اشترك في نشرتنا الإخبارية <br />
              <span className="text-[#8a1818]">واحصل على خصم 10%</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              كن أول من يعرف عن أحدث العروض والمنتجات الحصرية والخصومات
              الموسمية.
            </p>
            <div className="flex max-w-md items-center gap-3">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full rounded-xl border-gray-200 bg-gray-50 px-5 py-3 text-sm focus:border-[#8a1818] focus:outline-none focus:ring-1 focus:ring-[#8a1818] dark:border-zinc-800 dark:bg-zinc-900/50"
              />
              <button className="flex items-center gap-2 rounded-xl bg-[#8a1818] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6d1313] active:scale-95 shadow-lg shadow-[#8a1818]/20">
                اشترك
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 transition duration-300 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 dark:hover:shadow-none"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#8a1818]/10 text-[#8a1818] transition group-hover:bg-[#8a1818] group-hover:text-white">
                  <feature.icon className="size-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent" />
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <BifaLogo />
            <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              متجر بيفا الإلكتروني، وجهتك الأولى للتسوق العصري. نحن نؤمن بأن
              الجودة والخدمة الممتازة هي سر نجاحنا. نسعى دائماً لتوفير أفضل
              المنتجات بأسعار تنافسية.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: Facebook, href: "#", color: "hover:text-blue-600" },
                { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                { icon: Twitter, href: "#", color: "hover:text-sky-500" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={social.href}
                  className={cn(
                    "text-gray-400 transition-colors",
                    social.color,
                  )}
                >
                  <social.icon className="size-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerLinks.map((column, i) => (
            <div key={i} className="space-y-6">
              <h4 className="text-base font-bold text-gray-900 dark:text-white relative inline-block">
                {column.title}
                <span className="absolute -bottom-1 left-0 h-1 w-6 bg-[#8a1818] rounded-full" />
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#8a1818] dark:text-gray-400 dark:hover:text-[#8a1818]"
                    >
                      <ChevronRight className="size-3 text-[#8a1818] transition group-hover:translate-x-1 rtl:rotate-180" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Strip */}
      <div className="bg-[#8a1818] text-white py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="size-6" />
              </div>
              <div>
                <p className="text-xs opacity-75">تحتاج مساعدة؟ اتصل بنا</p>
                <p className="text-lg font-bold font-sans">966+ 55 555 5555</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="size-6" />
              </div>
              <div>
                <p className="text-xs opacity-75">أرسل لنا استفسارك</p>
                <p className="text-lg font-bold font-sans">support@bifa.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="size-6" />
              </div>
              <div>
                <p className="text-xs opacity-75">موقعنا</p>
                <p className="text-lg font-bold">
                  الرياض، المملكة العربية السعودية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-100 dark:border-zinc-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} بيفا. جميع الحقوق محفوظة. تم التطوير
            بصناعة محلية 🇸🇦
          </p>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition duration-500">
            {/* Mock payment icons */}
            <div className="h-4 w-10 bg-gray-400 rounded-sm" title="Visa" />
            <div
              className="h-4 w-10 bg-gray-400 rounded-sm"
              title="Mastercard"
            />
            <div className="h-4 w-10 bg-gray-400 rounded-sm" title="STC Pay" />
            <div className="h-4 w-10 bg-gray-400 rounded-sm" title="Mada" />
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-99 flex size-12 items-center justify-center rounded-full bg-[#8a1818] text-white shadow-2xl transition hover:bg-[#6d1313] hover:scale-110 active:scale-95 shadow-[#8a1818]/30"
        >
          <ArrowUp className="size-6" />
        </motion.button>
      )}
    </footer>
  );
}
