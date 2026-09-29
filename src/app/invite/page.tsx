"use client";

import Link from "next/link";
import { useState } from "react";

const repositoryUrl = "https://github.com/Josh1-crae/fieldnotes-portfolio";
const coffeeSpots = [
  { id: "corner", name: "A cozy corner", detail: "Little tables, very good coffee." },
  { id: "sunny", name: "Somewhere sunny", detail: "Window seats and a slow afternoon." },
  { id: "favorite", name: "Your favorite place", detail: "You choose. I’ll be there." },
  { id: "new", name: "Somewhere new", detail: "A tiny adventure, with caffeine." },
];
const noLabels = [
  "No", "Still no?", "A firm no?", "You’re sure?", "Really sure?", "Coffee’s quite nice…", "Still a no?", "Boundaries respected", "One last no?", "Absolutely not?",
  "Nope?", "Still thinking?", "The mug is ready…", "Not even a little?", "No, but politely?", "You remain unconvinced?", "The offer stands…", "Still a no, then?", "No with confidence?", "I admire the resolve.",
  "A very definite no?", "I can wait…", "Last little ask?", "Still not today?", "No thanks",
];
const noMessages = [
  "Okay, I’m listening. Just making my case.",
  "A fair answer. The yes button is taking this personally.",
  "Noted. The button has begun its gentle transformation.",
  "You have excellent follow-through.",
  "This is a surprisingly resilient little yes button.",
  "No pressure. Just an increasingly enthusiastic button.",
  "I admire your commitment to the bit.",
  "Your no is still a perfectly good answer.",
  "The coffee is still optional, for the record.",
  "I may have overestimated my persuasive powers.",
  "A very consistent answer. Respect.",
  "The yes button is now basically a billboard.",
];

function getFormattedDate(date: string) {
  if (!date) return "your chosen day";
  return new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date(`${date}T12:00:00`));
}

export default function InvitationPage() {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [showNoThanks, setShowNoThanks] = useState(false);
  const [date, setDate] = useState("");
  const [coffeeSpot, setCoffeeSpot] = useState("");

  const chooseNo = () => {
    if (noCount >= 24) {
      setShowNoThanks(true);
      return;
    }
    setNoCount((count) => count + 1);
  };

  const startOver = () => {
    setShowNoThanks(false);
    setNoCount(0);
    setStep(0);
    setDate("");
    setCoffeeSpot("");
  };

  const selectedSpot = coffeeSpots.find((spot) => spot.id === coffeeSpot);

  return (
    <main className="invite-page">
      <header className="invite-header">
        <Link href="/" className="invite-brand" aria-label="Jot notes app home"><span className="invite-brand-mark">j.</span><span>A LITTLE SIDE PROJECT</span></Link>
        <span className="invite-header-note">AN IMPORTANT QUESTION, THOUGH</span>
      </header>

      <div className="invite-grain" aria-hidden="true" />
      <section className="invite-stage" aria-live="polite">
        <div className="invite-side-note"><span>01—04</span><span>THE COFFEE PLAN</span></div>

        {showNoThanks ? (
          <article className="invite-card no-thanks-card">
            <p className="invite-kicker"><span className="invite-star">✳</span> NO PRESSURE, EVER</p>
            <h1>Thanks for<br />being honest<span className="coral-period">.</span></h1>
            <p className="invite-copy">No worries at all. You deserve an invitation that feels good to say yes to, too. We’re all good.</p>
            <button className="invite-text-button" type="button" onClick={startOver}>Actually, I changed my mind <span aria-hidden="true">↗</span></button>
            <div className="invite-card-footer"><span>GOOD COMPANY, EITHER WAY</span><span>✳</span></div>
          </article>
        ) : step === 0 ? (
          <article className="invite-card ask-card">
            <p className="invite-kicker"><span className="invite-star">✳</span> A QUESTION FOR YOU</p>
            <h1>Would you let<br />me take you for<br /><em>a coffee?</em></h1>
            <p className="invite-copy">Just us, a good cup, and a conversation that forgets to check the time.</p>
            <div className="answer-row">
              <button className="answer-yes" style={{ "--yes-scale": 1 + noCount * 0.035 } as React.CSSProperties} type="button" onClick={() => setStep(1)}>
                <span>Yes, let’s go</span><span className="answer-arrow" aria-hidden="true">↗</span>
              </button>
              <button className="answer-no" type="button" onClick={chooseNo}>{noLabels[noCount]}</button>
            </div>
            {noCount > 0 && <p className="playful-note" role="status">{noMessages[(noCount - 1) % noMessages.length]}</p>}
            <div className="invite-card-footer"><span>NO PRESSURE. EXCEPT ABOUT THE COFFEE.</span><span>01 / 04</span></div>
          </article>
        ) : step === 1 ? (
          <article className="invite-card detail-card">
            <p className="invite-kicker"><span className="invite-star">✳</span> FIRST THINGS FIRST</p>
            <h1>When are you<br /><em>free?</em></h1>
            <p className="invite-copy">Pick a day that feels nice. We’ll figure out the little details together.</p>
            <label className="invite-label" htmlFor="coffee-date">YOUR KIND OF DAY</label>
            <input className="date-picker" id="coffee-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            <div className="invite-actions">
              <button className="invite-text-button" type="button" onClick={() => setStep(0)}>← Back</button>
              <button className="invite-continue" type="button" disabled={!date} onClick={() => setStep(2)}>Next: the coffee <span aria-hidden="true">↗</span></button>
            </div>
            <div className="invite-card-footer"><span>ONE DAY, NO RUSH</span><span>02 / 04</span></div>
          </article>
        ) : step === 2 ? (
          <article className="invite-card detail-card place-card">
            <p className="invite-kicker"><span className="invite-star">✳</span> YOUR CALL</p>
            <h1>What’s your<br /><em>coffee mood?</em></h1>
            <p className="invite-copy">Choose the setting. I’m mostly looking forward to the company.</p>
            <div className="coffee-options" role="radiogroup" aria-label="Coffee place preference">
              {coffeeSpots.map((spot, index) => (
                <button className={`coffee-option${coffeeSpot === spot.id ? " coffee-option-selected" : ""}`} key={spot.id} role="radio" aria-checked={coffeeSpot === spot.id} type="button" onClick={() => setCoffeeSpot(spot.id)}>
                  <span className="option-number">0{index + 1}</span><span className="option-copy"><strong>{spot.name}</strong><small>{spot.detail}</small></span><span className="option-check" aria-hidden="true">{coffeeSpot === spot.id ? "✓" : ""}</span>
                </button>
              ))}
            </div>
            <div className="invite-actions">
              <button className="invite-text-button" type="button" onClick={() => setStep(1)}>← Back</button>
              <button className="invite-continue" type="button" disabled={!coffeeSpot} onClick={() => setStep(3)}>One last thing <span aria-hidden="true">↗</span></button>
            </div>
            <div className="invite-card-footer"><span>YOU PICK, I’M IN</span><span>03 / 04</span></div>
          </article>
        ) : (
          <article className="invite-card final-card">
            <p className="invite-kicker"><span className="invite-star">✳</span> IT’S A LITTLE DATE</p>
            <div className="coffee-doodle" aria-hidden="true"><span className="doodle-steam">〰</span><span className="doodle-cup" /><span className="doodle-saucer" /></div>
            <h1>Well, this is<br /><em>my favorite plan.</em></h1>
            <p className="invite-copy">{getFormattedDate(date)} at {selectedSpot?.name.toLocaleLowerCase() ?? "a lovely coffee place"}. I’m already looking forward to hearing all your stories and finding one more reason to see you.</p>
            <p className="sweet-note">You make an ordinary coffee sound like something I’ll remember.</p>
            <div className="invite-actions final-actions">
              <button className="invite-text-button" type="button" onClick={() => setStep(2)}>← Change the plan</button>
              <a className="invite-continue invite-calendar" href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Coffee date ☕")}&dates=${date.replaceAll("-", "")}T150000/${date.replaceAll("-", "")}T160000&details=${encodeURIComponent(`${selectedSpot?.name ?? "Coffee"}. Looking forward to seeing you!`)}`} target="_blank" rel="noreferrer">Save the date <span aria-hidden="true">↗</span></a>
            </div>
            <div className="invite-project-link"><span>MADE WITH A LITTLE EXTRA COURAGE</span><a href={repositoryUrl} target="_blank" rel="noreferrer">See the public project <span aria-hidden="true">↗</span></a></div>
            <div className="invite-card-footer"><span>CAN’T WAIT, [YOUR NAME]</span><span>04 / 04</span></div>
          </article>
        )}

        <div className="invite-side-note invite-side-note-right"><span>GOOD COFFEE</span><span>BETTER COMPANY</span></div>
      </section>
      <footer className="invite-footer"><span>MADE FOR ONE VERY SPECIFIC PERSON</span><span>✳</span><span>WITH HOPE & A LITTLE HUMOR</span></footer>
    </main>
  );
}