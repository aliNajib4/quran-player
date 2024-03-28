import Loading from "./Loading";
import { useFetchData } from "./hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigata = useNavigate();
  const { data, isLoading, error } = useFetchData(
    "https://api.alquran.cloud/v1/surah",
  );
  return (
    <main dir="rtl" className="mainpage">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>error</p>
      ) : (
        data.map(
          ({ englishName, name, number, numberOfAyahs, revelationType }) => (
            <div
              key={number}
              className="card"
              onClick={() => navigata(`/player/${number}`)}
            >
              <div className="head">
                <div className="number">{number}</div>
                <div className="count">ايه: {numberOfAyahs}</div>
                <div className="type">
                  {revelationType === "Meccan" ? "مكية" : "مدنية"}
                </div>
              </div>
              <div className="name">{name}</div>
              <div className="englishName">{englishName}</div>
            </div>
          ),
        )
      )}
    </main>
  );
};

export default MainPage;
