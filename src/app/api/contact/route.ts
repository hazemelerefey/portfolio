import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { applyRateLimit, hasJsonContentType, requestIsTooLarge } from '@/lib/server-security';

const MAX_CONTACT_REQUEST_BYTES = 16_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    try {
        if (!hasJsonContentType(req)) {
            return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
        }

        if (requestIsTooLarge(req, MAX_CONTACT_REQUEST_BYTES)) {
            return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
        }

        const rateLimit = applyRateLimit(req, 'contact');
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
            );
        }

        const { name, email, subject, message, website } = await req.json();

        // Silent success makes this hidden bot-trap non-actionable to automated submitters.
        if (typeof website === 'string' && website.trim()) {
            return NextResponse.json({ message: 'Message received.' }, { status: 200 });
        }

        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof subject !== 'string' ||
            typeof message !== 'string' ||
            !name.trim() ||
            !email.trim() ||
            !subject.trim() ||
            !message.trim() ||
            name.length > 80 ||
            email.length > 254 ||
            subject.length > 160 ||
            message.length > 5_000 ||
            !EMAIL_PATTERN.test(email.trim())
        ) {
            return NextResponse.json({ error: 'Invalid form submission' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_APP_PASSWORD || ''
            },
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || 'No Subject');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || '',
            to: process.env.EMAIL_USER || '', // Where you want to receive the messages
            subject: `New Message: ${safeSubject.replace(/[\r\n]/g, ' ')}`,
            disableFileAccess: true,
            disableUrlAccess: true,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h3 style="color: #333;">You have a new message from your website!</h3>
                    <p><strong>Name: </strong> ${safeName}</p>
                    <p><strong>Email: </strong> ${safeEmail}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Unable to send your message right now.' }, { status: 500 });
    }
}
