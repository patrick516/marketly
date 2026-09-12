import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GA_ID || "";

// -------------------------
// INIT
// -------------------------
export const initGA = () => {
  if (!GA_ID) return;
  ReactGA.initialize(GA_ID);
};

// -------------------------
// PAGE VIEW
// -------------------------
export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

// -------------------------
// LEAD SUBMITTED
// -------------------------
export const trackLead = (service: string) => {
  ReactGA.event({
    category: "Lead",
    action: "Form Submission",
    label: service || "General Inquiry",
  });
};
