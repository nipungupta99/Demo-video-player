import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {FaPause, FaPlay, FaVolumeMute} from "react-icons/fa";
import {FaVolumeHigh} from "react-icons/fa6";
import {MdFullscreen, MdFullscreenExit} from "react-icons/md";

const PlayerComponent = ({ url, itemsCount }) => {
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8); // Default volume
    const [muted, setMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [duration, setDuration] = useState(0); // Duration of the video
    const [playedSeconds, setPlayedSeconds] = useState(0); // Current playback position in seconds
    const playerWrapperRef = useRef(null);
    const player = useRef(null);
    const [prevVolume, setPrevVolume] = useState(0.8);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleMute = () => {
        if (!muted) {
            setPrevVolume(volume);
            setVolume(0);
            setMuted(true);
        } else {
            setVolume(prevVolume);
            setMuted(false);
        }
    };

    const handleVolumeChange = e => {
        setVolume(parseFloat(e.target.value));
        if (e.target.value > 0) setMuted(false);
    };

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseDown = e => {
        setSeeking(true);
    };

    const handleSeekMouseUp = e => {
        setSeeking(false);
        player.current.seekTo(parseFloat(e.target.value));
    };

    const toggleFullScreen = () => {
        const playerWrapper = playerWrapperRef.current;
        if (!isFullScreen) {
            if (playerWrapper.requestFullscreen) {
                playerWrapper.requestFullscreen();
            } else if (playerWrapper.mozRequestFullScreen) { /* Firefox */
                playerWrapper.mozRequestFullScreen();
            } else if (playerWrapper.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                playerWrapper.webkitRequestFullscreen();
            } else if (playerWrapper.msRequestFullscreen) { /* IE/Edge */
                playerWrapper.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    const formatTime = seconds => {
        return new Date(seconds * 1000).toISOString().substr(14, 5);
    };

    return (
        <div ref={playerWrapperRef} className="flex flex-col">
            <div className="flex justify-center">
                <ReactPlayer
                    ref={player}
                    className='react-player'
                    width='100%'
                    height={itemsCount === 1 ? "80vh" :'50vh'}
                    url={url}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    onDuration={(e) => setDuration(e)}
                    onProgress={({ played, playedSeconds }) => {
                        if (!seeking) {
                            setPlayed(played);
                            setPlayedSeconds(playedSeconds);
                        }
                    }}
                />
            </div>
            <div className="controls">
                <div>
                    <input
                        className="w-full"
                        type='range' min={0} max={0.999999} step='any'
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                    />
                    <div className="text-[12px]" >
                        {formatTime(playedSeconds)} / {formatTime(duration)}
                    </div>
                </div>
                <div className="flex gap-3 my-3" >
                    <button className="border p-2 shadow" onClick={handlePlayPause}>{playing ? <FaPause/> :
                        <FaPlay/>}</button>
                    <button className="border p-2 shadow" onClick={handleMute}>{muted ? <FaVolumeHigh/> :
                        <FaVolumeMute/>}</button>
                    <input type="range" min={0} max={1} step="any" value={volume} onChange={handleVolumeChange}/>
                    <button className="border p-2 shadow" onClick={toggleFullScreen}>{isFullScreen ?
                        <MdFullscreenExit/> : <MdFullscreen/>}</button>
                </div>

            </div>
        </div>
    );
};

export default PlayerComponent;
