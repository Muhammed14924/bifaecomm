"use client";
import FooterSection from "@/components/footer";
import { useUser } from "@clerk/nextjs";
const Footer = () => {
  const { user } = useUser();
  return (
    user && (
      <div>
        <FooterSection />
      </div>
    )
  );
};

export default Footer;
