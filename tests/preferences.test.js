import test from 'node:test'
import assert from 'node:assert/strict'
import { readPreference, savePreference } from '../src/utils/preferences.js'

test('preferences validate values and survive unavailable or full browser storage', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const values = new Map([
    ['language', 'es'],
    ['theme', 'terminal'],
  ])
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
      },
    })
    assert.equal(readPreference('language', ['en', 'es'], 'en'), 'es')
    assert.equal(
      readPreference('theme', ['brutal', 'neon', 'dark', 'terminal'], 'brutal'),
      'terminal',
    )
    for (const invalid of ['fr', '', 'ES', 'null']) {
      values.set('language', invalid)
      assert.equal(readPreference('language', ['en', 'es'], 'en'), 'en')
    }
    assert.equal(readPreference('missing', ['en', 'es'], 'en'), 'en')
    savePreference('language', 'es')
    assert.equal(values.get('language'), 'es')
    globalThis.localStorage.setItem = () => {
      throw new Error('quota exceeded')
    }
    assert.doesNotThrow(() => savePreference('language', 'en'))

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('storage blocked')
      },
    })
    assert.equal(readPreference('language', ['en', 'es'], 'en'), 'en')
    assert.doesNotThrow(() => savePreference('language', 'es'))
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original)
    else delete globalThis.localStorage
  }
})
