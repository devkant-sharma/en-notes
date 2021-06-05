<template>
  <div class="view-notes">
    <button class="btn btn-primary" @click="logout">Logout</button>
    <div class="wrapper-notes">
      <input
        v-model="inputNote"
        @keypress.enter="addNote"
        type="text"
        placeholder="Jot down notes"
        class="form-input"
      />

      <div class="wrapper-notes-list">
        <ul>
          <li v-for="n in notes" :key="n.id">
            <span v-if="!n.edit">{{ n.note }}</span>
            <input
              v-else
              :value="n.note"
              @keypress.enter="editNote(n.id, $event.target.value)"
              type="text"
              class="form-input"
            />

            <div class="notes-list-action">
              <img
                src="../assets/pencil.png"
                class="edit"
                width="15"
                alt="edit-icon"
                @click="n.edit = !n.edit"
              />

              <img
                src="../assets/delete.png"
                class="delete"
                width="15"
                alt="delete-icon"
                @click="deleteNote(n.id)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {
      inputNote: "",
      notes: [],
    };
  },
  methods: {
    addNote() {
      const note = this.inputNote.trim();
      if (!note) return;

      const id = this.uniqueID();
      const edit = false;

      this.notes.push({ note, id, edit });
      this.inputNote = "";
    },

    editNote(noteId, value) {
      const newValue = value.trim();
      if (!newValue) return;

      this.notes = this.notes.map((note) => {
        if (note.id === noteId) {
          note.note = newValue;
          note.edit = false;
        }
        return note;
      });
    },

    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },

    uniqueID() {
      return Math.floor(Math.random() * Date.now());
    },

    logout() {
      localStorage.removeItem("isLoggedin");
      this.$router.push("/");
    },
  },
};
</script>
