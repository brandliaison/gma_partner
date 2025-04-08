import React from 'react'

export default function FormatText(text) {

  return text?.text
    ?.replace(/_/g, " ") // Replace underscores with spaces
    ?.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

