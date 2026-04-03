"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is AfroCinema?",
    answer:
      "AfroCinema is a movie discovery platform that brings together Nollywood, Bollywood, and Hollywood movies in one place. We help you find where to watch your favourite films across Netflix, YouTube, and other streaming services.",
  },
  {
    question: "Is AfroCinema free to use?",
    answer:
      "Yes! AfroCinema is completely free. We don't charge anything to browse movies, read reviews, or find streaming links. Some movies we link to are also free to watch on YouTube.",
  },
  {
    question: "Does AfroCinema stream movies?",
    answer:
      "No. AfroCinema does not host or stream any movies. We provide information about movies and link you to legitimate platforms like Netflix and YouTube where you can watch them.",
  },
  {
    question: "Where does the movie data come from?",
    answer:
      "Movie information for Hollywood and Bollywood films comes from The Movie Database (TMDB) API. Nollywood movie data is curated by our team and stored in our own database.",
  },
  {
    question: "How do I watch a Nollywood movie?",
    answer:
      "On each Nollywood movie's detail page, you'll see streaming badges showing where the movie is available. Look for the 'Watch on Netflix' or 'Watch Free on YouTube' buttons. Movies marked as 'FREE' can be watched at no cost on YouTube.",
  },
  {
    question: "Why are some movie images not loading?",
    answer:
      "Movie images are served from TMDB's image servers. If images aren't loading, it could be due to a slow internet connection, a temporary issue with TMDB's servers, or a VPN/firewall blocking external image requests.",
  },
  {
    question: "Can I request a movie to be added?",
    answer:
      "We're always expanding our Nollywood catalogue! If there's a movie you'd love to see on AfroCinema, reach out through our Contact page and we'll do our best to add it.",
  },
  {
    question: "Why do some movies show 'Not streaming yet'?",
    answer:
      "Not all movies are available on streaming platforms. Some films may only be available in cinemas, on DVD, or on regional platforms we haven't indexed yet. We update streaming links as they become available.",
  },
  {
    question: "Is AfroCinema affiliated with Netflix or YouTube?",
    answer:
      "No. AfroCinema is an independent platform and is not affiliated with, endorsed by, or sponsored by Netflix, YouTube, TMDB, or any streaming service.",
  },
  {
    question: "How often is the movie data updated?",
    answer:
      "Hollywood and Bollywood movie data is refreshed from TMDB every hour. Nollywood movies are updated manually by our team as new films are added to the database.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-cinema-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-cinema-surface/50 transition-colors"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="px-6 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="mx-auto h-10 w-10 text-cinema-gold mb-4" />
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Got questions? We&rsquo;ve got answers. Find everything you need to know about AfroCinema below.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}
