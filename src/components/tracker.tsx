"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

declare global {
  interface Window {
    _paq: any[];
  }
}

export const Tracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    fetch(`/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pathname }),
    });

    if (window._paq) {
      window._paq.push(["setCustomUrl", pathname]);
      window._paq.push(["trackPageView"]);
    }
  }, [pathname]);

  return (
    <>
      <GoogleAnalytics gaId="G-Z3E1C7XG8Y" />
      <Script
        id="matomo-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//october08.me/matomo/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
        }}
      />
    </>
  );
};
