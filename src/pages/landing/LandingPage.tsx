import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // 👈 added
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import MobileNavBar from "../../components/layout/MobileNavBar";
import CardDetails from "../../components/UI/productCardDetails";
import ProductCard from "../../components/UI/ProductCard";

const LandingPage = () => {
  const [currentText, setCurrentText] = useState(0);
  const rotatingTexts = [
    "Secure Escrow Payments",
    "Freelancer Milestones",
    "Business Procurement",
    "Secure Transactions",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div>
        <nav className="lg:block md:hidden hidden">
          <Navbar />
        </nav>
        <nav className="block md:block lg:hidden">
          <MobileNavBar />
        </nav>
      </div>

      {/* ------------------------------------------ */}
      {/* Hero Section */}
      <section className="pt-24 pb-20 sm:px-6 flex flex-col md:flex-col lg:flex-row items-center justify-between lg:px-32">
        {/* TEXT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-7xl flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-5xl  lg:text-8xl font-bold text-gray-900 mb-6 w-[90%] sm:w-[100%] md:w-[600px] lg:w-[700px] mt-10 lg:mt-0 mx-auto lg:mx-0 leading-tight"
          >
            The Future of <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {rotatingTexts[currentText]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:text-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed p-4"
          >
            Secure, transparent, and reliable escrow platform for freelancers,
            businesses, and anyone who needs safe online transactions with
            built-in dispute resolution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row lg:justify-start items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Protecting Your Payments</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/login"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              I Have an Account
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center lg:justify-end mt-16 md:mt-20 lg:mt-0"
        >
          <motion.img
            src="/images/secure_Wallet Glyph Style Blue Colour.svg"
            alt=""
            width={800}
            height={800}
            className="md:mt-[100px] mt-[10px] lg:mt-0 transition-all duration-300"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ------------------------------------------ */}
      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col items-center ax-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Why Choose CxurePay?
            </h2>
            <p className="lg:text-xl text-base sm:text-lg md:text-xl text-gray-600">
              Built for security, designed for simplicity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: false }}
            className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mx-auto max-w-7xl "
          >
            {CardDetails.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[75vw]"
                >
                  <ProductCard {...card} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#333333] mb-6">
            Ready to Secure Your Transactions?
          </h2>
          <p className="lg:text-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            Join thousands of users who trust CxurePay for their online payments
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </motion.section>

      {/* ------------------------------------------ */}
      <Footer />
    </div>
  );
};

export default LandingPage;
