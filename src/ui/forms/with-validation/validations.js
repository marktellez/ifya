export const minLength = (value, n) =>
  !value || value.length < n ? "try something a litle longer maybe?" : "";

export const isUrl = (url) =>
  !url || url.indexOf("https://") !== 0 ? "Must be a url with https" : "";

export const isImageUrl = (url) => {
  const errors = isUrl(url);
  if (errors.length > 0) return errors;

  return ["jpg", "jpeg", "png", "webp", "gif"].indexOf(url.split(".").at(-1)) <
    0
    ? "Image must end in jpg, jpeg, png, webp, or gif"
    : "";
};
