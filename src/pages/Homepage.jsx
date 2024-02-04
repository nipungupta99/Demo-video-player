import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import youtubeThumbnail from "youtube-thumbnail";
import { FaCheck } from "react-icons/fa";

const Homepage = () => {
  const navigate = useNavigate();
  const data = [
    {
      monthName: "June",
      videos: [
        "https://youtu.be/60tjWtmZ2AQ",
        "https://youtu.be/sKkMXGFI854",
        "https://youtu.be/UhFW3VreGJg",
        "https://youtu.be/SXZGzp2IPlo",
      ],
    },
    {
      monthName: "July",
      videos: [
        "https://youtu.be/60tjWtmZ2AQ",
        "https://youtu.be/sKkMXGFI854",
        "https://youtu.be/UhFW3VreGJg",
        "https://youtu.be/SXZGzp2IPlo",
      ],
    },
  ];

  // State to keep track of selected videos
  const [selectedVideos, setSelectedVideos] = useState([]);

  // Enhanced unique ID generation based on month and index
  const thumbnailData = data.map((month, monthIndex) => ({
    monthName: month.monthName,
    data: month.videos.map((videoUrl, videoIndex) => {
      // Generate a unique ID
      const id = `month${monthIndex}-video${videoIndex}`;
      return {
        id,
        monthName: month.monthName,
        url: videoUrl,
        thumbnail: youtubeThumbnail(videoUrl).default.url,
      };
    }),
  }));

  const showPreview = () => {
    alert("hello");
  };

  const handleSelectVideo = (videoId, monthName) => {
    setSelectedVideos((prevSelectedVideos) => {
      const isSelected = prevSelectedVideos.some(
        (video) => video.id === videoId
      );
      const isSameMonthSelected = prevSelectedVideos.some(
        (video) => video.monthName === monthName
      );

      // Deselect if already selected
      if (isSelected) {
        return prevSelectedVideos.filter((video) => video.id !== videoId);
      } else {
        // Check if trying to select from the same month
        if (isSameMonthSelected) {
          // Replace the video from the same month with the new selection
          return prevSelectedVideos
            .map((video) =>
              video.monthName === monthName
                ? thumbnailData
                    .flatMap((item) => item.data)
                    .find((video) => video.id === videoId)
                : video
            )
            .filter(
              (video) => video.monthName !== monthName || video.id === videoId
            );
        } else {
          // Add new selection if total selected videos are less than 2 and not from the same month
          if (prevSelectedVideos.length < 2) {
            const videoToAdd = thumbnailData
              .flatMap((item) => item.data)
              .find((video) => video.id === videoId);
            return [...prevSelectedVideos, videoToAdd];
          }
        }
      }

      // Return previous state if no changes are made
      return prevSelectedVideos;
    });
  };

  return (
    <div>
      <h1>Homepage</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {thumbnailData.map((item) => (
          <div key={item.monthName} style={{ width: "45vw", margin: "10px" }}>
            <h3>{item.monthName}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {item.data.map((ele) => (
                <div
                  key={ele.id}
                  onClick={() => handleSelectVideo(ele.id, ele.monthName)}
                >
                  {selectedVideos.some((video) => video.id === ele.id) && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "green",
                        padding: "5px",
                        color: "white",
                      }}
                    >
                      <FaCheck />
                    </div>
                  )}
                  <img
                    src={ele.thumbnail}
                    height="200"
                    width="300"
                    alt="video thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            navigate("/player", { state: selectedVideos });
          }}
        >
          Go to comparison
        </button>
      </div>
      {JSON.stringify(selectedVideos)}
    </div>
  );
};

export default Homepage;
