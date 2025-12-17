import React from "react";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-linear-to-br rounded-3xl mb-[100px] py-4 from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6">
          About ContestHub
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          ContestHub is a modern contest management platform designed to bring
          creators and participants together. Our goal is to provide a simple,
          transparent, and engaging way to create contests, showcase talent, and
          reward creativity.
        </p>

        <p className="text-gray-600 text-base leading-relaxed mb-8">
          Whether you are a designer, writer, gamer, or idea-maker, ContestHub
          helps you explore exciting challenges, participate in competitions,
          and gain recognition for your skills. We believe creativity deserves
          the right stage — and ContestHub is built to be that stage.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              Empower creators by giving them a fair and inspiring platform to
              compete and grow.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              Build a global community where creativity and innovation are
              celebrated.
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm">
              Transparency, creativity, inclusiveness, and continuous
              improvement.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm text-gray-500">
            This project is created as part of an academic assignment to
            demonstrate front-end development skills and modern UI design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
