import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from 'astro:env/server';
import { contact } from '../data/contact';

// Contact form handler. This is the only part of the site that runs on
// demand — every page stays prerendered; the adapter in astro.config.mjs
// exists solely so this can be a Vercel function.
//
// Mail goes out through Resend's REST API (no SDK — one fetch call is the
// whole integration). `onboarding@resend.dev` is Resend's sandbox sender:
// it works with no domain verification but can only deliver to the address
// that owns the Resend account, which is exactly this use case. Set
// CONTACT_FROM_EMAIL to an address on a verified domain to send from your
// own domain instead.
const RESEND_SANDBOX_SENDER = 'onboarding@resend.dev';

// Submissions faster than this are almost certainly bots, not people.
const MIN_FILL_MS = 3000;

export const server = {
  sendMessage: defineAction({
    accept: 'form',
    // Every check carries its own plain-language message — a check without
    // one falls back to zod's default wording ("Invalid input: expected
    // string, received null"), which is meaningless to a visitor.
    //
    // The `error` on z.string() itself matters most: Astro turns an empty
    // form field into null, so a blank submit fails the type check before
    // .min() ever runs. Without it, the .min() messages would never show.
    input: z.object({
      name: z
        .string({ error: 'Please enter your name.' })
        .trim()
        .min(1, 'Please enter your name.')
        .max(100, 'Please keep your name under 100 characters.'),
      email: z
        .string({ error: 'Please enter your email address.' })
        .trim()
        .min(1, 'Please enter your email address.')
        .email("That email address doesn't look quite right — please check it."),
      message: z
        .string({ error: 'Please write a short message.' })
        .trim()
        .min(10, 'Please add a little more detail — a sentence or two is plenty.')
        .max(5000, 'Your message is a little long. Please keep it under 5,000 characters.'),
      // Honeypot — hidden from real users, so anything here means a bot.
      website: z.string().optional(),
      // Time trap — set by the client when the form is first rendered.
      // .catch() so a malformed value just skips the check instead of
      // producing a validation error for a field the visitor can't see.
      startedAt: z.coerce.number().optional().catch(undefined),
    }),
    handler: async ({ name, email, message, website, startedAt }) => {
      // Report success to bots rather than an error, so a probe learns
      // nothing about which check caught it.
      if (website) return { ok: true };
      if (startedAt && Date.now() - startedAt < MIN_FILL_MS) return { ok: true };

      const recipient = CONTACT_TO_EMAIL ?? contact.email;

      if (!RESEND_API_KEY) {
        // In dev, print the message to the terminal so the whole form flow
        // can be exercised before a Resend account exists. In production a
        // missing key is a real misconfiguration, so it still errors.
        if (import.meta.env.DEV) {
          console.info(
            `\n[contact form] no RESEND_API_KEY set — would have emailed ${recipient}:\n` +
              `  from: ${name} <${email}>\n  message: ${message}\n`,
          );
          return { ok: true };
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Email delivery is not configured yet.',
        });
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL ?? RESEND_SANDBOX_SENDER,
          to: recipient,
          reply_to: email,
          subject: `[LEAD] message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!response.ok) {
        // Surface the provider's reason in the server logs — the most common
        // causes are an unverified sending domain or a bad API key, and
        // neither is diagnosable from the generic message below.
        console.error('Resend rejected the message:', response.status, await response.text());
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not send the message right now.',
        });
      }

      return { ok: true };
    },
  }),
};
