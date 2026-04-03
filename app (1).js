document.addEventListener('DOMContentLoaded', () => {
  const shutdownDate = new Date('2026-06-01T00:00:00'); // June 1st, 2026
  const now = new Date();

  const form = document.getElementById('support-form');
  const shutdownNotice = document.getElementById('shutdown-notice');

  if(now >= shutdownDate){
    form.innerHTML = `<h1>RecTuberMultiShow Support Page Closed</h1>
    <p>Support services are no longer available. Thank you to everyone who participated in our community over the years. For final event info visit: rec.net/event/6501106448901981684</p>`;
    shutdownNotice.style.display = 'none';
    return;
  }

  const fields = {
    email: form.elements['email'],
    username: form.elements['username'],
    issue: form.elements['issue'],
    subject: form.elements['subject'],
    priority: form.elements['priority'],
    message: form.elements['message'],
  };

  const errors = {
    email: document.getElementById('email-error'),
    username: document.getElementById('username-error'),
    issue: document.getElementById('issue-error'),
    subject: document.getElementById('subject-error'),
    priority: document.getElementById('priority-error'),
    message: document.getElementById('message-error'),
  };

  const validators = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    username: v => /^@.+/.test(v),
    issue: v => v !== "",
    subject: v => v.trim() !== "",
    priority: v => v !== "",
    message: v => v.trim() !== "",
  };

  function validateField(name){
    const value = fields[name].value.trim();
    const valid = validators[name](value);
    if(!valid){ errors[name].style.display='block'; fields[name].setAttribute('aria-invalid','true'); }
    else{ errors[name].style.display='none'; fields[name].removeAttribute('aria-invalid'); }
    return valid;
  }

  function validateForm(){
    let valid = true;
    for(const name in fields){
      if(!validateField(name)) valid=false;
    }
    return valid;
  }

  for(const name in fields){
    fields[name].addEventListener('input', ()=>validateField(name));
  }

  const fileInput = document.getElementById('files');
  const fileListDisplay = document.getElementById('file-list');

  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    fileListDisplay.innerHTML = files.map(f=>`<div>${f.name}</div>`).join('');
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!validateForm()){
      for(const name in fields){
        if(fields[name].getAttribute('aria-invalid')==='true'){ fields[name].focus(); break; }
      }
      return;
    }

    document.getElementById('loading').classList.add('status-visible');
    document.getElementById('thank-you').classList.remove('status-visible');

    const formData = new FormData(form);
    fetch(form.action,{ method:'POST', body:formData, headers:{ Accept:'application/json' }})
      .then(response=>{
        document.getElementById('loading').classList.remove('status-visible');
        if(response.ok){
          document.getElementById('thank-you').classList.add('status-visible');
          form.reset();
          fileListDisplay.innerHTML='';
          if(window.grecaptcha) grecaptcha.reset();
        } else { alert('Submission error. Try again.'); }
      })
      .catch(()=>{
        document.getElementById('loading').classList.remove('status-visible');
        alert('Network error. Check your connection.');
      });
  });
});
