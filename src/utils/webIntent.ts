export const shareOnTwitter = () => {
  const url = window.location.href;
  const title = document.title;
  const text = `${title} ${url}`;
  const navUrl = "https://twitter.com/intent/tweet?text=" + text;
  window.open(navUrl, "_blank");
};

export const shareOnFacebook = () => {
  const url = window.location.href;
  const navUrl = "https://www.facebook.com/sharer/sharer.php?u=" + url;
  window.open(navUrl, "_blank");
};

export const shareOnLinkedin = () => {
  const url = window.location.href;
  const title = document.title;
  const text = `${title} ${url}`;
  const navUrl =
    "https://www.linkedin.com/shareArticle?mini=true&url=" +
    url +
    "&title=" +
    title +
    "&summary=" +
    text;
  window.open(navUrl, "_blank");
};
