import { useState } from "react";
import { Menu, X } from "lucide-react";

const Features = () => {
  const featureList = [
    {
      title: "Adopt a tree",
      description:
        "Choose a tree and take its responsibility for growth and well-being",
    },
    {
      title: "Track Growth",
      description:
        "Upload progres photos weekly and monitor trees development over time",
    },
    {
      title: "Earn Rewards",
      description:
        "Get rewarder for constantly updating and taking care of your tree",
    },
    {
      title: "Ecofriendly Community",
      description: "Connect with others, and compete for the Best Grown Tree",
    },
    {
      title: "AI Assistant",
      description:
        "AI Assistant that solve queries about plants and environment",
    },
    {
      title: "Notification and Reminders",
      description:
        "Reminders for watering plant daily and Notification about Events",
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        The Ultimate Value
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {featureList.map((feature, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="text-green-600 text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div>
      <Features />
    </div>
  );
}
