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

  function isShutdown() {
    return new Date() >= shutdownDate;
  }

  function updateFieldState(name) {
    const field = fields[name];
    if (!field) return;

    const valid = validators[name](field.value);

    if (field.value.trim() === "") {
      field.removeAttribute("aria-invalid");
      return;
    }

    if (!valid) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }

  function validateAll() {
    let ok = true;
    for (const name in fields) {
      const field = fields[name];
      const valid = validators[name](field.value);

      if (!valid) {
        field.reportValidity();
        ok = false;
      }
    }
    return ok;
  }

  if (isShutdown()) {
    showClosedState();
    return;
  }

  Object.keys(fields).forEach(name => {
    fields[name].addEventListener("input", () => updateFieldState(name));
    fields[name].addEventListener("change", () => updateFieldState(name));
  });

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files || []);
    fileList.innerHTML = files.map(file => `<div>${file.name}</div>`).join("");
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (isShutdown()) {
      showClosedState();
      return;
    }

    if (!validateAll()) {
      form.reportValidity();
      return;
    }

    loading.style.display = "block";
    thankYou.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      loading.style.display = "none";

      if (response.ok) {
        thankYou.style.display = "block";
        form.reset();
        fileList.innerHTML = "";
        if (window.grecaptcha) {
          grecaptcha.reset();
        }
      } else {
        alert("Submission error. Try again.");
      }
    } catch {
      loading.style.display = "none";
      alert("Network error. Check your connection.");
    }
  });
});
