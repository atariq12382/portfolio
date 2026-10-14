import emailjs from '@emailjs/browser'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type SendContactResult =
  | { ok: true }
  | { ok: false; reason: 'config' | 'network'; message: string }

function getEmailJsConfig() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

  if (!publicKey || !serviceId || !templateId) {
    return null
  }

  return { publicKey, serviceId, templateId }
}

export async function sendContactEmail(
  payload: ContactPayload,
): Promise<SendContactResult> {
  const config = getEmailJsConfig()
  if (!config) {
    return {
      ok: false,
      reason: 'config',
      message:
        'Contact form is not configured. Set VITE_EMAILJS_* env variables.',
    }
  }

  try {
    await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        from_name: payload.name,
        reply_to: payload.email,
        message: payload.message,
      },
      config.publicKey,
    )
    return { ok: true }
  } catch {
    return {
      ok: false,
      reason: 'network',
      message: 'Transmission failed. Check your connection and try again.',
    }
  }
}
