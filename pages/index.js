import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { LocationProvider } from "../context/LocationContext";

export default function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const api = await fetch(`https://rickandmortyapi.com/api/location`);
    const data = await api.json();
    setLocations(data.results);
  };

  console.log(locations);

  return (
    <LocationProvider>
      <div className="container flex flex-col items-center">
        <Head>
          <title>Aposto Rick</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="text-2xl my-4">Aposto Rick</h1>
        <ul className="grid grid-cols-1 items-center justify-center  gap-4">
          {locations.map((location) => {
            const { id } = location;
            return (
              <li className="flex flex-col border-2 p-4 hover:border-black cursor-pointer">
                <Link
                  href="/location/[id]"
                  as={`/location/${id}`}
                  key={location.id}
                >
                  <div className="flex flex-col">
                    <h3>{location.name}</h3>
                    <span>{location.type + " - " + location.dimension}</span>
                    <span>{location.residents.length}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </LocationProvider>
  );
}
