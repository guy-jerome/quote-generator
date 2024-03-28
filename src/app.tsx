import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import "./app.css";

export function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  async function getRandomQuote() {
    try {
      const result = await axios.get("https://api.quotable.io/quotes/random");
      setAuthor(result.data[0].author);
      setQuote(result.data[0].content);
    } catch (err) {
      console.log("There was an error", err);
    }
  }

  function getTags(event: any) {
    setTags(event.target.value);
  }
  async function getQuote() {
    try {
      const result = await axios.get(
        `https://api.quotable.io/search/quotes?query=${tags}&limit=1`
      );
      if (result.data.results[0]) {
        setAuthor(result.data.results[0].author);
        setQuote(result.data.results[0].content);
      } else {
        setAuthor("");
        setQuote("Could not find any quotes with those tags.");
      }
    } catch (err) {
      console.log("There was an error", err);
    }
  }

  useEffect(() => {
    getRandomQuote();
  }, []);
  return (
    <>
      <div>
        <h1>Quote Generator</h1>
      </div>
      <main>
        <h2>{quote ? quote : "Loading. . ."}</h2>
        <h3>{author}</h3>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            placeholder="eg. inspirational, history, technology"
            onInput={getTags}
          ></input>
        </div>
        <button onClick={tags ? getQuote : getRandomQuote}>Generate</button>
      </main>
    </>
  );
}
