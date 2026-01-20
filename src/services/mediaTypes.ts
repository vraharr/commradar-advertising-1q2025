
// Media type mapping for special cases
export const mediaTypeMapping: Record<string, string> = {
  "NEWSPAPERS": "PA", // PA = Print Advertising (Newspapers)
  "MAGAZINES": "MG",  // MG = Magazines
  "LOCAL WEBSITE": "web", // Map "LOCAL WEBSITE" to "web" for API calls
  // All other media types use their own name
};

// Define media categories
export const mediaCategories = {
  digital: ["GOOGLE ADS", "SOCIAL MEDIA", "LOCAL WEBSITES"],
  traditional: ["TV", "RADIO", "NEWSPAPERS", "MAGAZINES"],
  outOfHome: ["OUTDOOR", "MALLS", "AIRPORTS"],
};
