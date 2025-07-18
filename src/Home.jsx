import React from "react";
import Login from "./Login";

const Home = () => {
  return (
    <section className="pt-[120px] w-full min-h-screen bg-[green]">
      <div className="flex items-center justify-center h-full">
        <Login />
      </div>
    </section>
  );
};

export default Home;
