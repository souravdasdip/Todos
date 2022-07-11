import { useEffect } from "react";
import "./App.css";
import Login from "./screens/Login";
import Registration from "./screens/Registration";

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query getAllQuotes{
            quotes{
              name
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Registration />
      <Login />
    </div>
  );
}

export default App;
