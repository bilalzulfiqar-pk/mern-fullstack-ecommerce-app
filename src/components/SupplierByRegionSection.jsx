import React from "react";

const SupplierByRegionSection = () => {
  const countries = [
    { name: "Arabic Emirates", url: "shopname.ae", flag: "/flags/uae.png" },
    { name: "Australia", url: "shopname.ae", flag: "/flags/australia.png" },
    { name: "United States", url: "shopname.ae", flag: "/flags/usa.png" },
    { name: "Russia", url: "shopname.ru", flag: "/flags/russia.png" },
    { name: "Italy", url: "shopname.it", flag: "/flags/italy.png" },
    { name: "Denmark", url: "denmark.com.dk", flag: "/flags/denmark.png" },
    { name: "France", url: "shopname.com.fr", flag: "/flags/france.png" },
    { name: "Germany", url: "shopname.ae", flag: "/flags/germany.png" },
    { name: "China", url: "shopname.ae", flag: "/flags/china.png" },
    { name: "Great Britain", url: "shopname.co.uk", flag: "/flags/uk.png" },
  ];

  return (
    <div>
      <div className="mx-5 min-[1000px]:mx-10 mt-7 pb-4 bg-[#F9FAFB]">
        <div className="mb-3">
          <p className="font-semibold text-3xl">Suppliers by region</p>
        </div>
        <div>
          <div className="bg-gray-50 py-6">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[74.4rem]:grid-cols-5 gap-6">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-8 h-6 object-cover"
                  />
                  <div>
                    <p className="text-black font-medium leading-4">
                      {country.name}
                    </p>
                    <p className="text-gray-500 text-sm">{country.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierByRegionSection;
