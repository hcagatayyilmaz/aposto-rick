import Image from "next/image";
import { useEffect, useState } from "react";

const defaultEndpoint = `https://rickandmortyapi.com/api/location/`;

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Character({ data }) {
  const { name, residents } = data;
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getAllResidents();
  }, []);

  const getAllResidents = () => {
    residents.map((resident) => {
      fetch(`${resident}`)
        .then((res) => res.json())
        .then((data) => setCharacters((characters) => [...characters, data]));
    });
  };

  return (
    <div className="mt-2 flex flex-col justify-center items-center gap-4">
      <main>
        <h1 className="bold text-4xl">{name}</h1>
        <h3>Number of residents: {characters.length}</h3>
      </main>
      <div className="grid grid-cols-3 gap-4">
        {characters.map((character) => {
          const { name, species, type, id, image, status } = character;
          return (
            <div key={id} className="relative hover:animate-bounce">
              <img src={image} alt={name} className="rounded" />
              <span
                className={
                  status === "Alive"
                    ? "bg-green-500 p-2 absolute top-0 right-0"
                    : status === "Dead"
                    ? "bg-red-500 p-2 absolute top-0 right-0"
                    : "bg-gray-500 p-2 absolute top-0 right-0"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>

              <div className="flex justify-between">
                <p>{name}</p>
                <p>{species}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => console.log(characters)}>zort</button>
    </div>
  );
}
