import { useCallback, useState, type FormEvent } from 'react'
import { sendContactEmail } from '@/lib/sendContactEmail'

type FormFields = {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MIN = 10

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()

  if (!name) errors.name = 'required'
  else if (name.length < 2) errors.name = 'too short'

  if (!email) errors.email = 'required'
  else if (!EMAIL_RE.test(email)) errors.email = 'invalid email'

  if (!message) errors.message = 'required'
  else if (message.length < MESSAGE_MIN) {
    errors.message = `min ${MESSAGE_MIN} characters`
  }

  return errors
}

const fieldErrorMessage = (key: string | undefined) => {
  if (!key) return null
  return key
}

export function ContactTerminalForm() {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [stderr, setStderr] = useState<string | null>(null)

  const updateField = useCallback(
    (key: keyof FormFields, value: string) => {
      setFields((prev) => ({ ...prev, [key]: value }))
      if (fieldErrors[key]) {
        setFieldErrors((prev) => {
          const next = { ...prev }
          delete next[key]
          return next
        })
      }
      if (submitState === 'error') setStderr(null)
    },
    [fieldErrors, submitState],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (submitState === 'success') return

      const errors = validate(fields)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setSubmitState('error')
        setStderr('validation failed: fix fields above')
        return
      }

      setFieldErrors({})
      setStderr(null)
      setSubmitState('submitting')

      const result = await sendContactEmail({
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      })

      if (result.ok) {
        setSubmitState('success')
        setFields({ name: '', email: '', message: '' })
        return
      }

      setSubmitState('error')
      setStderr(result.message)
    },
    [fields, submitState],
  )

  const disabled = submitState === 'submitting' || submitState === 'success'

  const inputClass =
    'terminal-field w-full min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm text-text outline-none placeholder:text-muted/50 focus:ring-0 disabled:opacity-60'

  return (
    <div className="neon-border overflow-hidden rounded-xl border border-cyan/20 bg-surface shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]">
      <div
        className="flex items-center gap-2 border-b border-white/5 bg-bg/80 px-4 py-2.5"
        aria-hidden
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted">
          contact — transmit
        </span>
      </div>

      {submitState === 'success' ? (
        <div
          className="p-4 font-mono text-sm md:p-5"
          role="status"
          aria-live="polite"
        >
          <p className="text-muted">
            <span className="text-acid/90">&gt;</span> status
          </p>
          <p className="mt-2 text-[#28c840]">
            transmission sent_
            <span
              className="hero-terminal-cursor ml-0.5 inline-block text-[#28c840]"
              aria-hidden
            >
              ▌
            </span>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 font-mono text-sm md:p-5"
          noValidate
        >
          <div>
            <label className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="shrink-0 text-muted">
                <span className="text-acid/90">&gt;</span> name:
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                disabled={disabled}
                value={fields.name}
                onChange={(e) => updateField('name', e.target.value)}
                aria-invalid={fieldErrors.name ? true : undefined}
                aria-describedby={
                  fieldErrors.name ? 'contact-name-error' : undefined
                }
                className={inputClass}
                placeholder="your name"
              />
            </label>
            {fieldErrors.name && (
              <p
                id="contact-name-error"
                className="mt-1 pl-4 text-xs text-magenta"
              >
                {fieldErrorMessage(fieldErrors.name)}
              </p>
            )}
          </div>

          <div>
            <label className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="shrink-0 text-muted">
                <span className="text-acid/90">&gt;</span> email:
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                disabled={disabled}
                value={fields.email}
                onChange={(e) => updateField('email', e.target.value)}
                aria-invalid={fieldErrors.email ? true : undefined}
                aria-describedby={
                  fieldErrors.email ? 'contact-email-error' : undefined
                }
                className={inputClass}
                placeholder="you@domain.com"
              />
            </label>
            {fieldErrors.email && (
              <p
                id="contact-email-error"
                className="mt-1 pl-4 text-xs text-magenta"
              >
                {fieldErrorMessage(fieldErrors.email)}
              </p>
            )}
          </div>

          <div>
            <label className="flex flex-col gap-1">
              <span className="text-muted">
                <span className="text-acid/90">&gt;</span> message:
              </span>
              <textarea
                name="message"
                rows={4}
                disabled={disabled}
                value={fields.message}
                onChange={(e) => updateField('message', e.target.value)}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={
                  fieldErrors.message ? 'contact-message-error' : undefined
                }
                className={`${inputClass} resize-y min-h-[6rem] border-l-2 border-white/10 pl-3`}
                placeholder="what are we building?"
              />
            </label>
            {fieldErrors.message && (
              <p
                id="contact-message-error"
                className="mt-1 pl-4 text-xs text-magenta"
              >
                {fieldErrorMessage(fieldErrors.message)}
              </p>
            )}
          </div>

          {stderr && (
            <p className="text-xs text-magenta" role="alert">
              <span className="text-muted">stderr:</span> {stderr}
            </p>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={disabled}
              className="cursor-target rounded-lg border border-cyan/30 bg-bg/60 px-4 py-2 text-xs uppercase tracking-wider text-text transition-colors hover:border-acid/50 hover:text-acid disabled:pointer-events-none disabled:opacity-50"
            >
              {submitState === 'submitting' ? 'sending…' : 'execute send'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
