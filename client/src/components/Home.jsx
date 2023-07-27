import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Anatomy from "./Anatomy";
import VideosSection from "./VideosSection";
import styled from "styled-components";
import FocusedVideo from "./FocusedVideo";
import axios from "axios";

const Home = () => {
  const [selectedPart, setSelectedPart] = useState("upperbody");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_WORKOUT_BASE_URL}/${selectedPart}`
        );
        // setVideosData([]);
        setVideosData([...response.data]);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    setLoading(true);
    getData();
  }, [selectedPart]);

  return (
    <StyledHome>
      <Navbar />
      <StyledAnatomyVideosSection>
        <Anatomy setSelectedPart={setSelectedPart} />
        <VideosSection
          selectedPart={selectedPart}
          setSelectedVideo={setSelectedVideo}
          videosData={videosData}
          loading={loading}
        />
      </StyledAnatomyVideosSection>
      <FocusedVideo
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </StyledHome>
  );
};

const StyledHome = styled.div`
  height: 92vh;
  position: relative;
`;

const StyledAnatomyVideosSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  gap: 1rem;
  overflow: hidden;
`;

export default Home;
