import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import youtubeThumbnail from "youtube-thumbnail";
import { FaCheck } from "react-icons/fa";
import {data} from "../config";

const Homepage = () => {
  const navigate = useNavigate();

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
        url: videoUrl.url,
        name: videoUrl.name,
        thumbnail: youtubeThumbnail(videoUrl.url).default.url,
      };
    }),
  }));

  const handleSelectVideo = (videoId, monthName) => {
    setSelectedVideos((prevSelectedVideos) => {
      const isSelected = prevSelectedVideos.some(
        (video) => video.id === videoId,
      );
      const isSameMonthSelected = prevSelectedVideos.some(
        (video) => video.monthName === monthName,
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
                : video,
            )
            .filter(
              (video) => video.monthName !== monthName || video.id === videoId,
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
      <div className="flex p-4 items-center px-5">
        <h1 className="flex text-[24px] font-bold">Select Videos</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {thumbnailData.map((item) => (
          <div key={item.monthName} className="p-4 cursor-pointer">
            <h3 className="mb-2">Month: {item.monthName}</h3>
            <div className="flex flex-col wrap ">
              {item.data.map((ele) => (
                <div
                  key={ele.id}
                  onClick={() => handleSelectVideo(ele.id, ele.monthName)}
                  className="flex p-2 w-full border-y gap-3 items-center hover:bg-[#CFCBC0]"
                >
                  <div className=" border h-[20px] w-[20px] text-white">
                    {selectedVideos.some((video) => video.id === ele.id) && (
                      <FaCheck color={"blue"} />
                    )}
                  </div>

                  <img
                    src={ele.thumbnail}
                    height="30"
                    width="60"
                    alt="video thumbnail"
                  />
                  <p>{ele.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mx-10">
        <button
          disabled={selectedVideos.length === 0}
          className="border min-w-[150px] px-4 py-3 bg-[darkblue] text-white font-bold rounded mt-10 hover:bg-[#001F63] disabled:bg-[gray] disabled:opacity-[70%]"
          onClick={() => {
            navigate("/player", { state: selectedVideos });
          }}
        >
          Watch
        </button>
      </div>
    </div>
  );
};

export default Homepage;
