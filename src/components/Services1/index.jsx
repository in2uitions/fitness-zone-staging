import React from "react";
import Split from "../Split";
import Link from "next/link";

const Services1 = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="sec-head custom-font text-center">
          <Split>
            <h3 className="wow words chars splitting" data-splitting>
            FITNESS MASTERS.
            </h3>
          </Split>
          <h6 className="wow fadeIn" data-wow-delay=".5s">
          TRAIN WITH THE
          </h6>
        </div>
        <div className="row">
          <div
            className="col-lg-3 col-md-6 item-box bg-img wow fadeInLeft"
            data-wow-delay=".3s"
            style={{ backgroundImage: "url(/GRIT.jpeg)" }}
          >
            <h4 className="custom-font">
              Best Of <br /> Our Features
            </h4>
            <Link href="/about/about-dark">
              <a className="btn-curve btn-bord btn-lit mt-40">
                <span>See All Services</span>
              </a>
            </Link>
          </div>
          <div
            className="col-lg-3 col-md-6 item-box wow fadeInLeft"
            data-wow-delay=".5s"
            style={{
              backgroundImage: "url(/elderly.jpeg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100%",
            }}
          >
            <span className="icon pe-7s-paint-bucket"></span>
            <h6>Graphic Design</h6>
            <p>
              Tempore corrupti temporibus fuga earum asperiores fugit
              laudantium.
            </p>
          </div>
          <div
            className="col-lg-3 col-md-6 item-box wow fadeInLeft"
            data-wow-delay=".7s"
            style={{
              backgroundImage: "url(/Body-comba.jpeg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100%",
            }}
          >
            <span className="icon pe-7s-phone"></span>
            <h6>
              Web &amp; <br /> Mobile Design
            </h6>
            <p>Tempore corrupti temporibus fuga earum asperiores fugit.</p>
          </div>
          <div
            className="col-lg-3 col-md-6 item-box wow fadeInLeft"
            data-wow-delay=".9s"
            style={{
              backgroundImage: "url(/circuit.jpeg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100%",
            }}
          >
            <span className="icon pe-7s-display1"></span>
            <h6>
              Social <br /> media Marketing
            </h6>
            <p>Tempore corrupti temporibus fuga earum asperiores fugit.</p>
          </div>
        </div>
      </div>
      <div className="half-bg bottom"></div>
    </section>
  );
};

export default Services1;
