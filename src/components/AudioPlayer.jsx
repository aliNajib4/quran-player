import {
  FaRegCirclePlay,
  FaRegCirclePause,
  FaBackwardStep,
  FaForwardStep,
} from "react-icons/fa6";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

const AudioPlayer = ({ urlAudio, setNumber, numberOfAyahs }) => {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(true);
  const audio = useRef(null);
  function formatTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  }
  return (
    <>
      <audio
        ref={audio}
        src={urlAudio ? urlAudio : ""}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        autoPlay
        onEnded={() =>
          setNumber((num) =>
            num >= numberOfAyahs - 1 ? numberOfAyahs : num + 1,
          )
        }
        onTimeUpdate={() => setTime(audio.current.currentTime)}
        onLoadedData={() => setDuration(audio.current.duration)}
      />
      <div className="player">
        <div className="progress">
          <span
            className="bar"
            style={{ width: `${(time / duration) * 100}%` }}
          ></span>
        </div>
        <div className="controls">
          <span className="timeNow">{formatTime(time)}</span>
          <div className={"control " + (!urlAudio && "disabled")}>
            <div
              className="prev"
              onClick={(e) =>
                urlAudio ? setNumber((num) => num - 1) : e.preventDefault()
              }
            >
              <FaForwardStep />
            </div>
            <div
              className="play"
              onClick={(e) => {
                if (urlAudio) {
                  if (playing) {
                    audio.current.pause();
                  } else {
                    audio.current.play();
                  }
                } else e.preventDefault();
              }}
            >
              {!playing ? <FaRegCirclePlay /> : <FaRegCirclePause />}
            </div>
            <div
              className="next"
              onClick={(e) =>
                urlAudio ? setNumber((num) => num + 1) : e.preventDefault()
              }
            >
              <FaBackwardStep />
            </div>
          </div>
          <span className="timeAll">
            {urlAudio ? formatTime(duration) : "00:00"}
          </span>
        </div>
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  urlAudio: PropTypes.string.isRequired, // Ensure urlAudio is a required string
  setNumber: PropTypes.func.isRequired, // Ensure setNumber is a required function
  numberOfAyahs: PropTypes.number.isRequired, // Ensure numberOfAyahs is a required number
};

export default AudioPlayer;
