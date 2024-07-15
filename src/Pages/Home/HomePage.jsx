// import img from "..//../assets/ionela-mat-DQzGtBbtMa8-unsplash.jpg"

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
          <p className="mb-5 text-center">
          <span className="text-2xl font-semibold">&quot;Organize Your Life, One Task at a Time&quot;</span><br />
           Please Register first to add your working Schedule.
          </p>
          <Link to="/signIn" className="btn w-1/2 btn-primary">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
