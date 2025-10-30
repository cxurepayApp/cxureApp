import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  MessageCircle,
  // CreditCard,
  Users,
  ArrowRight,
  CheckCircle,
  icons,
} from "lucide-react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import MobileNavBar from "../../components/layout/MobileNavBar";
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
        <div className="max-w-7xl flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-5xl sm:text-5xl  lg:text-8xl font-bold text-gray-900 mb-6 w-[90%] sm:w-[100%] md:w-[600px] lg:w-[700px] mt-10 lg:mt-0 mx-auto lg:mx-0 leading-tight">
            The Future of <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {rotatingTexts[currentText]}
            </span>
          </h1>

          <p className="lg:text-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Secure, transparent, and reliable escrow platform for freelancers,
            businesses, and anyone who needs safe online transactions with
            built-in dispute resolution.
          </p>

          <div className="flex flex-col sm:flex-row lg:justify-start items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>

        <div className="flex justify-center lg:justify-end mt-16 md:mt-20 lg:mt-0">
          <img
            src="/images/secure_Wallet Glyph Style Blue Colour.svg"
            alt=""
            width={800}
            height={800}
            className="md:mt-[100px] mt-[10px] lg:mt-0 transition-all duration-300"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CxurePay?
            </h2>
            <p className="lg:text-xl text-base sm:text-lg md:text-xl text-gray-600">
              Built for security, designed for simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#e2e4fa] rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="bg-blue-300 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Escrow
              </h3>
              <p className="text-gray-600">
                Your funds are safely held until both parties fulfill their
                obligations
              </p>
              <img src="/images/cxure.svg" alt="" className="mt-6 " />
            </div>

            <div className="bg-white rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden">
              {/* Background image (now decorative, behind everything) */}
              <img
                src="/images/bg.svg"
                alt=""
                className="absolute top-0 right-0 w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <MessageCircle className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">
                Real-time Chat
              </h3>
              <p className="text-gray-600 relative z-10">
                Communicate directly with buyers and sellers within each
                transaction
              </p>
              <img
                src="/images/realchat.svg"
                alt=""
                className="mt-6 relative z-10"
              />
            </div>

            <div className="bg-[#d5e8fd] rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="bg-[#ffbd39] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-[#fd9518]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Milestone System
              </h3>
              <p className="text-gray-600">
                Break down projects into manageable milestones with separate
                payments
              </p>
              <img src="/images/milesteon.svg" alt="" className="mt-6" />
            </div>

            <div className="bg-white rounded-2xl px-8 pt-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Multi-Category
              </h3>
              <p className="text-gray-600">
                Freelancing, procurement, and general trade - all in one
                platform
              </p>
              <img src="/images/general.svg" alt="" className="mt-6 " />
            </div>

          <div>
            {}
          </div>

               
                

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
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
      </section>

      {/* ------------------------------------------ */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
