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

module.exports.getAllSpecies = async () => {
    let query = `SELECT ?id ?name WHERE {
        ?id rdf:type :Species .
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

module.exports.getSpecieAtomicInfo = async (idSpecie) => {
    let query = `SELECT * WHERE {
        :${idSpecie} rdf:type :Species .
        :${idSpecie} :name ?name .
        :${idSpecie} :overview ?overview .
        :${idSpecie} :image ?image .
    }`;

    let encoded = encodeURIComponent(prefixes + query);

    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data)[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getSpecieMembers = async (idSpecie) => {
    let query = `SELECT ?id ?name WHERE {
        :${idSpecie} rdf:type :Species .
        :${idSpecie} :hasMember ?id .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        if (normalized[1]) return normalized;
        else return normalized[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getSpecieSummoners = async (idSpecie) => {
    let query = `SELECT ?id ?name WHERE {
        :${idSpecie} rdf:type :Species .
        :${idSpecie} :hasSummoner ?id .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        if (normalized[1]) return normalized;
        else return normalized[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getSpecie = async (idSpecie) => {
    try {
        let specie = await this.getSpecieAtomicInfo(idSpecie);
        specie["members"] = await this.getSpecieMembers(idSpecie);
        specie["summoners"] = await this.getSpecieSummoners(idSpecie);
        return specie;
    } catch (e) {
        throw e;
    }
};
