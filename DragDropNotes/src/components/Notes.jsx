/* eslint-disable react/prop-types */
import Note from "./Note";
import { createRef, useEffect, useRef } from "react";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const determineNewPosition = () => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 200;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatednotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id == note.id);
      if (savedNote) return { ...note, position: savedNote.position };
      const position = determineNewPosition();
      return { ...note, position };
    });
    setNotes(updatednotes);
    localStorage.setItem("notes", JSON.stringify(updatednotes));
  }, [notes.length]);

  const noteRefs = useRef([]);

  const checkOverlap = (id) => {
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const overlap = noteRefs.current
      .filter((n) => n.current !== noteRef)
      .some(
        (n) =>
          n.current.getBoundingClientRect().left < rect.right &&
          n.current.getBoundingClientRect().right > rect.left &&
          n.current.getBoundingClientRect().top < rect.bottom &&
          n.current.getBoundingClientRect().bottom > rect.top
      );
    return overlap;
  };
  const handleDragStart = (note, e) => {
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const updateNotePosition = (newPosition) => {
      const updatednotes = notes.map((n) =>
        n.id == id ? { ...n, position: newPosition } : n
      );
      setNotes(updatednotes);
      localStorage.setItem("notes", JSON.stringify(updatednotes));
    };

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };
    const handleMouseUp = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      if (checkOverlap(id)) {
        //check overlap
        noteRef.style.left = `${note.position.x}px`;
        noteRef.style.top = `${note.position.y}px`;
      } else {
        updateNotePosition(newPosition);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div>
      {notes.map((note) => (
        <Note
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef())
          }
          key={note.id}
          content={note.text}
          initialPos={note.position}
          onMouseDown={(e) => handleDragStart(note, e)}
        />
      ))}
    </div>
  );
};

export default Notes;
