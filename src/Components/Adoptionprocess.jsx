const AdoptionProcess = () => {
  const steps = [
    {
      title: "Choose a Tree",
      description:
        "Browse and select a tree to adopt based on your preference.",
    },
    {
      title: "Register",
      description:
        "Sign up and complete the adoption process with basic details.",
    },
    {
      title: "Upload First Photo",
      description: "Take a picture of the tree at the time of adoption.",
    },
    {
      title: "Track Growth",
      description:
        "Upload progress photos every week to monitor your tree's development.",
    },
    {
      title: "Contribute & Share",
      description: "Encourage others to adopt by sharing your journey.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        How to Adopt a Tree
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-green-100 p-6 shadow-lg rounded-lg text-center"
          >
            <div className="text-green-600 text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdoptionProcess;
