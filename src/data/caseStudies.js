// Case studies. Facts only: every statement below is visible in the founder's original
// captures (scripts/case-studies/teddy-bike-samui.json, PROVENANCE.md) or documented in the
// Teddy Bike Samui repository. No traffic, conversion, revenue or ranking figures.

// Intrinsic sizes of the masters, shared by every derivative of the same capture.
export const DESKTOP = { w: 2880, h: 1800 }
export const MOBILE = { w: 1170, h: 2532 }

export const TEDDY_BIKE_SAMUI = {
  slug: 'teddy-bike-samui',
  name: 'Teddy Bike Samui',
  domain: 'teddybikesamui.com',
  url: 'https://teddybikesamui.com',
  category: 'Website Design & Development',
  location: 'Koh Samui, Thailand',

  facts: [
    { label: 'Client', value: 'Teddy Bike Samui' },
    { label: 'Sector', value: 'Scooter & car rental' },
    { label: 'Services', value: 'Website design & development' },
    { label: 'Year', value: '2026' },
  ],

  // Image sets in public/projects/teddy-bike-samui/ (built by `npm run case-assets`).
  images: {
    beforeDesktopHero: { name: 'before-desktop-hero', widths: [800, 1280, 1920], ...DESKTOP },
    afterDesktopHero: { name: 'after-desktop-hero', widths: [800, 1280, 1920], ...DESKTOP },
    beforeMobileHero: { name: 'before-mobile-hero', widths: [390, 780], ...MOBILE },
    afterMobileHero: { name: 'after-mobile-hero', widths: [390, 780], ...MOBILE },
    beforeMobileChooseRide: { name: 'before-mobile-choose-your-ride', widths: [390, 780], w: 1170, h: 3678 },
    afterShowroom: { name: 'after-desktop-showroom', widths: [800, 1280, 1920], ...DESKTOP },
    afterMobileShowroom: { name: 'after-mobile-showroom', widths: [390, 780], ...MOBILE },
    afterMobileMenu: { name: 'after-mobile-menu', widths: [390, 780], ...MOBILE },
    afterBooking: { name: 'after-desktop-booking', widths: [800, 1600], ...DESKTOP },
    afterContact: { name: 'after-desktop-contact', widths: [800, 1600], ...DESKTOP },
    afterFull: { name: 'after-desktop-full', widths: [800, 1280], w: 2880, h: 13348 },
    headerLogo: { name: 'detail-header-logo', widths: [300, 600], w: 600, h: 136 },
    headerControls: { name: 'detail-header-controls', widths: [220, 440], w: 440, h: 112 },
    whatsappButton: { name: 'detail-whatsapp-button', widths: [235, 470], w: 470, h: 140 },
    typography: { name: 'detail-typography', widths: [490, 980], w: 980, h: 430 },
    vehiclePanel: { name: 'detail-vehicle-panel', widths: [202, 404], w: 404, h: 590 },
    mobileRental: { name: 'mobile-home-rental', widths: [390, 780], w: 1170, h: 1767 },
    mobileActivities: { name: 'mobile-home-activities', widths: [390, 780], w: 1170, h: 2360 },
    mobileHowItWorks: { name: 'mobile-home-how-it-works', widths: [390, 780], w: 1170, h: 2214 },
    mobileRideWaiting: { name: 'mobile-home-ride-waiting', widths: [390, 780], w: 1170, h: 1296 },
  },

  // The site's own promise, word for word (hero of both versions).
  promise: 'Scooter and car rental made simple — well-kept vehicles, honest prices, and a booking that takes two minutes on WhatsApp.',

  // 02 · What the website was designed to help visitors do (intentions, not results).
  vision: [
    { title: 'Explore the fleet', text: 'Scooters and cars, presented one vehicle at a time.' },
    { title: 'Understand each vehicle', text: 'Model, engine size, daily price, deposit and conditions — before any message.' },
    { title: 'Find their way', text: 'Delivery, documents and driving in Thailand, activities, good spots and a FAQ.' },
    { title: 'Reach the business', text: 'WhatsApp, email and social channels, with booking always one tap away.' },
  ],

  // 03 · Exact values from the site's stylesheet (identical in both versions).
  palette: [
    { token: '--navy', hex: '#1C3350', role: 'Headings, text and booking buttons' },
    { token: '--navy-deep', hex: '#142639', role: 'Hover states and dark panels' },
    { token: '--gold', hex: '#5E7A96', role: 'The italic accent, hover and focus' },
    { token: '--cream', hex: '#FAFAF7', role: 'Page background' },
    { token: '--sage', hex: '#E9EDE9', role: 'Gradients and soft surfaces' },
    { token: '--whatsapp', hex: '#25D366', role: 'WhatsApp actions' },
    { token: '--red', hex: '#C8362E', role: 'Deposits' },
  ],
  type: [
    { name: 'Playfair Display', role: 'Headings, with an italic accent' },
    { name: 'Outfit', role: 'Interface and text' },
  ],

  // 04 · The homepage, top to bottom (after-desktop-full).
  homepage: [
    { title: 'First screen', text: 'The promise, a vehicle and Book on WhatsApp.' },
    { title: 'Our fleet', text: 'The showroom of scooters and cars.' },
    { title: 'Rental without the hassle', text: 'Delivery, what’s included, assistance, English and French.' },
    { title: 'Activities', text: 'Shooting range, zipline, island tour, motocross.' },
    { title: 'How it works', text: 'Three steps, from a message to the ride.' },
    { title: 'Questions & reviews', text: 'A FAQ, then Google reviews.' },
    { title: 'Your ride is waiting', text: 'A last call to WhatsApp.' },
  ],

  // 04 on phones: the homepage in phone-sized crops of after-mobile-full (numbers match the list above).
  get homeMobile() {
    const img = this.images
    return [
      { index: '03', title: 'Rental without the hassle', image: img.mobileRental, alt: 'Rental without the hassle on a phone: a small local team, free delivery from 3 rental days for scooters and 4 for cars, and all included — helmets and phone holder.' },
      { index: '04', title: 'Activities', image: img.mobileActivities, alt: 'Activities on a phone: more than rentals, starting with the Shooting Range card and its Ask us on WhatsApp link.' },
      { index: '05', title: 'How it works', image: img.mobileHowItWorks, alt: 'How it works on a phone: No. 1 Message us on WhatsApp, No. 2 Pick up or get it delivered.' },
      { index: '07', title: 'Your ride is waiting', image: img.mobileRideWaiting, alt: 'Your ride is waiting on a phone: send your dates on WhatsApp, a green WhatsApp +66 62 418 3134 button, open daily 9am to 7pm.' },
    ]
  },

  // Information visible in the showroom captures (after-desktop-showroom, after-mobile-showroom).
  showroom: [
    { title: 'Scooters or cars', text: 'One switch, each side with its starting price.' },
    { title: 'Every vehicle in full', text: 'Brand, model and engine size.' },
    { title: 'Price and deposit', text: 'Side by side, before the first tap.' },
    { title: 'Easy to browse', text: 'Counter, dots and arrows, from the smallest to the largest.' },
    { title: 'Two next steps', text: 'View & book, or see the whole range.' },
  ],

  // Documented in the production package of the current version (Teddy Bike Samui repository).
  // Implementation facts, not performance measurements.
  craft: [
    { title: 'Self-hosted fonts', text: 'No third-party font requests.' },
    { title: 'Optimised images', text: 'Separate, optimised files, cached for a year.' },
    { title: 'Native swipe', text: 'The showroom scrolls with the browser itself — no JavaScript mid-swipe.' },
    { title: 'Tested across screens', text: 'Showroom checked from 320 px phones to 1440 px desktops.' },
    { title: 'Security headers', text: 'On every page, with a branded 404.' },
    { title: 'Reduced motion', text: 'Animation steps aside when visitors ask for less.' },
  ],

  // Visible in after-mobile-showroom / after-mobile-menu, and documented in the project's
  // test reports (native swipe).
  mobile: [
    { title: 'Swipe through the fleet', text: 'The showroom scrolls natively under the finger, one vehicle at a time.' },
    { title: 'A complete menu', text: 'Scooters, cars, documents and driving in Thailand, activities, good spots, FAQ and contact.' },
    { title: 'Booking always in reach', text: 'Book now in the header and a floating WhatsApp button on every screen.' },
  ],

  // The booking form (after-desktop-booking) and the site's own wording.
  booking: [
    { title: 'Choose a vehicle', text: 'Every vehicle has its own page, with its price, deposit and conditions.' },
    { title: 'Add your details', text: 'Name, start and end dates, where you are staying and an optional message.' },
    { title: 'Send it your way', text: 'The request opens in WhatsApp, ready to send — or by email, without WhatsApp.' },
  ],

  // 07 · First screen, original → later version (compare before-/after-desktop-hero).
  heroChanges: [
    { title: 'The vehicle takes the stage', text: 'A Yamaha Xmax 300 now anchors the first screen, beside the name.' },
    { title: 'A clearer introduction', text: 'A new line under the name says what the business does.' },
    { title: 'Reassurance up front', text: 'The Google rating summary moved up, under the booking button.' },
  ],
}
