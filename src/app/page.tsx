"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NoteItem from "@/components/note-item";

type Note = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
};

const STORAGE_KEY = "fieldnotes.notes.v1";

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [duplicateId, setDuplicateId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [feedback, setFeedback] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      try {
        const savedNotes = window.localStorage.getItem(STORAGE_KEY);
        if (savedNotes) {
          const parsed: unknown = JSON.parse(savedNotes);
          if (Array.isArray(parsed)) {
            setNotes(parsed.filter((note): note is Note =>
              typeof note?.id === "string" &&
              typeof note?.title === "string" &&
              typeof note?.description === "string" &&
              typeof note?.updatedAt === "string",
            ));
          }
        }
      } catch {
        setFeedback("Saved notes could not be read from this browser.");
      } finally {
        setIsReady(true);
      }
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      console.error("Notes could not be saved in local storage.");
    }
  }, [isReady, notes]);

  useEffect(() => {
    const duplicateTimer = window.setTimeout(() => {
      const matchingNote = notes.find((note) => note.id !== editingId && normalize(note.title) === normalize(title));
      setDuplicateId(matchingNote?.id ?? null);
    }, 0);

    return () => window.clearTimeout(duplicateTimer);
  }, [editingId, notes, title]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA"].includes(target.tagName));
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setSearch("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const visibleNotes = useMemo(() => {
    const query = normalize(search);
    return [...notes]
      .filter((note) => !query || normalize(`${note.title} ${note.description}`).includes(query))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }, [notes, search]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setDuplicateId(null);
    setFeedback("");
  };

  const saveNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) return;
    const existingNote = notes.find((note) =>
      note.id !== editingId &&
      normalize(note.title) === normalize(cleanTitle),
    );
    if (existingNote || duplicateId) {
      setDuplicateId(existingNote?.id ?? duplicateId);
      setFeedback("A note with this title already exists.");
      return;
    }

    const updatedAt = new Date().toISOString();
    if (editingId) {
      setNotes((current) => current.map((note) => note.id === editingId
        ? { ...note, title: cleanTitle, description: cleanDescription, updatedAt }
        : note));
      setFeedback("Note updated.");
    } else {
      setNotes((current) => [{ id: crypto.randomUUID(), title: cleanTitle, description: cleanDescription, updatedAt }, ...current]);
      setFeedback("Note added.");
    }
    setTitle("");
    setDescription("");
    setEditingId(null);
    setDuplicateId(null);
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    setFeedback("");
  };

  const deleteNote = (id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id));
    if (editingId === id) resetForm();
    setFeedback("Note deleted.");
  };

  return (
    <main className="notes-app" id="main-content">
      <header className="app-header">
        <a className="app-brand" href="#main-content" aria-label="Jot notes home">
          <span className="brand-symbol" aria-hidden="true">j.</span>
          <span>JOT<span className="brand-period">.</span></span>
        </a>
        <div className="header-context"><span className="live-indicator" /> YOUR PERSONAL NOTEBOOK</div>
        <div className="header-date">MADE FOR THE MOMENTS IN BETWEEN</div>
      </header>

      <div className="notes-layout">
        <aside className="side-rail" aria-label="Notebook overview">
          <p className="rail-label">YOUR SPACE</p>
          <h2>Thoughts,<br /><em>gathered.</em></h2>
          <div className="note-count-block">
            <span className="note-count-number">{String(notes.length).padStart(2, "0")}</span>
            <span className="note-count-label">{notes.length === 1 ? "NOTE" : "NOTES"}<br />IN YOUR BOOK</span>
          </div>
          <div className="rail-rule" />
          <p className="rail-copy">A quiet place to keep the ideas you don’t want to lose.</p>
          <div className="rail-bottom"><span className="tiny-spark" aria-hidden="true">✳</span><span>LOCAL BY DESIGN<br />SAVED ON THIS DEVICE</span></div>
        </aside>

        <section className="notes-content" aria-label="Notes workspace">
          <div className="page-heading">
            <div>
              <p className="eyebrow"><span className="status-dot" /> THE NOTEBOOK</p>
              <h1>Your notes<span className="heading-dot">.</span></h1>
              <p className="page-subtitle">Catch a thought. Come back to it later.</p>
            </div>
            <span className="page-index">01 <span>/</span> KEEPING</span>
          </div>

          <div className="workspace-grid">
            <section className={`editor-panel${editingId ? " editor-panel-editing" : ""}`} aria-labelledby="editor-title">
              <div className="panel-topline"><span className="panel-marker">{editingId ? "02" : "01"}</span><span>{editingId ? "MAKE A CHANGE" : "NEW THOUGHT"}</span><span className="editor-spark" aria-hidden="true">✳</span></div>
              <h2 id="editor-title">{editingId ? "Edit this note" : "What’s on your mind?"}</h2>
              <form className="note-form" onSubmit={saveNote}>
                <label htmlFor="note-title">TITLE</label>
                <input id="note-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give this thought a name" maxLength={80} required />
                <label htmlFor="note-description">DESCRIPTION</label>
                <textarea id="note-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write it down before it wanders off…" rows={7} maxLength={1200} required />
                <div className="form-footnote"><span>{description.length} / 1200</span><span>JUST FOR YOU</span></div>
                {duplicateId && <p className="duplicate-warning" role="status">A note with this title is already in your notebook.</p>}
                {feedback && <p className="form-feedback" role="status">{feedback}</p>}
                <div className="form-actions">
                  {editingId && <button className="button-quiet" type="button" onClick={resetForm}>Cancel</button>}
                  <button className="button-primary" type="submit" disabled={!isReady || Boolean(duplicateId)}>
                    <span aria-hidden="true">{editingId ? "✓" : "+"}</span>{editingId ? "Save changes" : "Add note"}
                  </button>
                </div>
              </form>
            </section>

            <section className="collection-panel" aria-labelledby="collection-title">
              <div className="collection-heading">
                <div><p className="eyebrow">THE COLLECTION</p><h2 id="collection-title">All notes <span>{notes.length}</span></h2></div>
                <div className="collection-mark" aria-hidden="true">Nº 01</div>
              </div>
              <label className="search-box" htmlFor="note-search"><span aria-hidden="true">⌕</span><input ref={searchInputRef} id="note-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a note…" /><kbd>/</kbd></label>
              {!isReady ? <div className="empty-state"><span className="empty-icon" aria-hidden="true">◌</span><h3>Opening your notebook…</h3></div> : visibleNotes.length > 0 ? (
                <div className="note-list">
                  {visibleNotes.map((note, index) => <NoteItem key={note.id} note={note} index={index} onEdit={editNote} onDelete={deleteNote} />)}
                </div>
              ) : notes.length > 0 ? (
                <div className="empty-state"><span className="empty-icon" aria-hidden="true">⌕</span><h3>No notes found</h3><p>Try another search.</p></div>
              ) : (
                <div className="empty-state"><span className="empty-icon" aria-hidden="true">✳</span><h3>Start with a small thought.</h3><p>Your notes will be collected here.</p><span className="empty-arrow" aria-hidden="true">↖</span></div>
              )}
              <div className="collection-footer"><span>{visibleNotes.length} SHOWN</span><span>EVERY THOUGHT HAS A PLACE</span></div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}