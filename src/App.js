
import youtubeThumbnail from "youtube-thumbnail";
import { useState } from "react";
import ReactPlayer from "react-player";
export default function App() {
  const [SelectedVideos, setSelectedVideos] = useState([]);
  const data = [
    "https://youtu.be/60tjWtmZ2AQ",
    "https://youtu.be/sKkMXGFI854",
    "https://youtu.be/UhFW3VreGJg",
    "https://youtu.be/SXZGzp2IPlo",
  ];

  let thumbnailData = data.map((item) => {
    return {
      url: item,
      thumbnail: youtubeThumbnail(item),
    };
  });

  const updateSelection = (item) => {
    // Check if the item is already selected
    if (SelectedVideos.includes(item)) {
      // Remove the item from the selection
      setSelectedVideos(
        SelectedVideos.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      // Add the item to the selection if less than 2 items are already selected
      if (SelectedVideos.length < 2) {
        setSelectedVideos([...SelectedVideos, item]);
      }
    }
  };

  return (
    <div className="App">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {thumbnailData.map((item) => {
          return (
            <button key={item.url} onClick={() => updateSelection(item.url)}>
              {SelectedVideos.includes(item.url) && (
                <span
                  style={{
                    background: "red",
                    borderRadius: "50%",
                    padding: "5px",
                    position: "absolute",
                  }}
                >
                  ✓
                </span>
              )}
              <img src={item.thumbnail.default.url} />
            </button>
          );
        })}
      </div>
      <div>
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
                  <ReactPlayer url={item} height="200px" width="300px" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
