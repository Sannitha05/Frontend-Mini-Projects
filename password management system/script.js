// Password Generator
function generatePassword(length = 12) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const chars = upper + lower + numbers + symbols;
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Save password entry to localStorage
function savePassword(site, username, password) {
  let entries = JSON.parse(localStorage.getItem('passwords') || '[]');
  entries.push({
    site,
    username,
    password
  });
  localStorage.setItem('passwords', JSON.stringify(entries));
}

// Display saved passwords
function displayPasswords() {
  const list = document.getElementById('password-list');
  const entries = JSON.parse(localStorage.getItem('passwords') || '[]');
  list.innerHTML = '';
  entries.forEach((entry, idx) => {
    list.innerHTML += `<div>
      <span><strong>${entry.site}</strong> | ${entry.username} | ${entry.password}</span>
      <button onclick="deletePassword(${idx})">Delete</button>
    </div>`;
  });
}

// Delete a password entry
function deletePassword(index) {
  let entries = JSON.parse(localStorage.getItem('passwords') || '[]');
  entries.splice(index, 1);
  localStorage.setItem('passwords', JSON.stringify(entries));
  displayPasswords();
}

// Event listeners
document.getElementById('generate').onclick = function () {
  document.getElementById('password').value = generatePassword();
};

document.getElementById('save').onclick = function () {
  const site = document.getElementById('site').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (site && username && password) {
    savePassword(site, username, password);
    displayPasswords();
    document.getElementById('site').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  } else {
    alert('Please fill all fields!');
  }
};

// Initial load
window.onload = displayPasswords;

// Make deletePassword globally accessible
window.deletePassword = deletePassword;