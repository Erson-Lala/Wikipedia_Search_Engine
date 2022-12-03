import { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const input = document.querySelector("input");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  console.log(count);

  const fkerkimi = async () => {
    // e.preventDefault();
    if (search.length < 4) return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${search}`;

    const response = await fetch(endpoint);

    //Kerkesa e trete
    // Te kesh nje no result state on the app

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  const saveResult = () => {
    localStorage.setItem("results", JSON.stringify(results));
  };

  const getSaveResult = () => {
    setResults(JSON.parse(localStorage.getItem("results")));
  };

  useEffect(() => {
    fkerkimi();
  }, [search]);

  return (
    <div className="App">
      {loading ? (
        <PacmanLoader color={"#f6ff00"} loading={loading} size={70} />
      ) : (
        <header>
          <h1 className="header1">Wikipedia searcher by Erson Lala</h1>
          <div className="kerkimi">
            <input
              className="input"
              type="search"
              placeholder="Kërko :"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onInput={ e => setCount(e.target.value.length)}
            />
          </div>
          {searchInfo.totalhits ? (
            <p className="p1">Nr i Rezultateve: {searchInfo.totalhits}</p>
          ) : (
            <p className="p1">No Results</p>
          )}
        </header>
      )}

      <div className="rezultate">
        {!loading && (
          <div style={{ display: "flex" }}>
            <button className="ruajrezultatet" onClick={saveResult}>Ruaj Rezultatet</button>
            <button className="shikorezultateteruajtura" onClick={getSaveResult} style={{ marginLeft: 20 }}>
              Shiko Rezultatet e Ruajtura
            </button>
          </div>
        )}

        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div className="rezultate1" key={i}>
              <h3 className="titulli">{result.title}</h3>
              <p
                className="p2"
                dangerouslySetInnerHTML={{ __html: result.snippet }}
              ></p>
              <div className="link1">
                <a href={url} className="a1" target="_blank" rel="noreferrer">
                  Lexo me teper
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
