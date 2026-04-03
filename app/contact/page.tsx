"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Send, Globe } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build a mailto link as a simple no-backend solution
    const mailtoSubject = encodeURIComponent(formState.subject || "AfroCinema Contact");
    const mailtoBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(`mailto:info@celestialwebsolutions.net?subject=${mailtoSubject}&body=${mailtoBody}`);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="mx-auto h-10 w-10 text-cinema-gold mb-4" />
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONTACT US
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Have a question, suggestion, or just want to say hello? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Info cards */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cinema-gold/10 border border-cinema-gold/20">
                  <Mail className="h-5 w-5 text-cinema-gold" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Email Us</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For general enquiries, reach out at{" "}
                <a href="mailto:info@celestialwebsolutions.net" className="text-cinema-gold hover:underline">
                  info@celestialwebsolutions.net
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cinema-gold/10 border border-cinema-gold/20">
                  <Phone className="h-5 w-5 text-cinema-gold" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Call Us</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Reach us by phone at{" "}
                <a href="tel:0530505031" className="text-cinema-gold hover:underline">
                  053 050 5031
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cinema-gold/10 border border-cinema-gold/20">
                  <Globe className="h-5 w-5 text-cinema-gold" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Developer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built by Celestial Web Solutions.{" "}
                <a href="https://www.celestialwebsolutions.net" target="_blank" rel="noopener noreferrer" className="text-cinema-gold hover:underline">
                  www.celestialwebsolutions.net
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cinema-gold/10 border border-cinema-gold/20">
                  <MessageSquare className="h-5 w-5 text-cinema-gold" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Found a bug or have a feature request? We appreciate all feedback
                — it helps us build a better platform for movie lovers.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-950 border border-green-800 mb-4">
                    <Send className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Message Ready!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Your email client should have opened with the message. If it didn&rsquo;t,
                    you can email us directly at{" "}
                    <a href="mailto:info@celestialwebsolutions.net" className="text-cinema-gold hover:underline">
                      info@celestialwebsolutions.net
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-6 text-sm text-cinema-gold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className="w-full rounded-xl border border-cinema-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className="w-full rounded-xl border border-cinema-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                      className="w-full rounded-xl border border-cinema-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className="w-full rounded-xl border border-cinema-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-cinema-gold px-6 py-2.5 text-sm font-semibold text-cinema-dark transition-opacity hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
