import React, { useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const [auth] = useAuth();
  console.log(auth);
  
  const courseRef = useRef(null);

  const scrollToCourses = () => {
    courseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-black text-white text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          College Notes for <span className="text-white">Creative Students</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Get to the point notes and material for IPU Courses
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={scrollToCourses}
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-full transition"
          >
            TAKE ME TO NOTES →
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-full transition">
            PREVIOUS YEAR PAPERS →
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-full transition">
            PLACES NEAR YOUR COLLEGE →
          </button>
        </div>
      </section>

      {/* Select Your Course Section */}
      <section
        ref={courseRef}
        className="bg-black text-white py-20 px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Select Your Course ✨
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 justify-center">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">MCA</h3>
            <p className="text-sm text-gray-300">
              Access technical codes, user-friendly code snippets, simplified learning
              resources, and enhanced conceptual clarity.
            </p>
            <div className="mt-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition">
                ➤
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20 px-4">
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
    Universities
  </h2>

  <div className="flex justify-center">
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-96 text-center transition-transform transform hover:scale-105 hover:shadow-3xl">
      <img
        src="https://shorturl.at/99PWh" 
        alt="University"
        className="rounded-2xl mb-6 w-full h-60 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Guru Gobind Singh Indraprastha University</h3>
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
