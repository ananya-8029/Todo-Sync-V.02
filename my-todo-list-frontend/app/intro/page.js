import React from "react";
import "./page.css";
import Link from "next/link";
import Particles from '@/Components/Tparticles'

const page = () => {
  return (
    <>
    <Particles/>
      <div id="landing_page">
        
        <div id="content">
          <h2>
            Your personalised TODO List.
          </h2>
          <p>
            "Discover the art of achieving more with less stress through our
            elegant and powerful to-do list web app, crafted to simplify your
            tasks and amplify your productivity."
          </p>
        </div>

        <div className="btns">
          <Link href="/login" className="btn">Login Here</Link>
          <button className="btn">Explore Here</button>
          <Link href="/signup" className="btn">Sign Up Here</Link>
        </div>
      </div>
    </>
  );
};

export default page;
