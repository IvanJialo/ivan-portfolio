<script setup>
import { nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { formspreeEndpoint, sendContact, validateContact } from '../utils/contact'

defineProps({ texts: { type: Object, required: true } })
const endpoint = formspreeEndpoint(import.meta.env.VITE_FORMSPREE_FORM_ID)
const fields = reactive({ name: '', email: '', subject: '', message: '', _gotcha: '' })
const errors = ref({})
const status = ref('')
const sending = ref(false)
const form = ref(null)
let controller
function clearFeedback(field) {
  status.value = ''
  delete errors.value[field]
}
onBeforeUnmount(() => controller?.abort())
async function submit() {
  if (sending.value) return
  status.value = ''
  errors.value = validateContact(fields)
  if (Object.keys(errors.value).length) {
    status.value = 'validationError'
    await nextTick()
    form.value?.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  if (!endpoint) {
    status.value = 'unavailable'
    return
  }
  if (fields._gotcha) {
    status.value = 'sendError'
    return
  }
  sending.value = true
  controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)
  try {
    await sendContact(endpoint, fields, controller.signal)
    status.value = 'success'
    Object.keys(fields).forEach((key) => {
      fields[key] = ''
    })
  } catch (error) {
    status.value =
      error.message === 'rateLimited'
        ? 'rateLimited'
        : error.name === 'AbortError'
          ? 'timeout'
          : 'sendError'
  } finally {
    clearTimeout(timeout)
    sending.value = false
  }
}
</script>
<template>
  <form ref="form" class="mt-8 space-y-5" novalidate :aria-busy="sending" @submit.prevent="submit">
    <p class="text-sm font-semibold text-[var(--muted)]">{{ texts.intro }}</p>
    <p v-if="!endpoint" class="border-2 border-[var(--border)] p-3">{{ texts.unavailable }}</p>
    <fieldset :disabled="sending || !endpoint" class="min-w-0 space-y-5 disabled:opacity-70">
      <legend class="sr-only">{{ texts.title }}</legend>
      <div v-for="field in ['name', 'email', 'subject', 'message']" :key="field">
        <label :for="`contact-${field}`" class="mb-2 block font-bold">{{ texts[field] }}</label>
        <textarea
          v-if="field === 'message'"
          id="contact-message"
          v-model="fields.message"
          name="message"
          rows="6"
          required
          maxlength="5000"
          class="contact-input resize-y"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? 'contact-message-error' : undefined"
          @input="clearFeedback('message')"
        />
        <input
          v-else
          :id="`contact-${field}`"
          v-model="fields[field]"
          :name="field"
          :type="field === 'email' ? 'email' : 'text'"
          :required="field !== 'subject'"
          :autocomplete="field === 'subject' ? 'off' : field"
          :maxlength="field === 'name' ? 100 : field === 'email' ? 254 : 200"
          class="contact-input"
          :aria-invalid="Boolean(errors[field])"
          :aria-describedby="errors[field] ? `contact-${field}-error` : undefined"
          @input="clearFeedback(field)"
        />
        <p v-if="errors[field]" :id="`contact-${field}-error`" class="mt-2 text-sm font-bold">
          {{ texts[errors[field]] }}
        </p>
      </div>
      <div hidden aria-hidden="true">
        <label for="contact-gotcha">{{ texts.leaveEmpty }}</label>
        <input
          id="contact-gotcha"
          v-model="fields._gotcha"
          name="_gotcha"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />
      </div>
      <p class="text-sm text-[var(--muted)]">{{ texts.privacy }}</p>
      <button
        type="submit"
        class="w-full border-4 border-[var(--border)] bg-[var(--accent)] px-4 py-3 font-black uppercase text-[var(--accent-text)] shadow-[4px_4px_0_var(--shadow)] disabled:cursor-wait"
      >
        {{ sending ? texts.sending : texts.submit }}
      </button>
    </fieldset>
    <p role="status" aria-live="polite" aria-atomic="true" class="font-bold">
      {{ status ? texts[status] : '' }}
    </p>
  </form>
</template>
<style scoped>
.contact-input {
  display: block;
  width: 100%;
  min-width: 0;
  border: 3px solid var(--border);
  background: var(--surface-alt);
  color: var(--text);
  padding: 0.75rem;
}
.contact-input:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
}
.contact-input[aria-invalid='true'] {
  border-style: dashed;
}
</style>
