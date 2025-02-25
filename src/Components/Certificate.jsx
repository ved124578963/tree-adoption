import React from "react";

const Certificate = ({ user }) => {
  const getCertificateTitle = () => {
    if (user.totalTrees >= 20) return "Gold Conservationist";
    if (user.totalTrees >= 10) return "Silver Grower";
    if (user.totalTrees >= 5) return "Bronze Planter";
    if (user.monthsOfTracking >= 12) return "Sustainability Champion";
    if (user.monthsOfTracking >= 6) return "Eco Protector";
    if (user.monthsOfTracking >= 3) return "Green Guardian";
    return "Tree Adoption Certificate";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl text-center">
      <CardContent>
        <h2 className="text-2xl font-bold text-green-600">
          {getCertificateTitle()}
        </h2>
        <p className="text-lg text-gray-700 mt-2">Presented to</p>
        <h3 className="text-3xl font-semibold text-gray-900 mt-1">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500">
          For their dedication to tree adoption and sustainability
        </p>
        <p className="text-md text-gray-600 mt-3">
          Total Trees Adopted: <strong>{user.totalTrees}</strong>
        </p>
        <p className="text-md text-gray-600">
          Tracking Period: <strong>{user.monthsOfTracking} months</strong>
        </p>
        <Button className="mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Download Certificate
        </Button>
      </CardContent>
    </Card>
  );
};

export default Certificate;
