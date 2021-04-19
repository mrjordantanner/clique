import './App.css';
// https://www.valentinog.com/blog/socket-react/
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <h2>
      <time dateTime={response}>{response}</time>
    </h2>
  );
}

export default App;