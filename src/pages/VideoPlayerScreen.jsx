import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlayerComponent from "../components/PlayerComponent";

export default function VideoPlayerScreen() {
  const [SelectedVideos, setSelectedVideos] = useState([]);

  let location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    setSelectedVideos(location.state);
  }, [location]);

  return (
    <div>
      {SelectedVideos ? (
        <div>
          <div className="flex justify-center items-center py-5">
            <h1 className="flex text-[34px] font-bold">Selected Videos</h1>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-${SelectedVideos.length}  p-5 gap-5`}
          >
            {SelectedVideos.map((item) => {
              return (
                <PlayerComponent
                  url={item.url}
                  itemsCount={SelectedVideos.length}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>Please select Videos</h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to selection screen
          </button>
        </div>
      )}
    </div>
  );
}
