import { useRouter } from "next/router";

function Residents() {
  const router = useRouter();
  const data = router.query;
  console.log(data);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default Residents;
