import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import { image_url } from "../../../global_vars";
import ReactPlayer from 'react-player';
import Popup from "reactjs-popup";
import { useInView } from 'react-intersection-observer';

const VideoWithTestimonials = ({ data = {} }) => {
  const [isOpen, setOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: false });
  const videoRef = useRef(null);

  useEffect(() => {
    console.clear();
    if (inView) {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
        setTimeout(() => {
          setShowVideo(false);
        }, 4000);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  const openPopup = () => {
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');
    setOpen(true);
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div style={{ position: "relative" }} className="pb-70" ref={ref}>
      <section
        className="block-sec"
        style={{
          display: showVideo ? "none" : "block",
          backgroundImage: `url(${image_url}${data?.image?.id})`,
          width: "100%",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "10",
        }}
      >
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="vid-area"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    transform: "translate(10px, 50%)"
                  }}
                >
                  <div className="">
                    <>
                      <Popup trigger={<button style={{ border: "none", background: "none", outline: "none" }}
                        className=""
                        open={isOpen}
                        onOpen={openPopup}
                        modal
                        position="center"
                        closeOnDocumentClick={false}
                      >
                        <div className="vid-butn">
                          <span className="icon">
                            <img style={{ width: "80px", height: "80px" }} src="/playButton.svg" alt="Play button" />
                          </span>
                        </div>
                      </button>} position="right center">
                        {(close) => (
                          <>
                            <div className="" onClick={close}>
                              <img src="/closeButton.svg" style={{ width: "40px", height: "40px", outline: "none", float: "right", position: "absolute", right: "-4rem", top: "-4rem" }} />
                            </div>
                            <ReactPlayer
                              url={`${image_url}${data?.video?.id}`}
                              id="thumbnail"
                              className="video modalvideo"
                              width="100%"
                              height="90vh"
                              controls
                              playsinline
                              onEnded={handleVideoEnded}
                            />
                          </>
                        )}
                      </Popup>
                    </>
                  </div>
                  <div className="">
                    <p style={{ fontSize: "28px", color: "white" }}>
                      {data.image_title}
                    </p>
                    <p className="" style={{ color: "white", fontWeight: "bold", fontSize: "32px" }} >
                      {parse(`${data.image_description}`)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`col-lg-3 offset-lg-1 ${isOpen ? "z1" : ""}`}>
                <div className="testim-box">
                  <div className="head-box">
                    <p className="" style={{ color: "white" }} data-wow-delay=".5s">
                      {parse(`${data.brief}`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showVideo && (
        <>
        <video
          loop
          autoPlay
          muted
          playsInline
          className="video w-100"
          onPlay={() => {
            setTimeout(() => {
              handleVideoEnded();
            }, 4000);
          }}
          style={{height:"50vh", objectFit:"cover"}}
          id="myVideo"
          ref={videoRef}
        >
          <source src={`${image_url}${data.video?.id}`} type="video/mp4" />
        </video>
        <div style={{
          position:"absolute",
          top:"0",
          right:"7rem" 
        }}>
                <div className="testim-box">
                  <div className="head-box">
                    <p className="" style={{ color: "white" }} data-wow-delay=".5s">
                      {parse(`${data.brief}`)}
                    </p>
                  </div>
                </div>
              </div>
              </>
      )}
    </div>
    
  );
};

export default VideoWithTestimonials;
