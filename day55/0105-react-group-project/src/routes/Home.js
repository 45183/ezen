import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
// import styles from "./Home.module.css";
import { apiUrl } from "../url";

const Home = () => {
  const [results, setResults] = useState([]);

  const getMovies = async () => {
    const json = await (await fetch(apiUrl.home)).json();
    setResults(json.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Layout>
      {/* <div className={styles.container}> */}
      <div>
        {results.length > 0 &&
          results.map((result) => (
            // <div key={result.id} className={styles.item}>
            <div key={result.id}>
              <Link to={`/character/${result.id}`}>
                <img
                  src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                  alt={result.id}
                />
                {/* <h1 className={styles.name}> */}
                <h1>
                  {result.name.length > 10
                    ? result.name.slice(0, 10) + "..."
                    : result.name}
                </h1>
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Home;
