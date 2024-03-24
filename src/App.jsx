// import { useState } from 'react'
import { useFetchData } from "./useFetchData";
import "./App.css";

function App() {
  const { data, isLoading, error } = useFetchData(
    "https://api.alquran.cloud/v1/surah"
  );
  return (
    <main dir="rtl">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>error</p>
      ) : (
        data.map(
          ({ englishName, name, number, numberOfAyahs, revelationType }) => (
            <div key={number} className="card" onClick={() => console.log(number)}>
              <div className="head">
                <div className="number">{number}</div>
                <div className="count">ايه: {numberOfAyahs}</div>
                <div className="type">{revelationType==="Meccan"?"مكية":"مدنية"}</div>
              </div>
              <div className="name">{name}</div>
              <div className="englishName">{englishName}</div>
            </div>
          )
        )
      )}
    </main>
  );
}

export default App;
