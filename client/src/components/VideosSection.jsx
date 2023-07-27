import React, { useRef } from "react";
import styled from "styled-components";

const VideosSection = ({
  selectedPart,
  setSelectedVideo,
  videosData,
  loading,
}) => {
  const vidRef = useRef(null);

  const handleVideoClick = (link) => {
    setSelectedVideo(link);
  };

  let title = "";
  if (selectedPart === "upperbody") {
    title = "Upper Body";
  } else if (selectedPart === "lowerbody") {
    title = "Lower Body";
  } else if (selectedPart === "shoulder") {
    title = "Shoulders";
  } else if (selectedPart === "arms") {
    title = "Arms";
  } else if (selectedPart === "wrist") {
    title = "Wrists";
  } else if (selectedPart === "neck") {
    title = "Neck";
  }

  const videosHtml = videosData.map((data) => {
    return (
      <div className="video-desc-container">
        <div
          className="video"
          onClick={() => handleVideoClick(`${data.cloudFrontUrl}#t=0.2`)}
        >
          <video playsInline muted loop preload="metadata" ref={vidRef}>
            <source src={`${data.cloudFrontUrl}#t=20`} type="video/mp4" />
          </video>
        </div>
        <div className="desc">{data.description}</div>
      </div>
    );
  });

  return (
    <StyledVideosSection>
      <div className="title">{title}</div>
      {!loading ? videosHtml : null}
      {/* <div className="video-desc-container">
        <div
          className="video"
          onClick={() =>
            handleVideoClick(
              "https://dsq087m1ufx2q.cloudfront.net/abs.mp4#t=0.2"
            )
          }
        >
          <video playsInline muted loop preload="metadata" ref={vidRef}>
            <source
              src="https://dsq087m1ufx2q.cloudfront.net/abs.mp4#t=0.2"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          dicta.
        </div>
      </div>
      <div className="video-desc-container">
        <div className="video">
          {" "}
          <video playsInline muted loop preload="metadata">
            <source
              src="https://dsq087m1ufx2q.cloudfront.net/back.mp4#t=1"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
          fugit.
        </div>
      </div>
      <div className="video-desc-container">
        <div className="video">
          {" "}
          <video playsInline muted loop preload="metadata">
            <source
              src="https://dsq087m1ufx2q.cloudfront.net/biceps.mp4#t=0.2"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          vitae.
        </div>
      </div>
      <div className="video-desc-container">
        <div className="video">
          {" "}
          <video playsInline muted loop preload="metadata">
            <source
              src="https://dsq087m1ufx2q.cloudfront.net/calves.mp4#t=0.2"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
          porro?
        </div>
      </div>
      <div className="video-desc-container">
        <div className="video">
          {" "}
          <video playsInline muted loop preload="metadata">
            <source
              src="https://dsq087m1ufx2q.cloudfront.net/chest.mp4#t=0.2"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
          tenetur.
        </div>
      </div> */}
    </StyledVideosSection>
  );
};

const StyledVideosSection = styled.div`
  flex-basis: 40%;
  background-color: rgb(7, 20, 38);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0px 10px 20px -2px rgb(7, 17, 33);
  .title {
    font-size: 1.7rem;
    font-weight: 300;
    /* padding: 1rem 2rem; */
  }
  .video-desc-container {
    display: flex;
    gap: 1rem;
    .video {
      flex-basis: 50%;
      height: 150px;
      border: 0.2px dotted #ccc;
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .desc {
      flex-basis: 50%;
      font-size: 1.4rem;
      font-weight: 300;
    }
  }
`;

export default VideosSection;
