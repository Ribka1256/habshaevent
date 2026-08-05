// utils/extractLink.js
export function extractLink(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s)]+)/i;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
}