/* ============================================================
   ELENA ORLOVA — site configuration
   Everything a real deployment must replace lives here.
   Values marked [REPLACE] are fictional placeholders.
   ============================================================ */
window.SITE_CONFIG = {
  brand: {
    name: "Elena Orlova",
    tagline: "Aesthetic Cosmetology · Skin Health · Natural Results",
  },

  contact: {
    phone: "+0 000 000 00 00",                    /* [REPLACE] */
    email: "hello@elenaorlova.example",           /* [REPLACE] */
    address: "Studio address — to be added",      /* [REPLACE] */
    hours: "By appointment · Tue–Sat",            /* [REPLACE] */
  },

  /* Social links. Keep url:"" until real — placeholders render
     as inert text, never as broken links. */
  socials: [
    { label: "Instagram", url: "" },              /* [REPLACE] */
    { label: "Telegram", url: "" },               /* [REPLACE] */
    { label: "WhatsApp", url: "" },               /* [REPLACE] */
  ],

  booking: {
    /* POST target for the consultation form (JSON body).
       While empty, the form NEVER fakes success — it shows
       direct contact details instead. */
    endpoint: "",                                  /* [REPLACE] */
  },

  seo: {
    canonical: "https://elenaorlova.example/",    /* [REPLACE] */
  },

  /* Credentials are rendered in index.html (section “The specialist”).
     Every entry there is a placeholder and must be replaced with
     verified, documented qualifications before publication. */
};
