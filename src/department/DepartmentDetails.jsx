import { useEffect, useRef, useState } from "react";
import useQuery from "../api/useQuery";
import Navbar from "../layout/Navbar";

export default function DepartmentDetails({ id }) {
  const {
    data: department,
    loading: deptLoading,
    error: deptError,
  } = useQuery(`/departments/${id}`, `department-${id}`);

  const {
    data: faculty,
    loading: facLoading,
    error: facError,
  } = useQuery(`/departments/${id}/faculties`, `faculty-${id}`);

  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (!department) return;

    const audioFileMap = {
      "Fire Nation": "/sound/fire.mp3",
      "Water Tribe": "/sound/water.mp3",
      "Earth Kingdom": "/sound/earth.mp3",
      "Air Nomads": "/sound/air.mp3",
    };

    const audioFile = audioFileMap[department.name];

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = muted;
    audioRef.current = audio;
    audio.play();

    return () => {
      audio.pause();
    };
  }, [department, muted, volume]);

  if (deptLoading || facLoading) return <p>Loading...</p>;
  if (deptError || facError) return <p>Error loading department info.</p>;
  if (!department || !department.name) return <p>Department not found.</p>;

  const deptBannerMap = {
    "Fire Nation": "fire.png",
    "Water Tribe": "water.png",
    "Earth Kingdom": "earth.png",
    "Air Nomads": "air.png",
  };

  const swirlMapLeft = {
    "Fire Nation": "redleft.png",
    "Water Tribe": "blueleft.png",
    "Earth Kingdom": "greenleft.png",
    "Air Nomads": "yellowleft.png",
  };

  const swirlMapRight = {
    "Fire Nation": "redright.png",
    "Water Tribe": "blueright.png",
    "Earth Kingdom": "greenright.png",
    "Air Nomads": "yellowright.png",
  };

  const deptImageFile = deptBannerMap[department.name] || "default.png";
  const swirlLeft = swirlMapLeft[department.name];
  const swirlRight = swirlMapRight[department.name];

  const imageMap = {
    Zuko: "Zuko.png",
    Iroh: "General_Iroh.png",
    Katara: "katara.png",
    Pakku: "Pakku.png",
    Toph: "toph.png",
    Bumi: "bumi.png",
    Aang: "aang.png",
    Gyatso: "Monk_Gyatso.png",
  };

  function getImageFile(name) {
    const match = Object.keys(imageMap).find((key) =>
      name.toLowerCase().includes(key.toLowerCase())
    );
    return match ? imageMap[match] : "default.png";
  }

  const departmentClass = department.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`department-details ${departmentClass}`}>
      {/* Inject swirl CSS here */}
      <style>{`
        .swirl-container {
          position: relative;
          z-index: 0;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: -10px;
          margin-bottom: -60px;
        }

        .swirl {
          opacity: 70%;
          mix-blend-mode: multiply;
          filter: blur(0.7px);
          max-width: 300px;
          width: 30%;
        }

        .swirl-left {
          transform: translateX(-25%);
        }

        .swirl-right {
          transform: translateX(25%);
          width: 90%;
        }

        .department-title,
        .department-banner,
        .department-description {
          position: relative;
          z-index: 1;
          margin-top: -40px;
          text-align: center;
        }
      `}</style>

      <Navbar />

      <h2 className="department-title">{department.name}</h2>

      <img
        src={`/images/${deptImageFile}`}
        alt={`${department.name} icon`}
        className="department-banner"
      />

      <div className="sound-controls" style={{ margin: "1rem 0" }}>
        <button onClick={() => setMuted((m) => !m)}>
          {muted ? "🔇 Mute" : "🔊 Unmute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ marginLeft: "1rem" }}
        />
      </div>

      <p className="department-description">{department.description}</p>

      <h3>Faculty</h3>
      <div className="faculty-list">
        {faculty?.map((prof) => (
          <div key={prof.id} className="faculty-card">
            <img
              src={`/images/${getImageFile(prof.name)}`}
              alt={prof.name}
              className="faculty-img"
            />
            <div className="faculty-info">
              <strong>{prof.name}</strong>
              <p>{prof.title}</p>
              <p>{prof.sub_department}</p>
              <p>{prof.bio}</p>
              <p>{prof.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
