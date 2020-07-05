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

module.exports.getAllClans = async () => {
    let query = `SELECT ?id ?name ?image WHERE {
        ?id rdf:type :Clan .
        ?id :name ?name .
        OPTIONAL{
            ?id :image ?image .
        }
    }`;

    let encoded = encodeURIComponent(prefixes + query);

    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data);
    } catch (e) {
        throw e;
    }
};

module.exports.getClanAtomicInfo = async (idClan) => {
    let query = `SELECT * WHERE {
        :${idClan} rdf:type :Clan .
        :${idClan} :name ?name .
        OPTIONAL{
            :${idClan} :image ?image .
        }
        OPTIONAL{
            :${idClan} :overview ?overview .
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

module.exports.getClanVillage = async (idClan) => {
    let query = `SELECT ?id ?name WHERE {
        :${idClan} :belongsToVillage ?id .
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

module.exports.getClanLeader = async (idClan) => {
    let query = `SELECT ?id ?name WHERE {
        :${idClan} :hasLeader ?id .
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

module.exports.getClanKekkeiGenkai = async (idClan) => {
    let query = `SELECT ?id ?name WHERE {
        :${idClan} :hasKekkeiGenkai ?id .
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

module.exports.getClanMembers = async (idClan) => {
    let query = `SELECT ?id ?name WHERE {
        :${idClan} :hasMember ?id .
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

module.exports.getClanImages = async (idClan) => {
    let query = `SELECT ?image WHERE {
        :${idClan} :hasImage ?id .
        ?id :image ?image .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data).map((o) => o.image);
        return normalized;
    } catch (e) {
        throw e;
    }
};

module.exports.getClan = async (idClan) => {
    try {
        let clan = await this.getClanAtomicInfo(idClan);
        clan["village"] = await this.getClanVillage(idClan);
        clan["leader"] = await this.getClanLeader(idClan);
        clan["kekkeiGenkai"] = await this.getClanKekkeiGenkai(idClan);
        clan["members"] = await this.getClanMembers(idClan);
        let images = await this.getClanImages(idClan);
        if (images.length > 0) clan["images"] = images;
        return clan;
    } catch (e) {
        throw e;
    }
};
