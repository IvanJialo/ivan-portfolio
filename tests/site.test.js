import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')
const es = JSON.parse(read('../src/data/portfolio.es.json'))
const en = JSON.parse(read('../src/data/portfolio.en.json'))

function shape(value, path = '') {
  // Hidden certification entries need editorial confirmation; they are not UI.
  if (path === 'certifications.items') return 'unpublished'
  if (Array.isArray(value)) return value.map((item, index) => shape(item, `${path}.${index}`))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape(value[key], path ? `${path}.${key}` : key)]),
    )
  }
  if (typeof value === 'string') assert.ok(value.trim(), `Empty translation: ${path}`)
  return typeof value
}

test('published ES/EN content has matching translation keys and structures', () => {
  assert.deepEqual(shape(es), shape(en))
})

test('both locales reference the existing PDF files with paths relative to the Pages base', () => {
  const referenced = new Set()
  for (const data of [es, en]) {
    for (const path of Object.values(data.contact.cv)) {
      assert.match(path, /^cv\/[^/]+\.pdf$/)
      const bytes = readFileSync(new URL(`../public/${path}`, import.meta.url))
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-')
      referenced.add(path.slice(3))
    }
  }
  assert.deepEqual(
    [...referenced].sort(),
    readdirSync(new URL('../public/cv/', import.meta.url))
      .filter((name) => name.endsWith('.pdf'))
      .sort(),
  )
})

function color(value) {
  if (value.startsWith('#'))
    return value
      .slice(1)
      .match(/../g)
      .map((part) => parseInt(part, 16))
  return value.match(/[\d.]+/g).map(Number)
}

function luminance(rgb) {
  return rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, index) => sum + v * [0.2126, 0.7152, 0.0722][index], 0)
}

test('theme text pairs meet 4.5:1 contrast for normal text', () => {
  const css = read('../src/assets/main.css')
  for (const theme of ['brutal', 'neon', 'dark']) {
    const block = css.match(new RegExp(`\\[data-theme='${theme}'\\] \\{([^}]+)\\}`))[1]
    const vars = Object.fromEntries(
      [...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]),
    )
    const pairs = ['surface', 'surface-alt'].flatMap((bg) =>
      ['text', 'muted', 'accent-readable', 'accent-2-readable', 'accent-4-readable'].map((fg) => [
        fg,
        bg,
      ]),
    )
    pairs.push(['accent', 'surface-strong'], ['inverse-text', 'surface-strong'])
    for (const accent of ['accent', 'accent-2', 'accent-3', 'accent-4'])
      pairs.push([`${accent}-text`, accent])
    for (const [fg, bg] of pairs) {
      const foreground = color(vars[fg])
      const background = color(vars[bg])
      const alpha = foreground[3] ?? 1
      const blended = foreground.slice(0, 3).map((v, i) => v * alpha + background[i] * (1 - alpha))
      const [dark, light] = [luminance(blended), luminance(background)].sort((a, b) => a - b)
      const contrast = (light + 0.05) / (dark + 0.05)
      assert.ok(contrast >= 4.5, `${theme}: ${fg} on ${bg} = ${contrast.toFixed(2)}:1`)
    }
  }
})
