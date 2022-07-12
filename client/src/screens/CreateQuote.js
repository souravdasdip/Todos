import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QOUTE } from "../services/mutation";
import { GET_ALL_QUOTES } from "../services/queries";

function CreateQuote() {
  const [quote, setQuote] = useState("");

  const [createQuote, { loading, data, error }] = useMutation(CREATE_QOUTE, {
    //After creating new quote, need to fetch the all quotes again
    refetchQueries: [GET_ALL_QUOTES, "getAllQuotes"],
  });
  const handleSubmit = () => {
    createQuote({
      variables: {
        name: quote,
      },
    });
    setQuote("");
  };

  console.log({ data });
  return (
    <div>
      <h1>Create Quote</h1>
      <input
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Create Quote..."
      />
      <button onClick={handleSubmit}>Submit</button>
      <h4>{data && data.quote}</h4>
    </div>
  );
}

export default CreateQuote;
