import { useRouter } from "next/router";

function Residents() {
  const router = useRouter();
  const data = router.query;
  const residents = Object.keys(data).map((key) => [data[key]]);

  const characters = residents.map((resident) => getResident(resident));

  async function getResident(url) {
    const data = await fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    return data;
  }

  return (
    <div>
      <h1>
        {characters.map((character) => (
          <span>{character.name}</span>
        ))}
      </h1>
    </div>
  );
}

export default Residents;
