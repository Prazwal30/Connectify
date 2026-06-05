import { LANGUAGE_TO_FLAG } from "../constansts";

export const capitalize = (value = "") => value.charAt(0).toUpperCase() + value.slice(1);

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${langLower} flag`}
      className="h-3 mr-1 inline-block"
    />
  );
}
