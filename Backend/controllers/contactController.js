import { Resend } from 'resend';

const CONTACT_RATE_WINDOW_MS = 60 * 60 * 1000;
const CONTACT_RATE_LIMIT = 3;
const contactAttempts = new Map();

const createResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getClientIp = (req) =>
  req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
  req.socket.remoteAddress ||
  'unknown';

const isRateLimited = (ip) => {
  const now = Date.now();
  const attempts = (contactAttempts.get(ip) || []).filter(
    (timestamp) => now - timestamp < CONTACT_RATE_WINDOW_MS,
  );

  if (attempts.length >= CONTACT_RATE_LIMIT) {
    contactAttempts.set(ip, attempts);
    return true;
  }

  attempts.push(now);
  contactAttempts.set(ip, attempts);
  return false;
};

const sendContactMessage = async (req, res) => {
  const ip = getClientIp(req);
  const { name = '', email = '', message = '', website = '' } = req.body;

  if (website) {
    return res.status(200).json({ message: 'Thanks for reaching out.' });
  }

  if (isRateLimited(ip)) {
    return res.status(429).json({
      message: 'Too many contact requests. Please try again later.',
    });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanMessage = String(message).trim();

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({ message: 'Please enter a valid name.' });
  }

  if (!isValidEmail(cleanEmail) || cleanEmail.length > 120) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (cleanMessage.length < 20 || cleanMessage.length > 2000) {
    return res.status(400).json({
      message: 'Please enter a message between 20 and 2000 characters.',
    });
  }

  const urls = cleanMessage.match(/https?:\/\/[^\s]+/gi) || [];
  if (urls.length > 2) {
    return res.status(400).json({
      message: 'Your message contains too many links. Please remove extra URLs.',
    });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const resendClient = createResendClient();
  if (!resendClient || !to) {
    console.error('Resend is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.');
    return res.status(503).json({
      message: 'Contact form is not configured yet. Please try again later.',
    });
  }

  try {
    await resendClient.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Growthify Contact <onboarding@resend.dev>',
      to,
      replyTo: cleanEmail,
      subject: `New Growthify message from ${cleanName}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>IP:</strong> ${ip}</p>
        <hr/>
        <p>${cleanMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.json({ message: 'Thanks for reaching out. I will get back to you soon.' });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({
      message: 'Failed to send message. Please try again later.',
    });
  }
};

export { sendContactMessage };