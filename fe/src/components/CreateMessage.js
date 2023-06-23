import React, { useState } from "react";
import axios from "axios";

function CreateMessage() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [channel, setChannel] = useState("");
  const [user, setUser] = useState("");
  const [mentions, setMentions] = useState([]);
  const [hasLink, setHasLink] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      text,
      date,
      channel,
      user,
      mentions,
      hasLink,
      hasVideo,
      hasAudio,
      isPinned,
    };

    try {
      await axios.post("http://localhost:8080/messages", newMessage);
      console.log("Message created successfully");
    } catch (error) {
      console.error("Error creating message:", error);
    }

    // Clear form fields
    setText("");
    setDate("");
    setChannel("");
    setUser("");
    setMentions([]);
    setHasLink(false);
    setHasVideo(false);
    setHasAudio(false);
    setIsPinned(false);
  };

  const styles = {
    container: {
      width: "50%",
      margin: "0 auto",
        marginBottom: "2rem",
          border: "1px solid black",
          borderRadius: 4,
          padding: 20,
          display: "flex",
          flexDirection: "column",

      
    },
    heading: {
      fontSize: "1.5rem",
        marginBottom: "1rem",
      alignSelf: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "1rem",
      padding: "0.5rem",
      fontSize: "1rem",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    checkboxLabel: {
      marginLeft: "0.5rem",
    },
    submitButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Message</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Form inputs */}
        <input
          style={styles.input}
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="datetime-local"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Mentions"
          value={mentions}
          onChange={(e) => setMentions(e.target.value.split(","))}
        />
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={hasLink}
            onChange={(e) => setHasLink(e.target.checked)}
          />
          <label style={styles.checkboxLabel}>Has Link</label>
        </div>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={hasVideo}
            onChange={(e) => setHasVideo(e.target.checked)}
          />
          <label style={styles.checkboxLabel}>Has Video</label>
        </div>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={hasAudio}
            onChange={(e) => setHasAudio(e.target.checked)}
          />
          <label style={styles.checkboxLabel}>Has Audio</label>
        </div>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
          <label style={styles.checkboxLabel}>Is Pinned</label>
        </div>
        <button type="submit" style={styles.submitButton}>
          Create Message
        </button>
      </form>
    </div>
  );
}

export default CreateMessage;
