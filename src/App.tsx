import { Fragment, useState } from "react";
import "./App.css";

// Hauptkomponente für die To-Do-Liste
function ToDoList() {
  // Zustand für die Liste der To-Dos
  const [toDos, setToDos] = useState<{ id: number; text: string }[]>([]);
  // Zustand für das aktuelle To-Do im Eingabefeld
  const [toDo, setToDo] = useState<string>("");
  // Zustand für das To-Do, das gerade bearbeitet wird
  const [editDo, setEditDo] = useState<{ id: number; text: string } | null>(null);

  // Schnittstelle für ein To-Do-Objekt
  interface ToDo {
    id: number;
    text: string;
  }

  // Funktion zum Hinzufügen eines neuen To-Dos
  function handleAddClick(toDo: string) {
    // Neues To-Do-Objekt erstellen mit einer eindeutigen ID (Timestamp)
    const newToDo = { id: Date.now(), text: toDo };
    // To-Do zur Liste hinzufügen und Eingabefeld leeren
    setToDos([...toDos, newToDo]);
    setToDo("");
  }

  // Funktion zum Löschen eines To-Dos
  function handleDelete(id: number) {
    // Filtere das To-Do aus der Liste heraus
    setToDos(toDos.filter((theDo) => theDo.id !== id));
  }

  // Funktion zum Starten des Bearbeitungsmodus für ein To-Do
  function handleEdit(toDo: ToDo) {
    // Setze das zu bearbeitende To-Do in den Bearbeitungszustand
    setEditDo(toDo);
  }

  // Funktion zum Speichern der Änderungen an einem To-Do
  function handleSave(id: number, newText: string) {
    // Aktualisiere den Text des bearbeiteten To-Dos und setze den Bearbeitungszustand zurück
    setToDos(toDos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    setEditDo(null);
  }

  // Mappe die To-Do-Liste in JSX-Elemente
  const liElements = toDos.map((toDo) => {
    // Bedingtes Rendern: Eingabefeld und Save-Button anzeigen, wenn das To-Do bearbeitet wird
    if (editDo && editDo.id === toDo.id) {
      return (
        <Fragment key={toDo.id}>
          <div className="listElement">
            <input
              type="text"
              value={editDo.text}
              onChange={(e) => setEditDo({ ...editDo, text: e.target.value })}
            />
            <button onClick={() => handleSave(toDo.id, editDo.text)}>Save</button>
          </div>
        </Fragment>
      );
    }
    // Normales Listenelement und Edit-/Delete-Buttons anzeigen, wenn das To-Do nicht bearbeitet wird
    return (
      <Fragment key={toDo.id}>
        <div className="listElement">
          <li>{toDo.text}</li>
          <button onClick={() => handleEdit(toDo)}>Edit</button>
          <button onClick={() => handleDelete(toDo.id)}>löschen</button>
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <div className="toDoList">
        <h2>Deine To-Do-List</h2>
        <label htmlFor="addItem">
          <input
            type="text"
            name="addItem"
            placeholder=""
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
          <button onClick={() => handleAddClick(toDo)}>Add</button>
        </label>
        <ul>{liElements}</ul>
      </div>
    </Fragment>
  );
}

// Haupt-App-Komponente, die die To-Do-Liste einbindet
function App() {
  return <ToDoList />;
}

export default App;
