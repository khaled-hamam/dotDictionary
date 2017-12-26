const fetch = require('node-fetch');

const DictionaryAPI = {
    getDefinition(word, partOfSpeach = 'noun', limit = 1) {
        const searchQuery = `http://api.pearson.com/v2/dictionaries/entries?headword=${word}&part_of_speech=${partOfSpeach}&limit=${limit}`;

        return fetch(searchQuery)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json.results[0].senses[0].definition;
            });
    }
};

module.exports = DictionaryAPI;
