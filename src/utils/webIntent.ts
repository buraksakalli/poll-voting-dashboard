import toast from "react-hot-toast";

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

export const copyPath = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  toast.success("Copied to clipboard");
};
