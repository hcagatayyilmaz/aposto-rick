import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import LocationContext, { LocationProvider } from "../context/LocationContext";
import { useContext } from "react";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const { changeLocation } = useContext(LocationContext);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const api = await fetch(`https://rickandmortyapi.com/api/location`);
    const data = await api.json();
    setLocations(data.results);
  };

  return (
    <div className="container flex flex-col items-center">
      <Head>
        <title>Aposto Rick</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl my-4">Aposto Rick</h1>
      <ul className="grid grid-cols-1 items-center justify-center  gap-4">
        {locations.map((location) => {
          return (
            <LocationProvider>
              <Link
                href={{
                  pathname: "Residents",
                  query: location.residents,
                }}
              >
                <li
                  className="flex flex-col border-2 p-4 hover:border-black cursor-pointer"
                  key={location.id}
                >
                  <h3>{location.name}</h3>
                  <span>{location.type + " - " + location.dimension}</span>
                  <span>{location.residents.length}</span>
                </li>
              </Link>
            </LocationProvider>
          );
        })}
      </ul>
    </div>
  );
}
