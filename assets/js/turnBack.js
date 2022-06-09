const undesirables = [
  "news.ycombinator.com/",
  "reddit.com/",
  "lobste.rs/"
] ;
if (undesirables.find(site => document.referrer.includes(site))) {
  window.location.replace(document.referrer);
}
