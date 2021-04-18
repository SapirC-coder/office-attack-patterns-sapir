// These are filter functions on database

/* For Search Bar */
// filtering data using query (description keywords), query: an input from user in the search bar
export const filterDescription = (docs, query) => {
    if (!query) {
        return docs;
    }
    return docs.filter((doc) => {
      const description = doc.description.toString().toLowerCase();
      return description.includes(query.toLowerCase());
    });
};

/* For ChatBot */

// helper function getting string of names of the given docs
const getNames = (docs) => {
    var res = [];
    docs.map(doc => res.push(doc.name))
    return res.join(', ');
}

// looks for phase names that has the given phase and returning all names
export const phaseNameGetNames = (docs, message) => {
    docs = docs.filter((doc) => {
        const phase_name = doc.phase_name.toString().toLowerCase();
        return phase_name.includes(message.toLowerCase())});
    return getNames(docs);
};

// looks for mitre platforms that has the given mitre platform and returning all names
export const mitrePlatformsGetNames = (docs, message) => {
    docs = docs.filter((doc) => {
        const x_mitre_platforms = doc.x_mitre_platforms.toString().toLowerCase();
        return x_mitre_platforms.includes(message.toLowerCase())});
    return getNames(docs);
};

// looks for names that include the given string
export const getNamesByPart = (docs, message) => {
    docs = docs.filter((doc) => {
        const name = doc.name.toString().toLowerCase();
        return name.includes(message.toLowerCase())});
    return getNames(docs);
};
