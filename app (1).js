document.addEventListener("DOMContentLoaded", () => {
  const shutdownDate = new Date("2026-06-01T00:00:00-04:00");
  const openState = document.getElementById("open-state");
  const closedState = document.getElementById("closed-state");
  const form = document.getElementById("support-form");
  const fileInput = document.getElementById("files");
  const fileList = document.getElementById("file-list");
  const loading = document.getElementById("loading");
  const thankYou = document.getElementById("thank-you");
  const submitBtn = document.getElementById("submit-btn");

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
    email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    username: val => /^@.+/.test(val.trim()),
    issue: val => val.trim() !== "",
    priority: val => val.trim() !== "",
    subject: val => val.trim().length >= 3,
    message: val => val.trim().length >= 10
  };

  function showClosedState() {
    openState.hidden = true;
    closedState.hidden = false;
  }

  function showOpenState() {
    openState.hidden = false;
    closedState.hidden = true;
  }

  function checkShutdown() {
    const now = new Date();
    if (now >= shutdownDate) {
      showClosedState();
      return true;
    }
    showOpenState();
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

  function updateSubmitState() {
    submitBtn.disabled = !validateForm();
  }

  if (checkShutdown()) return;

  Object.keys(fields).forEach(name => {
    fields[name].addEventListener("input", updateSubmitState);
    fields[name].addEventListener("change", updateSubmitState);
  });

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files || []);
    fileList.innerHTML = files.map(file => `<div>${file.name}</div>`).join("");
  });

  updateSubmitState();

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (checkShutdown()) return;
    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
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
      })
      .finally(() => {
        submitBtn.textContent = "Submit Request";
        updateSubmitState();
      });
  });
});
