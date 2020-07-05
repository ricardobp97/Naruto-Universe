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

module.exports.getAllDomains = async () => {
    let query = `SELECT ?id ?name WHERE {
        ?id rdf:type :Domain .
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

module.exports.getDomainAtomicInfo = async (idDomain) => {
    let query = `SELECT * WHERE {
        :${idDomain} rdf:type :Domain .
        :${idDomain} :name ?name .
        OPTIONAL{
           :${idDomain} :englishName ?englishName .
        }
        :${idDomain} :overview ?overview .
        OPTIONAL{
           :${idDomain} :history ?history .
        }
        :${idDomain} :symbol ?symbol .
        OPTIONAL{
           :${idDomain} :image ?image .
        }
    }`;

    let encoded = encodeURIComponent(prefixes + query);

    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data)[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getDomainLeader = async (idDomain) => {
    let query = `SELECT * WHERE {
        :${idDomain} rdf:type :Domain .
        :${idDomain} :hasLeader ?id .
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

module.exports.getDomainMembers = async (idDomain) => {
    let query = `SELECT ?id ?name WHERE {
        :${idDomain} :hasMember ?id .
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

module.exports.getDomainSummoners = async (idDomain) => {
    let query = `SELECT ?id ?name WHERE {
        :${idDomain} :hasSummoner ?id .
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

module.exports.getDomain = async (idDomain) => {
    try {
        let domain = await this.getDomainAtomicInfo(idDomain);
        let leader = await this.getDomainLeader(idDomain);
        if (leader.length > 0) domain["leader"] = leader[0];
        domain["members"] = await this.getDomainMembers(idDomain);
        domain["summoners"] = await this.getDomainSummoners(idDomain);
        return domain;
    } catch (e) {
        throw e;
    }
};
