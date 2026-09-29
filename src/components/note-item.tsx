type Note = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
};

type NoteItemProps = {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, index, onEdit, onDelete }: NoteItemProps) {
  const date = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(note.updatedAt));

  return (
    <article className={`note-card note-card-${index % 3}`}>
      <div className="note-card-head"><span className="note-card-index">Nº {String(index + 1).padStart(2, "0")}</span><time dateTime={note.updatedAt}>{date}</time></div>
      <h3>{note.title}</h3>
      <p className="note-description">{note.description}</p>
      <div className="note-card-actions">
        <button type="button" className="note-action" onClick={() => onEdit(note)} aria-label={`Edit ${note.title}`}><span aria-hidden="true">↗</span> Edit</button>
        <button type="button" className="note-action note-delete" onClick={() => onDelete(note.id)} aria-label={`Delete ${note.title}`}><span aria-hidden="true">×</span> Delete</button>
      </div>
    </article>
  );
}