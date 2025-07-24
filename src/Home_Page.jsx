import React from "react";

const Home_Page = ({ img }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
      style={{ backgroundImage: `url(${img})` }}
    />
  );
};

export default Home_Page;
