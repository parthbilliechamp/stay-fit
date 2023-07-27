import React, { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const FocusedVideo = ({ selectedVideo, setSelectedVideo }) => {
  const vidRef = useRef(null);

  const escFunction = (event) => {
    if (event.key === "Escape") {
      setSelectedVideo("");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  if (!selectedVideo) {
    return null;
  }

  const handleVideoClick = (event) => {
    event.stopPropagation();
  };

  const handleBackdropClick = (event) => {
    setSelectedVideo("");
  };

  return (
    <StyledFocusedVideoWrapper onClick={handleBackdropClick}>
      <StyledFocusedVideo onClick={handleVideoClick}>
        <video
          autoPlay
          playsInline
          loop
          controls="controls"
          preload="metadata"
          ref={vidRef}
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
      </StyledFocusedVideo>
    </StyledFocusedVideoWrapper>
  );
};

const StyledFocusedVideoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 110%;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.579);
  cursor: pointer;
`;

const StyledFocusedVideo = styled.div`
  position: absolute;
  background: black;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default FocusedVideo;
