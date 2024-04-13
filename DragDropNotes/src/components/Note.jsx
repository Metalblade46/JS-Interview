/* eslint-disable react/prop-types */
import  { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Note = forwardRef(({ content, initialPos, ...props }, ref) => {
  return (
    <div
    ref={ref}
      style={{
        border: "1px solid black",
        width: "200px",
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        userSelect: "none",
        cursor: "move",
        backgroundColor: "lightblue",
      }}
      {...props}
    >
      📌{content}
    </div>
  );
});

export default Note;
