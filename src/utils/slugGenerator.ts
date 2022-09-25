export const slugGenerator = (txt: string) => {
  return txt
    .toString() // Convert to string
    .toLowerCase() // Change to lowercase
    .replace(/ı/g, "i") // I -> i
    .normalize("NFD") // Change diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove illegal characters
    .replace(/\s+/g, "-") // Change whitespace to dashes
    .replace(/&/g, "-ve-") // Replace ampersand
    .replace(/[^a-z0-9\-]/g, "") // Remove anything that is not a letter, number or dash
    .replace(/-+/g, "-") // Remove duplicate dashes
    .replace(/^-*/, "") // Remove starting dashes
    .replace(/-*$/, ""); // Remove trailing dashes
};

export default slugGenerator;
