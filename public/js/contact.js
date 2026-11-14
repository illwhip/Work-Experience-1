const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const honeyPot = document.getElementById('location')
var loadTime = Date.now()

form.addEventListener('submit', async (event) => {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  statusEl.textContent = '';
  statusEl.className = 'form-status';
  var submissionTime = Date.now();  
  var elapsedTime = submissionTime - loadTime;

  event.preventDefault();

  if (elapsedTime < 3000) {
    console.warn(`Form Submitted to quickly`)
    return (
      form.reset(),
      statusEl.textContent = "Thanks, we'll be in touch within one business day.",
      statusEl.classList.add('form-status--success'),
      button.disabled = false
    )
  }

  if (honeyPot.value !== "") {
    console.warn(`Honeypot triggered`)
    return (
      form.reset(),
      statusEl.textContent = "Thanks, we'll be in touch within one business day.",
      statusEl.classList.add('form-status--success'),
      button.disabled = false
    )
  }

  const data = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error || 'Something went wrong.');
    }

    form.reset();
    statusEl.textContent = "Thanks, we'll be in touch within one business day.";
    statusEl.classList.add('form-status--success');
  } catch (error) {
    statusEl.textContent = error.message || 'Something went wrong. Please email hello@calicomedia.co instead.';
    statusEl.classList.add('form-status--error');
  } finally {
    button.disabled = false;
  }
});


