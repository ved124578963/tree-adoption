const Features = () => {
    const features = [
      {
        title: "Adopt a Tree 🌱",
        description: "Choose a tree and take responsibility for its growth and well-being.",
      },
      {
        title: "Track Growth 📸",
        description: "Upload progress photos weekly and monitor the tree’s development over time.",
      },
      {
        title: "Earn Rewards 🎉",
        description: "Get rewarded for consistently updating and taking care of your tree.",
      },
      {
        title: "Community & Challenges 🌍",
        description: "Join challenges, connect with others, and compete for the ‘Best Grown Tree’ award.",
      },
    ];
  
    return (
      <section className="bg-white py-16 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-700">Why Join Us?</h2>
          <p className="text-gray-600 mt-2">
            Our platform makes tree adoption fun, rewarding, and impactful.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-green-100 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-800">{feature.title}</h3>
                <p className="text-gray-700 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  