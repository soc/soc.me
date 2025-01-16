const undesirables = [
  "news.ycombinator.com/",
  // "reddit.com/", // disable temporaily
  "lobste.rs/"
] ;
if (undesirables.find(site => document.referrer.includes(site))) {
  window.location.replace(document.referrer);
}
