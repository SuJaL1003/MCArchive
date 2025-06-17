import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
const About = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          About MCArchive
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          <strong>MCArchive</strong> is a one-stop platform designed
          specifically for MCA (Master of Computer Applications) students. It
          offers well-organized semester-wise notes, previous year question
          papers (PYQs), short notes, and placement preparation materials — all
          in one place.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          The goal of MCArchive is to simplify and centralize access to academic
          resources that are often scattered or difficult to find. All content
          is categorized semester-wise and subject-wise, with unit-wise notes to
          make studying easier and more efficient.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Whether you're preparing for your semester exams or gearing up for
          placements, MCArchive is built to support you at every step.
        </p>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-semibold text-blue-500 mb-4">
          About the Creator
        </h2>

        <p className="text-lg leading-relaxed mb-6">
          Hi! I’m <strong>Sujal Mishra</strong>, an MCA student and the creator
          of MCArchive. I built this platform because I personally faced
          challenges in finding structured, easy-to-access notes and reliable
          PYQs during my studies.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          What started as a personal project has now evolved into a full MERN
          stack web application designed to help fellow MCA students like you.
          I’m passionate about using technology to solve real problems and share
          helpful tools with the community.
        </p>

        <p className="text-lg leading-relaxed">
          I hope MCArchive becomes a useful part of your learning journey. If
          you have feedback, suggestions, or want to contribute, feel free to
          reach out through the{" "}
          <a href="/contact" className="text-blue-500 underline">
            Contact Page
          </a>
          .
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/sujal-mishra-5124ba212/" // Replace with your actual LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition duration-300 text-3xl"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/SuJaL1003" // Replace with your actual GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition duration-300 text-3xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
