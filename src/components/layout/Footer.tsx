import { Link } from "react-router-dom";

const Footer = () => {
  const navigation = [
    { title: "Company", links: ["About Us", "Careers"] },
    {
      title: "Explore",
      links: [
        "Personal Banking",
        "Build Credit",
        "BVN Registration",
        "Send Money",
        "Cards",
        "CxurePay+",
        "Dollar Accounts",
      ],
    },
    { title: "Community", links: ["Referrals", "Carrers"] },
    { title: "Resources", links: ["FAQs", "Blog", "Contact Us"] },
    {
      title: "Legal",
      links: [
        "All CxurePay Policies",
        "Terms of Service",
        "Privacy Policy",
        "E-consent Agreement",
        "Card Purchase Agreement",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 items-start">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-8 lg:mb-0">
            <img
              src="/icons/CXLOGOWHITE.svg"
              alt="CxurePay Logo"
              width={150}
              height={20}
            />
          </div>

          {/* Navigation Columns */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm ">
            {navigation.map((section) => (
              <section key={section.title}>
                <h3 className="text-white font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="#"
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        {/* Divider + Bottom Text */}
        <hr className="border-gray-700 my-8" />
        <p className="text-gray-500 text-sm text-center">
          © <time dateTime={`${new Date().getFullYear()}`}>{new Date().getFullYear()}</time> CxurePay. All rights reserved. Secure payments made simple.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
