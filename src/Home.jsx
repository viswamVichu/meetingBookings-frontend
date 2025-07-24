import React from "react";
import Login from "./Login";
import Home_Page from "./Home_Page";

const Home = () => {
  return (
    <section className="relative pt-[120px] w-full min-h-screen">
      <div className="flex items-center justify-center h-full">
        {/* Your content here */}
        <Home_Page img="https://images.pexels.com/photos/51947/tuscany-grape-field-nature-51947.jpeg" />
      </div>
    </section>
  );
};

export default Home;
