const axios = require("axios");
const prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX : <http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#>
`;
const getLink = "http://localhost:7200/repositories/Naruto?query=";

function normalize(array) {
    return array.results.bindings.map((obj) => {
        let new_obj = {};
        for (let [k, v] of Object.entries(obj)) {
            if (v.type == "uri") new_obj[k] = v.value.split("#")[1];
            else {
                new_obj[k] = v.value;
            }
        }
        return new_obj;
    });
}

module.exports.getAllClassifications = async () => {
    let query = `SELECT ?id ?name WHERE {
        ?id rdf:type :Classification .
        ?id :name ?name .
    }`;

    let encoded = encodeURIComponent(prefixes + query);

    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getClassification = async (idClassification) => {
    let query = `SELECT ?name ?description WHERE {
        :${idClassification} :name ?name .
        :${idClassification} :description ?description .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data)[0];
    } catch (e) {
        throw e;
    }
};
