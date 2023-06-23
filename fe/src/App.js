import { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import ZipList from "./components/ZipList";
import CreateMessage from "./components/CreateMessage";
import "./App.css";
import axios from "axios";

function App() {
  const [queryText, setQueryText] = useState("");
  const [zips, setZips] = useState([]);


  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/elastic?text=${queryText}`
      )
      .then((result) => {
        const { records } = result.data;
        const tempZips = records.map((record) => ({
          text: record.text,
          date: record.date,
          channel: record.channel,
          user: record.user,
          mentions: record.mentions,
          hasLink: record.hasLink,
          hasVideo: record.hasVideo,
          hasAudio: record.hasAudio,
          isPinned: record.isPinned,
        }));
        setZips(tempZips);
      });
  }, [queryText]);

  return (
    <div
      className="App"
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <h1>Discord - Elasticsearch</h1>
      <SearchBox
        placeholder="Search Elasticsearch"
        setQueryText={setQueryText}
      />
      <CreateMessage />

      <ZipList zips={zips} />
    </div>
  );
}

export default App;
