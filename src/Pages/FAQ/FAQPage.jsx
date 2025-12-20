import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I join a contest?",
      answer:
        "Sign up or log in, browse the contests, and click 'Join' on the contest you like.",
    },
    {
      question: "Is participation free?",
      answer:
        "Yes, most contests are free to join. Some premium contests may require payment.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are chosen based on the contest criteria specified by the creator, which may include votes, judges, or automated scoring.",
    },
    {
      question: "How do I claim my prize?",
      answer:
        "After winning, follow the instructions on the contest page or contact the organizer to claim your prize.",
    },
    {
      question: "Can I participate in multiple contests at the same time?",
      answer:
        "Yes, you can join multiple contests simultaneously as long as you meet the requirements.",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-br rounded-3xl mb-[100px] from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          FAQ - Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-indigo-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
