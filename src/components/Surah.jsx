import { useParams } from "react-router-dom";
import { useFetchData } from "./hooks/useFetchData";
import Loading from "./Loading";
import NotFound from "./NotFound";
import bismillah from "./../assets/bismillah.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

const Surah = () => {
  const [number, setNumber] = useState(null);
  const { surah } = useParams();
  const { data, isLoading, error } = useFetchData(
    `https://api.alquran.cloud/v1/surah/${surah}/ar.alafasy`,
  );
  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <NotFound />;
  } else {
    data.ayahs[0].text = data.ayahs[0].text.replace(
      "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "",
    );
  }
  return (
    <div className="container surah">
      <header>
        <Link to="/">الرئيسية</Link>
        <h1>{data.name}</h1>
        <div>{data.englishName}</div>
      </header>
      <div className="headSurah">
        <Link
          to={`/player/${+surah + 1}`}
          style={{ color: surah == 144 && "#ccc" }}
          onClick={(e) => {
            setNumber(null);
            if (surah == 144) {
              e.preventDefault();
            }
          }}
        >
          التالي
        </Link>

        {surah != 9 && (
          <div className="bisme">
            <img src={bismillah} alt="bism" />
          </div>
        )}
        <Link
          to={`/player/${+surah - 1}`}
          style={{ color: surah == 1 && "#ccc" }}
          onClick={(e) => {
            setNumber(null);
            if (surah == 1) {
              e.preventDefault();
            }
          }}
        >
          السابق
        </Link>
      </div>
      <main className="surah">
        {data.ayahs.map(({ text, number: numberInQuran, numberInSurah }) => (
          <span
            key={numberInQuran}
            className={
              "ayah " + (number && number + 1 == numberInSurah && "active")
            }
            onClick={() => {
              setNumber(+numberInSurah - 1);
            }}
          >
            {text}
            <div className="numberInSurah">
              <span>{numberInSurah}</span>
            </div>
          </span>
        ))}
        <AudioPlayer
          urlAudio={
            number !== null
              ? number < data.numberOfAyahs
                ? data.ayahs[number].audio
                : ""
              : ""
          }
          setNumber={setNumber}
          numberOfAyahs={data.numberOfAyahs}
        />
      </main>
    </div>
  );
};

export default Surah;
