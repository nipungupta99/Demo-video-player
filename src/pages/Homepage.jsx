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
        {
          name: "https://youtu.be/60tjWtmZ2AQ",
          url: "https://youtu.be/60tjWtmZ2AQ",
        },
        {
          name: "https://youtu.be/sKkMXGFI854",
          url: "https://youtu.be/sKkMXGFI854",
        }, {
          name: "https://youtu.be/UhFW3VreGJg",
          url: "https://youtu.be/UhFW3VreGJg",
        },
        {
          name: "https://youtu.be/SXZGzp2IPlo",
          url: "https://youtu.be/SXZGzp2IPlo",
        },
      ],
    },
    {
      monthName: "July",
      videos: [
        {
          name: "https://youtu.be/60tjWtmZ2AQ",
          url: "https://youtu.be/60tjWtmZ2AQ",
        },
        {
          name: "https://youtu.be/sKkMXGFI854",
          url: "https://youtu.be/sKkMXGFI854",
        }, {
          name: "https://youtu.be/UhFW3VreGJg",
          url: "https://youtu.be/UhFW3VreGJg",
        },
        {
          name: "https://youtu.be/SXZGzp2IPlo",
          url: "https://youtu.be/SXZGzp2IPlo",
        },
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
        url: videoUrl.url,
        name: videoUrl.name,
        thumbnail: youtubeThumbnail(videoUrl.url).default.url,
      };
    }),
  }));

  console.log(thumbnailData, "THumbnail data")
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
      <div className="flex justify-center items-center py-5" >
        <h1 className="flex text-[34px] font-bold" >Select Videos</h1>
      </div>
      <div className="grid grid-cols-2">
        {thumbnailData.map((item) => (
          <div key={item.monthName} className="p-4">
            <h3 className="mb-2" >Month: {item.monthName}</h3>
            <div className="flex flex-col wrap ">
              {item.data.map((ele) => (
                <div
                  key={ele.id}
                  onClick={() => handleSelectVideo(ele.id, ele.monthName)}
                  className="flex p-2 w-full border-y gap-3 items-center hover:bg-[#CFCBC0]"
                >

                    <div
                        className=" border h-[20px] w-[20px] text-white"
                    >
                      {selectedVideos.some((video) => video.id === ele.id) && (  <FaCheck color={"blue"} />)}
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
      <div className="flex justify-center" >
        <button
          className="border px-4 py-3 bg-[darkblue] text-white font-bold rounded mt-10 hover:bg-[#001F63]"
          onClick={() => {
            navigate("/player", { state: selectedVideos });
          }}
        >
          Go to comparison
        </button>
      </div>
    </div>
  );
};

export default Homepage;
