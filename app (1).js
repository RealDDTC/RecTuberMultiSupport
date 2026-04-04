document.addEventListener("DOMContentLoaded", () => {
  const shutdownDate = new Date("2026-06-01T12:00:00-07:00");
  const openState = document.getElementById("open-state");
  const closedState = document.getElementById("closed-state");
  const form = document.getElementById("support-form");
  const fileInput = document.getElementById("files");
  const fileList = document.getElementById("file-list");
  const loading = document.getElementById("loading");
  const thankYou = document.getElementById("thank-you");

  const fields = {
    email: document.getElementById("email"),
    username: document.getElementById("username"),
    issue: document.getElementById("issue"),
    priority: document.getElementById("priority"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };

  const errors = {
    email: document.getElementById("email-error"),
    username: document.getElementById("username-error"),
    issue: document.getElementById("issue-error"),
    priority: document.getElementById("priority-error"),
    subject: document.getElementById("subject-error"),
    message: document.getElementById("message-error")
  };

  const validators = {
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    username: value => /^@.+/.test(value.trim()),
    issue: value => value.trim() !== "",
    priority: value => value.trim() !== "",
    subject: value => value.trim().length >= 3,
    message: value => value.trim().length >= 10
  };

  function showClosedState() {
    openState.hidden = true;
    closedState.hidden = false;
  }

  function checkShutdown() {
    const now = new Date();
    if (now >= shutdownDate) {
      showClosedState();
      return true;
    }
    return false;
  }

  function validateField(name) {
    const value = fields[name].value;
    const valid = validators[name](value);

    if (!valid) {
      errors[name].style.display = "block";
      fields[name].setAttribute("aria-invalid", "true");
    } else {
      errors[name].style.display = "none";
      fields[name].removeAttribute("aria-invalid");
    }

    return valid;
  }

  function validateForm() {
    let valid = true;
    for (const name in fields) {
      if (!validateField(name)) valid = false;
    }
    return valid;
  }

  if (checkShutdown()) return;

  Object.keys(fields).forEach(name => {
    fields[name].addEventListener("input", () => validateField(name));
    fields[name].addEventListener("change", () => validateField(name));
  });

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files || []);
    fileList.innerHTML = files.map(file => `<div>${file.name}</div>`).join("");
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (checkShutdown()) return;
    if (!validateForm()) return;

    loading.style.display = "block";
    thankYou.style.display = "none";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(response => {
        loading.style.display = "none";
        if (response.ok) {
          thankYou.style.display = "block";
          form.reset();
          fileList.innerHTML = "";
          if (window.grecaptcha) grecaptcha.reset();
        } else {
          alert("Submission error. Try again.");
        }
      })
      .catch(() => {
        loading.style.display = "none";
        alert("Network error. Check your connection.");
      });
  });
});
