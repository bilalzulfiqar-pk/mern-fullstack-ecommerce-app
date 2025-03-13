import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaStoreAlt } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { IoAirplaneSharp } from "react-icons/io5";

const ExtraServicesSection = () => {
  const cards = [
    {
      img: "/banners/1.jpg",
      text: "Source from Industry Hubs",
      icon: <BiSearch className="text-2xl text-black" />,
    },
    {
      img: "/banners/2.jpg",
      text: "Customize Your Products",
      icon: <FaStoreAlt className="text-2xl text-black" />,
    },
    {
      img: "/banners/3.jpg",
      text: "Fast, reliable shipping by ocean or air ",
      icon: <IoAirplaneSharp className="text-2xl text-black" />,
    },
    {
      img: "/banners/4.jpg",
      text: "Product monitoring and inspection",
      icon: <GiCheckedShield className="text-2xl text-black" />,
    },
  ];

  return (
    <div>
      <div className="mx-5 min-[1080px]:mx-32 my-7">
        <div className="mb-3">
          <p className="font-semibold text-3xl">Our extra services</p>
        </div>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-[560px]:grid-cols-1 gap-5">
          {cards.map((card, index) => (
            <div className="w-full max-w-[448px] border-1 h-54 justify-self-center border-[#E0E0E0] rounded-lg overflow-hidden bg-white">
              {/* Image Section */}
              <div className="relative h-[60%]">
                <img
                  src={card.img}
                  alt="Services"
                  className="w-full h-full object-cover object-top"
                />
                {/* Search Icon */}
                <div className="absolute bottom-0 translate-y-1/2 right-4 bg-[#D1E7FF] p-4 rounded-full border-2 border-white">
                  {card.icon}
                </div>
              </div>

              {/* Text Section */}
              <div className="p-3">
                <p className="text-lg font-semibold w-[70%] max-[450px]:text-base">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtraServicesSection;
