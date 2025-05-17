import React, { useRef, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
  ClockIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const courseRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const scrollToCourses = () => {
    courseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigatoToNotes = () => {
    navigate("/mca");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 via-purple-800 to-black text-white text-center py-24 px-4">
        <div className="mb-4">
          <span className="bg-white text-purple-800 px-4 py-1 rounded-full font-medium shadow-md">
            Simplifying MCA, one note at a time.
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-white">MCArchive</span>
        </h1>
        <div className="text-xl md:text-2xl font-light mb-8">
          <Typewriter
            options={{
              strings: [
                "Turning Caffeine into Degrees!",
                "Simplified Notes. Smart Prep.",
                "Made for MCA Students.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={scrollToCourses}
            className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-full transition font-semibold"
          >
            Get Started →
          </button>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-20">
          Why Choose <span className="text-violet-600">MCArchive?</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {/* Notes Card */}
          <div
            data-aos="fade-up"
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-transform hover:-translate-y-2"
          >
            <div className="flex justify-center mb-6">
              <DocumentTextIcon className="w-12 h-12 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Comprehensive Notes
            </h3>
            <p className="text-gray-600 text-sm">
              Best notes to support you while learning and preparing for college
              exams.
            </p>
          </div>

          {/* PYQs Card */}
          <Link
            to="/pyq" // replace with your target route
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-transform hover:-translate-y-2 block"
          >
            <div className="flex justify-center mb-6">
              <ClockIcon className="w-12 h-12 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Previous Year Question Papers
            </h3>
            <p className="text-gray-600 text-sm">
              Understand exam patterns and boost confidence with curated PYQs.
            </p>
          </Link>

          {/* Placement Card */}
          <Link
            to="/placement"
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-transform hover:-translate-y-2"
          >
            <div className="flex justify-center mb-6">
              <BriefcaseIcon className="w-12 h-12 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              Placement Material
            </h3>
            <p className="text-gray-600 text-sm">
              Practice coding, aptitude, and interview questions for top
              companies.
            </p>
          </Link>
        </div>
      </section>

      <section
        ref={courseRef}
        className="bg-white text-gray-900 py-24 px-4 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Select Your Course <span className="text-yellow-400">✨</span>
        </h2>

        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-10 w-full max-w-sm border border-gray-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 mx-auto">
            <div className="flex justify-center mb-6">
              <AcademicCapIcon className="w-14 h-14 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">MCA</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Unlock full access to{" "}
              <span className="font-semibold text-violet-600">
                code snippets
              </span>
              , concept notes, previous year papers, and placement prep — all in
              one place.
            </p>
            <div className="mt-6">
              <button
                onClick={navigatoToNotes}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full transition text-sm font-semibold shadow-md"
              >
                Explore MCA →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* University Card (optional) */}
      <section className="bg-gray-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Universities
        </h2>

        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 w-96 text-center transition-transform transform hover:scale-105 hover:shadow-3xl">
            <img
              src="https://shorturl.at/99PWh"
              alt="University"
              className="rounded-2xl mb-6 w-full h-60 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Guru Gobind Singh Indraprastha University
            </h3>
            <p className="text-sm text-gray-600">
              Explore notes, papers, and places around your college with ease.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
