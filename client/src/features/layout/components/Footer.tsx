"use client";

import { Container } from "@/ui";

const footerSections = [
  {
    title: "Get to Know Us",
    links: ["About Amazon", "Careers", "Press Releases", "Amazon Science"],
  },
  {
    title: "Connect with Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
  {
    title: "Make Money with Us",
    links: [
      "Sell on Amazon",
      "Sell under Amazon Accelerator",
      "Protect and Build Your Brand",
      "Amazon Global Selling",
      "Become an Affiliate",
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      "COVID-19 and Amazon",
      "Your Account",
      "Returns Centre",
      "100% Purchase Protection",
      "Amazon App Download",
      "Help",
    ],
  },
] as const;

export function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="block w-full bg-amazon-navy-mid py-3 text-center text-sm text-white hover:bg-[#485769]"
      >
        Back to top
      </button>

      {/* Main footer links */}
      <div className="bg-amazon-navy-light py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-base font-bold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#DDDDDD] hover:text-white hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-amazon-navy-mid bg-amazon-navy py-6">
        <Container>
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <a href="/" className="text-lg font-bold text-white hover:no-underline">
              amazon<span className="text-amazon-orange">.in</span>
            </a>

            {/* Bottom links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#999999]">
              <a href="#" className="hover:text-white hover:underline">
                Conditions of Use &amp; Sale
              </a>
              <a href="#" className="hover:text-white hover:underline">
                Privacy Notice
              </a>
              <a href="#" className="hover:text-white hover:underline">
                Interest-Based Ads
              </a>
            </div>

            <p className="text-xs text-[#999999]">
              © 1996–2026, Amazon.com, Inc. or its affiliates
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
