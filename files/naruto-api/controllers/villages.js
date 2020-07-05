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

module.exports.getAllVillages = async () => {
    let query = `SELECT ?id ?name ?image WHERE {
        ?id rdf:type :Village .
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

module.exports.getVillageAtomicInfo = async (idVillage) => {
    let query = `SELECT * WHERE {
        :${idVillage} rdf:type :Village .
        :${idVillage} :name ?name .
        :${idVillage} :englishName ?englishName .
        :${idVillage} :overview ?overview .
        :${idVillage} :history ?history .
        :${idVillage} :symbol ?symbol .
        :${idVillage} :image ?image .
        OPTIONAL{
            :${idVillage} :statEconomy ?statEconomy .
            :${idVillage} :statMilitary ?statMilitary .
            :${idVillage} :statPopulation ?statPopulation .
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

module.exports.getVillageCountry = async (idVillage) => {
    let query = `SELECT ?id ?name WHERE {
        :${idVillage} :country ?id .
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

module.exports.getVillageClan = async (idVillage) => {
    let query = `SELECT ?id ?name WHERE {
        :${idVillage} :hasClan ?id .
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

module.exports.getVillageLeaderAsOccupation = async (idVillage) => {
    let query = `SELECT ?id ?name WHERE {
        :${idVillage} :hasLeader ?id .
        ?id rdf:type :Occupation .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        if (normalized[1]) {
            let arr = normalized.map((e) => {
                e.type = "occupation";
                return e;
            });
            return arr;
        } else if (normalized[0]) {
            let obj = normalized[0];
            obj.type = "occupation";
            return obj;
        } else {
            return normalized;
        }
    } catch (e) {
        throw e;
    }
};

module.exports.getVillageLeaderAsCharacter = async (idVillage) => {
    let query = `SELECT ?id ?name WHERE {
        :${idVillage} :hasLeader ?id .
        ?id rdf:type :Character .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        if (normalized[1]) {
            let arr = normalized.map((e) => {
                e.type = "character";
                return e;
            });
            return arr;
        } else if (normalized[0]) {
            let obj = normalized[0];
            obj.type = "character";
            return obj;
        } else {
            return normalized;
        }
    } catch (e) {
        throw e;
    }
};

module.exports.getVillageLeader = async (idVillage) => {
    let characters = await this.getVillageLeaderAsCharacter(idVillage);
    let occupations = await this.getVillageLeaderAsOccupation(idVillage);
    if (characters.length > 0 || characters.id) {
        return characters;
    } else {
        return occupations;
    }
};

module.exports.getVillageImages = async (idVillage) => {
    let query = `SELECT ?image WHERE {
        :${idVillage} :hasImage ?id .
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

module.exports.getVillage = async (idVillage) => {
    try {
        let village = await this.getVillageAtomicInfo(idVillage);
        village["country"] = await this.getVillageCountry(idVillage);
        village["leader"] = await this.getVillageLeader(idVillage);
        village["clan"] = await this.getVillageClan(idVillage);
        let images = await this.getVillageImages(idVillage);
        if (images.length > 0) village["images"] = images;
        return village;
    } catch (e) {
        throw e;
    }
};
