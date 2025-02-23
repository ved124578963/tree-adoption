import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is tree adoption?",
      answer:
        "Tree adoption allows individuals to take responsibility for a tree’s growth and maintenance.",
    },
    {
      question: "How can I adopt a tree?",
      answer:
        "Simply choose a tree, register, and start tracking its progress with regular updates.",
    },
    {
      question: "Is there any cost involved?",
      answer:
        "Some tree adoptions may be free, while others could have a small fee for maintenance.",
    },
    {
      question: "How often do I need to upload photos?",
      answer:
        "You should upload a photo every week to track the tree’s growth.",
    },
    {
      question: "Can I adopt multiple trees?",
      answer:
        "Yes, you can adopt as many trees as you like and track each one separately.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto px-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 bg-white p-4 rounded-lg shadow-md text-left"
          >
            <button
              className="w-full text-left font-semibold text-green-700 flex justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
