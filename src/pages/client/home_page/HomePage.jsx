import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";

function HomePage() {
  const [state, setData] = useState([]);

  useEffect(() => {
    getAllDocuments("manga")
      .then(setData)
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {Object.keys(state).map((e, index) => (
        <div key={index}>
          <h3>{e}</h3>
          <p>{JSON.stringify(state[e])}</p>
        </div>
      ))}
    </div>
  );
}
export default HomePage;
