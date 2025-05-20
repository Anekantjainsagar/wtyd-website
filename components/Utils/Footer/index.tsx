import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import CTA from "./CTA";

interface SocialLink {
  icon: IconType;
  route: string;
}

interface LinkItem {
  text: string;
  route: string;
}

interface FooterSection {
  title: string;
  description?: string;
  links?: LinkItem[];
  socialLinks?: SocialLink[];
}

const Footer = () => {
  const aboutInfo: FooterSection = {
    title: "ABOUT",
    description:
      "Whyd - We Tech Your Dreams. We collaborate with you to understand your business, identify your needs, and define the scope of the project.",
    socialLinks: [
      { icon: FaFacebookF, route: "/" },
      { icon: FaTwitter, route: "/" },
      { icon: FaYoutube, route: "/" },
      { icon: FaInstagram, route: "/" },
    ],
  };

  const quickLinks: FooterSection = {
    title: "QUICK LINKS",
    links: [
      { text: "Why Us?", route: "/#why-us" },
      { text: "Approach", route: "/#approach" },
      { text: "Feedback", route: "/#feedback" },
    ],
  };

  const resources: FooterSection = {
    title: "RESOURCES",
    links: [
      { text: "About us", route: "/about" },
      { text: "Our Team", route: "/team" },
      { text: "Contact us", route: "/contact" },
    ],
  };

  const sections: FooterSection[] = [
    aboutInfo,
    quickLinks,
    resources,
  ];

  return (
    <div className="bg-[#FAF8FF] mt-[35vh] md:mt-[18vw] py-[8vw] md:py-[4vw] mx-auto px-[5vw] md:px-[3vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[8vw] text-gray-600 relative">
      <CTA />
      {sections.map((section, index) => (
        <div key={index}>
          <div className="font-semibold md:text-start text-center text-xl text-newYellow mb-2">
            {section.title}
          </div>
          {section.description && (
            <div className="mb-4 text-lg md:text-start text-center">
              {section.description}
            </div>
          )}
          {section.links && (
            <div>
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex} className="mb-2 md:text-start text-center">
                  <Link
                    href={link.route}
                    className="hover:text-newYellow text-lg md:text-start text-center"
                  >
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {section.socialLinks && (
            <div className="flex space-x-6 items-center md:items-start md:justify-start justify-center">
              {section.socialLinks.map((social, socialIndex) => (
                <Link
                  key={socialIndex}
                  href={social.route}
                  className="text-gray-400 hover:text-newYellow"
                >
                  <social.icon className="h-8 w-8" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Footer;
