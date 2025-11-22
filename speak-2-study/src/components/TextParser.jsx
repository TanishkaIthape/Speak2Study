/* import React from "react";
import { parseScheduleCommand } from "../utils/scheduleParser";

const TextParser = ({ transcript }) => {

  // if transcript is empty → show nothing
  if (!transcript || typeof transcript !== "string") {
    return null;
  }

  const parsed = parseScheduleCommand(transcript);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Parsed Output</h3>
      <pre style={{ background: "#eee", padding: "10px", borderRadius: "8px" }}>
        {JSON.stringify(parsed, null, 2)}
      </pre>
    </div>
  );
};

export default TextParser;
 */
import React from "react";
import { parseScheduleCommand } from "../utils/scheduleParser";

const TextParser = ({ transcript }) => {
  
  if (!transcript || typeof transcript !== "string") return null;

  const parsed = parseScheduleCommand(transcript);

  return (
    <div style={{ marginTop: "20px" ,
         background: "#d5f037ff",
        color:"black"
    }}>
      <h3>Parsed Output</h3>

      {/* The ONLY valid way to show an object */}
      <pre style={{ 
        
        background: "#d5f037ff", 
        padding: "10px",
        borderRadius: "6px",
        color:"black"
        
      }}>
        {JSON.stringify(parsed, null, 2)}
      </pre>
    </div>
  );
};

export default TextParser;
