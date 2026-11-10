const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const honeyPot = document.getElementById('location')
var loadTime = new Date().getSeconds()

form.addEventListener('submit', async (event) => {
  var submissionTime = new Date().getSeconds()  
  var elapsedTime = submissionTime - loadTime
  
  if (elapsedTime < 3) {
    logger.LogWarning(`Form Submitted to quickly from ${IP}`, HttpContext.Connection.RemoteIpAddress);
    return (
          form.reset(),
          statusEl.textContent = "Thanks, we'll be in touch within one business day.",
          statusEl.classList.add('form-status--success')
        )
  }

  if (honeyPot.value !== "") {
        logger.LogWarning(`Honeypot triggered from ${IP}`, HttpContext.Connection.RemoteIpAddress);
        return (
          form.reset(),
          statusEl.textContent = "Thanks, we'll be in touch within one business day.",
          statusEl.classList.add('form-status--success')
        )
  }

  // event.preventDefault();

  // const button = form.querySelector('button[type="submit"]');
  // button.disabled = true;
  // statusEl.textContent = '';
  // statusEl.className = 'form-status';

  // const data = Object.fromEntries(new FormData(form));


  // // try {
  //   const response = await fetch('/contact', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (!result.ok) {
  //     throw new Error(result.error || 'Something went wrong.');
//   //   }

//     form.reset();
//     statusEl.textContent = "Thanks, we'll be in touch within one business day.";
//     statusEl.classList.add('form-status--success');
//   } catch (error) {
//     statusEl.textContent = error.message || 'Something went wrong. Please email hello@calicomedia.co instead.';
//     statusEl.classList.add('form-status--error');
//   } finally {
//     button.disabled = false;
//   }
});


