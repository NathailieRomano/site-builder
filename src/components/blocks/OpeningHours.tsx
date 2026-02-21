"use client";

import React from "react";

interface DayHours {
  day: string;
  hours: string;
}

interface OpeningHoursProps {
  heading: string;
  days: DayHours[];
  note: string;
  style: "table" | "cards";
}

export function OpeningHours({ heading, days, note, style = "table" }: OpeningHoursProps) {
  const today = new Date().toLocaleDateString("de-DE", { weekday: "long" });

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-lg">
        {heading && (
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ fontFamily: "var(--theme-heading-font)" }}
          >
            {heading}
          </h2>
        )}

        {style === "table" ? (
          <div className="space-y-2">
            {days.map((d, i) => {
              const isToday = today.toLowerCase() === d.day.toLowerCase();
              return (
                <div
                  key={i}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    isToday ? "font-semibold" : ""
                  }`}
                  style={isToday ? { backgroundColor: "var(--theme-primary)", color: "#fff", borderRadius: "var(--theme-radius)" } : undefined}
                >
                  <span>{d.day}</span>
                  <span className={d.hours.toLowerCase() === "geschlossen" ? "opacity-50" : ""}>
                    {d.hours}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {days.map((d, i) => {
              const isToday = today.toLowerCase() === d.day.toLowerCase();
              const closed = d.hours.toLowerCase() === "geschlossen";
              return (
                <div
                  key={i}
                  className="rounded-xl border p-4 text-center"
                  style={{
                    borderColor: isToday ? "var(--theme-primary)" : "#e5e7eb",
                    backgroundColor: isToday ? "var(--theme-primary)" : undefined,
                    color: isToday ? "#fff" : undefined,
                  }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider opacity-60">{d.day}</p>
                  <p className={`mt-1 text-sm font-semibold ${closed && !isToday ? "opacity-40" : ""}`}>
                    {d.hours}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {note && <p className="mt-6 text-center text-sm opacity-60">{note}</p>}
      </div>
    </section>
  );
}

export const OpeningHoursConfig = {
  label: "Öffnungszeiten",
  fields: {
    heading: { type: "text" as const, label: "Überschrift" },
    days: {
      type: "array" as const,
      label: "Tage",
      arrayFields: {
        day: { type: "text" as const, label: "Tag" },
        hours: { type: "text" as const, label: "Zeiten" },
      },
    },
    note: { type: "text" as const, label: "Hinweis" },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "table", label: "Liste" },
        { value: "cards", label: "Karten" },
      ],
    },
  },
  defaultProps: {
    heading: "Öffnungszeiten",
    days: [
      { day: "Montag", hours: "08:00 – 18:00" },
      { day: "Dienstag", hours: "08:00 – 18:00" },
      { day: "Mittwoch", hours: "08:00 – 18:00" },
      { day: "Donnerstag", hours: "08:00 – 18:00" },
      { day: "Freitag", hours: "08:00 – 17:00" },
      { day: "Samstag", hours: "09:00 – 14:00" },
      { day: "Sonntag", hours: "Geschlossen" },
    ],
    note: "Termine nach Vereinbarung auch ausserhalb der Öffnungszeiten möglich.",
    style: "table" as const,
  },
  render: OpeningHours,
};
