import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import "./App.css";
import CreateQuote from "./screens/CreateQuote";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { GET_ALL_QUOTES } from "./services/queries";

function App() {
  const { loading, data, error } = useQuery(GET_ALL_QUOTES);
  console.log({ loading });
  console.log({ data });
  console.log({ error });
  return (
    <div className="App">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Quotes</h2>
        {loading && <h1>Loading...</h1>}
        {error && <h4>{error.message}</h4>}
        {data &&
          data.quotes.map((quote) => (
            <>
              <h6>
                {quote.name} by {quote.by.firstName}
              </h6>
            </>
          ))}
      </div>

      <CreateQuote />

      <Registration />
      <Login />
    </div>
  );
}

export default App;
