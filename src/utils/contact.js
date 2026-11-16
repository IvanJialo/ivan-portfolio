export function formspreeEndpoint(id = '') {
  const value = id.trim()
  return /^[a-zA-Z0-9]{6,64}$/.test(value) ? `https://formspree.io/f/${value}` : null
}

export function validateContact(fields) {
  const errors = {}
  if (!fields.name.trim() || fields.name.trim().length > 100) errors.name = 'nameError'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) || fields.email.length > 254)
    errors.email = 'emailError'
  if (fields.subject.trim().length > 200) errors.subject = 'subjectError'
  if (!fields.message.trim() || fields.message.trim().length > 5000) errors.message = 'messageError'
  return errors
}

export async function sendContact(endpoint, fields, signal) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    // Only send fields declared by this form, never incidental UI state.
    body: JSON.stringify({
      name: fields.name.trim(),
      email: fields.email.trim(),
      subject: fields.subject.trim(),
      message: fields.message.trim(),
      _gotcha: fields._gotcha.trim(),
    }),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal,
  })
  if (!response.ok) throw new Error(response.status === 429 ? 'rateLimited' : 'sendError')
  const result = await response.json()
  if (result?.ok !== true) throw new Error('sendError')
}
