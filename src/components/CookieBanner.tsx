"use client";

import React, { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-black/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-1">🍪 Cookie-Einstellungen</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Ablehnen
            </button>
            <button
              onClick={accept}
              className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
