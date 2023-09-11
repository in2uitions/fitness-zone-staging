/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import tooltipEffect from "../../common/tooltipEffect";

const WorksStyle1 = () => {
  React.useEffect(() => {
    tooltipEffect();
  }, []);
  return (
    <section className="works section-padding pb-70">
      <h2 style={{display: 'none'}}> &nbsp; </h2>
      <div className="container">
        <div className="row lg-space">
          <div className="col-lg-4 col-md-6">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/1.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 valign">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/2.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/3.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 valign">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/6.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/5.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 valign">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/4.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/7.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 valign">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/8.jpg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="item">
              <Link href="#">
                    <img src="/img/portfolio/works/9.jpg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksStyle1;
