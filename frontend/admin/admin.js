// ===== EXCEL UPLOAD HANDLER =====
const excelFile = document.getElementById("excelFile");
const uploadBtn = document.getElementById("uploadExcel");
const tableBody = document.getElementById("tableBody");

if (uploadBtn) {
  uploadBtn.addEventListener("click", () => {
    if (!excelFile.files.length) {
      alert("Please select an Excel file first!");
      return;
    }

    const file = excelFile.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Read first sheet
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Clear old rows
      tableBody.innerHTML = "";

      json.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row["Admission No"] || ""}</td>
          <td>${row["Full Name"] || ""}</td>
          <td>${row["Class"] || ""}</td>
          <td>${row["Gender"] || ""}</td>
          <td>${row["Email"] || ""}</td>
        `;
        tableBody.appendChild(tr);
      });

      alert("✅ Class list uploaded successfully!");
      localStorage.setItem("classListData", JSON.stringify(json)); // Save for teacher view
    };

    reader.readAsArrayBuffer(file);
  });
}

// ==== PAYMENTS LOGIC ====
const paymentForm = document.getElementById("paymentForm");
const paymentTableBody = document.getElementById("paymentTableBody");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

let payments = JSON.parse(localStorage.getItem("payments")) || [];

// Render payments
function renderPayments(list = payments) {
  paymentTableBody.innerHTML = "";
  list.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.student}</td>
      <td>${p.class}</td>
      <td>${p.amount}</td>
      <td class="${p.status === "Paid" ? "status-paid" : "status-pending"}">${p.status}</td>
      <td>
        <button class="action-btn" onclick="toggleStatus(${index})">Toggle</button>
        <button class="action-btn" onclick="deletePayment(${index})">Delete</button>
      </td>
    `;
    paymentTableBody.appendChild(row);
  });
}

// Add payment
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const payment = {
    student: studentName.value,
    class: className.value,
    amount: amount.value,
    status: status.value,
  };
  payments.push(payment);
  localStorage.setItem("payments", JSON.stringify(payments));
  renderPayments();
  paymentForm.reset();
});

// Delete payment
function deletePayment(i) {
  payments.splice(i, 1);
  localStorage.setItem("payments", JSON.stringify(payments));
  renderPayments();
}

// Toggle status
function toggleStatus(i) {
  payments[i].status = payments[i].status === "Paid" ? "Pending" : "Paid";
  localStorage.setItem("payments", JSON.stringify(payments));
  renderPayments();
}

// Filter & search
filterStatus.addEventListener("change", () => {
  const val = filterStatus.value;
  const filtered = val === "All" ? payments : payments.filter(p => p.status === val);
  renderPayments(filtered);
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = payments.filter(p => p.student.toLowerCase().includes(term));
  renderPayments(filtered);
});

renderPayments();

// ==== USERS MANAGEMENT ====
const userForm = document.getElementById("userForm");
const userTableBody = document.getElementById("userTableBody");
const searchUser = document.getElementById("searchUser");
const filterRole = document.getElementById("filterRole");

let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers(list = users) {
  userTableBody.innerHTML = "";
  list.forEach((u, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td class="user-role">${u.role}</td>
      <td>
        <button class="action-btn" onclick="editUser(${index})">Edit</button>
        <button class="action-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    name: userName.value,
    email: userEmail.value,
    role: userRole.value,
  };
  if (userForm.dataset.editIndex) {
    // Editing mode
    users[userForm.dataset.editIndex] = user;
    userForm.dataset.editIndex = "";
    userForm.querySelector("button").textContent = "Add User";
  } else {
    users.push(user);
  }
  localStorage.setItem("users", JSON.stringify(users));
  userForm.reset();
  renderUsers();
});

function editUser(index) {
  const u = users[index];
  userName.value = u.name;
  userEmail.value = u.email;
  userRole.value = u.role;
  userForm.dataset.editIndex = index;
  userForm.querySelector("button").textContent = "Update User";
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  }
}

// Search and Filter
searchUser.addEventListener("input", () => {
  const term = searchUser.value.toLowerCase();
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
  );
  renderUsers(filtered);
});

filterRole.addEventListener("change", () => {
  const val = filterRole.value;
  const filtered = val === "All" ? users : users.filter(u => u.role === val);
  renderUsers(filtered);
});

renderUsers();


// ==== REPORTS LOGIC ====
const reportTableBody = document.getElementById("reportTableBody");
const totalTeachers = document.getElementById("totalTeachers");
const totalLearners = document.getElementById("totalLearners");
const totalPayments = document.getElementById("totalPayments");
const pendingPayments = document.getElementById("pendingPayments");

const generateBtn = document.getElementById("generateReport");
const exportCSV = document.getElementById("exportCSV");
const exportExcel = document.getElementById("exportExcel");
const exportPDF = document.getElementById("exportPDF");

// Fetch local data
const usersData = JSON.parse(localStorage.getItem("users")) || [];
const paymentsData = JSON.parse(localStorage.getItem("payments")) || [];

function updateSummary() {
  totalTeachers.textContent = usersData.filter(u => u.role === "Teacher").length;
  totalLearners.textContent = usersData.filter(u => u.role === "Learner").length;
  totalPayments.textContent = paymentsData.filter(p => p.status === "Paid").length;
  pendingPayments.textContent = paymentsData.filter(p => p.status === "Pending").length;
}

function renderReports() {
  reportTableBody.innerHTML = "";
  const reports = [];

  usersData.forEach(u => {
    reports.push({
      category: "User",
      desc: `${u.role} - ${u.name}`,
      date: new Date().toLocaleDateString(),
    });
  });

  paymentsData.forEach(p => {
    reports.push({
      category: "Payment",
      desc: `${p.student} - ${p.status} (${p.amount} KES)`,
      date: new Date().toLocaleDateString(),
    });
  });

  reports.forEach((r, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.category}</td>
      <td>${r.desc}</td>
      <td>${r.date}</td>
    `;
    reportTableBody.appendChild(row);
  });
}

// Export (Mock)
function exportAs(format) {
  alert(`✅ Exported reports as ${format}! (This is a frontend mock; backend export coming soon)`);
}

exportCSV.addEventListener("click", () => exportAs("CSV"));
exportExcel.addEventListener("click", () => exportAs("Excel"));
exportPDF.addEventListener("click", () => exportAs("PDF"));

generateBtn.addEventListener("click", () => {
  updateSummary();
  renderReports();
});

updateSummary();
renderReports();
const profileIcon = document.getElementById("profileIcon");
const dropdown = document.getElementById("profileDropdown");
profileIcon.addEventListener("click", () => {
  dropdown.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });


