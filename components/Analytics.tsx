import Script from "next/script";

/**
 * Loads Google Analytics 4, Google Ads conversion tracking, and the Meta Pixel.
 * All three are opt-in via environment variables — nothing loads until you've
 * set the corresponding NEXT_PUBLIC_* value in Vercel (see SETUP.md).
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const gtagTargets = [gaId, googleAdsId].filter(Boolean) as string[];

  return (
    <>
      {gtagTargets.length > 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagTargets[0]}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gtagTargets.map((id) => `gtag('config', '${id}');`).join("\n")}
            `}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Fire this from a Client Component right after a Founding Circle pledge
 * succeeds. Sends a GA4 event, a Google Ads conversion (if configured), and a
 * Meta Pixel "Lead" event — the three things you'd want a paid campaign to
 * optimize toward.
 */
export function trackFoundingCirclePledge(pledgeType: string) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  w.gtag?.("event", "founding_circle_pledge", { pledge_type: pledgeType });

  const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (googleAdsConversionId) {
    w.gtag?.("event", "conversion", { send_to: googleAdsConversionId });
  }

  w.fbq?.("track", "Lead", { content_name: "founding_circle_pledge", pledge_type: pledgeType });
}
