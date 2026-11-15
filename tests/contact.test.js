import test from 'node:test'
import assert from 'node:assert/strict'
import { formspreeEndpoint, validateContact, sendContact } from '../src/utils/contact.js'
const fields = {
  name: ' Test ',
  email: 'test@example.com',
  subject: '',
  message: ' Hello ',
  _gotcha: '',
}
test('only a public form ID can form the endpoint', () => {
  assert.equal(formspreeEndpoint(), null)
  assert.equal(formspreeEndpoint('https://evil.example'), null)
  assert.equal(formspreeEndpoint('abcdefgh'), 'https://formspree.io/f/abcdefgh')
})
test('required fields, whitespace, email and size limits', () => {
  assert.deepEqual(validateContact(fields), {})
  assert.deepEqual(
    Object.keys(
      validateContact({ name: ' ', email: 'bad', subject: 'x'.repeat(201), message: ' ' }),
    ),
    ['name', 'email', 'subject', 'message'],
  )
  assert.equal(validateContact({ ...fields, message: 'x'.repeat(5001) }).message, 'messageError')
})
test('request payload and explicit acceptance; mock only, no delivery test', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/abcdefgh')
    assert.equal(options.method, 'POST')
    assert.equal(options.headers.Accept, 'application/json')
    assert.deepEqual(JSON.parse(options.body), { ...fields, name: 'Test', message: 'Hello' })
    return { ok: true, json: async () => ({ ok: true }) }
  })
  await sendContact('https://formspree.io/f/abcdefgh', fields)
})
test('HTTP errors, rate limiting, invalid responses and network failures reject', async (t) => {
  for (const status of [400, 403, 422, 429, 500]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status }))
    await assert.rejects(
      sendContact('unused', fields),
      new RegExp(status === 429 ? 'rateLimited' : 'sendError'),
    )
    mock.mock.restore()
  }
  const mock = t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    json: async () => ({}),
  }))
  await assert.rejects(sendContact('unused', fields), /sendError/)
  mock.mock.restore()
  t.mock.method(globalThis, 'fetch', async () => {
    throw new TypeError('offline')
  })
  await assert.rejects(sendContact('unused', fields), /offline/)
})
