let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let activeNote = {};
const checkRoute = () => {


if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.saveBtn');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}
}
checkRoute()
const display = (elem) => {
  elem.style.display = 'inline';
};

const hideEl = (elem) => {
  elem.style.display = 'none';
};


const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hideEl(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.value = '';
    noteText.value = '';
  }
};

const noteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};


const noteDelete = (e) => {
  
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};



const displayActiveNote = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};


const dump = (e) => {
  activeNote = {};
  renderActiveNote();
};

const renderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hideEl(saveNoteBtn);
  } else {
    display(saveNoteBtn);
  }
};


const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];


  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const divEl = document.createElement('div');
    divEl.innerText = text;
    divEl.addEventListener('click', displayActiveNote);

    liEl.append(divEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'delete-note',
        
        'text-danger',
        'float-right',
        
      );
      delBtnEl.addEventListener('click', noteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};




const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', noteSave);
  newNoteBtn.addEventListener('click', dump);
  noteTitle.addEventListener('keyup', renderSaveBtn);
  noteText.addEventListener('keyup', renderSaveBtn);
}

getAndRenderNotes();