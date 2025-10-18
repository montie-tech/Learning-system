// ===== Logout Button =====
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  alert("Logging out...");
  window.location.href = "../login.html";
});

// ===== Assignment Upload =====
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");

if (assignmentForm) {
  assignmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("assignmentTitle").value;
    const file = document.getElementById("assignmentFile").files[0];
    if (file) {
      const div = document.createElement("div");
      div.classList.add("file-card");
      div.innerHTML = `<strong>${title}</strong> - ${file.name}`;
      assignmentList.appendChild(div);
      assignmentForm.reset();
    }
  });
}

// ===== Notes Upload =====
const notesForm = document.getElementById("notesForm");
const notesList = document.getElementById("notesList");

if (notesForm) {
  notesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("notesTitle").value;
    const file = document.getElementById("notesFile").files[0];
    if (file) {
      const div = document.createElement("div");
      div.classList.add("file-card");
      div.innerHTML = `<strong>${title}</strong> - ${file.name}`;
      notesList.appendChild(div);
      notesForm.reset();
    }
  });
}

// ===== Past Papers =====
const papersForm = document.getElementById("papersForm");
const paperList = document.getElementById("paperList");

if (papersForm) {
  papersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("paperTitle").value;
    const file = document.getElementById("paperFile").files[0];
    if (file) {
      const div = document.createElement("div");
      div.classList.add("file-card");
      div.innerHTML = `<strong>${title}</strong> - ${file.name}`;
      paperList.appendChild(div);
      papersForm.reset();
    }
  });
}

// ===== Results Upload =====
const resultsForm = document.getElementById("resultsForm");
const resultList = document.getElementById("resultList");

if (resultsForm) {
  resultsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const className = document.getElementById("className").value;
    const file = document.getElementById("resultFile").files[0];
    const emails = document.getElementById("emails").value;
    if (file) {
      const div = document.createElement("div");
      div.classList.add("file-card");
      div.innerHTML = `<strong>${className}</strong> - ${file.name} <br>📧 Sent to: ${emails}`;
      resultList.appendChild(div);
      resultsForm.reset();
      alert("Result slip uploaded and shared successfully!");
    }
  });
}
