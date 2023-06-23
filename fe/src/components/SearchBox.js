import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";

export default function SearchBox({ placeholder, setQueryText }) {
  return (
    <div
      className="search-box"
      style={{

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "50%",
        margin: "0 auto",
        marginBottom: "2rem",
        border: "1px solid black",
        borderRadius: 4,
        padding: 20,
      }}
    >
      <h2>Search by text, user, channel or date</h2>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          onChange={(e) => setQueryText(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
