import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Editor from "./editor/editor";

function App() {
  return (
    <div className="editor-shell">
      <Editor />
    </div>
  );
}

export default App;
