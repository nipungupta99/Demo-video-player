import youtubeThumbnail from "youtube-thumbnail";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

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
          <h1>Selected Videos</h1>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {SelectedVideos.map((item) => {
              return (
                <div>
                  <ReactPlayer url={item.url} height="350px" width="600px" />
                </div>
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
