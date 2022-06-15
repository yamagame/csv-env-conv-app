import React from "react";
import "app/App.css";
import { csvToEnv } from "utils/csv-utils";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function App() {
  const [csv, setCsv] = React.useState("");
  const [env, setEnv] = React.useState("");
  const [pos, setPos] = React.useState("0:A:B");

  const onUpdateCsv = (value: string) => {
    setCsv(value);
  };

  React.useEffect(() => {
    try {
      setEnv(csvToEnv(csv, pos));
    } catch (e) {
      //
    }
  }, [csv, pos]);

  return (
    <>
      <div className="csv-top-header">
        <textarea
          placeholder="Paste the tab space csv here."
          className="csv-textarea"
          value={csv}
          onChange={(e) => onUpdateCsv(e.target.value)}
        />
        <button
          className="csv-button"
          onClick={() => {
            copyToClipboard(env);
          }}
        >
          Copy to Clipboard
        </button>
        <button
          className="csv-margin-button"
          onClick={() => {
            setCsv("");
          }}
        >
          Clear
        </button>
        <div className="csv-text-input">
          <input
            placeholder="0:A:B"
            type="text"
            value={pos}
            onChange={(e) => {
              setPos(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="csv-container">
        <pre>
          <code>{env}</code>
        </pre>
      </div>
    </>
  );
}

export default App;
