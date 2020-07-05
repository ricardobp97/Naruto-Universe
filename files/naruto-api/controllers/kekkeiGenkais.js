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

module.exports.getAllKekkeiGenkais = async () => {
    let query = `SELECT ?id ?name WHERE {
        ?id rdf:type :KekkeiGenkai .
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

module.exports.getKekkeiGenkaiAtomicInfo = async (idKekkeiGenkai) => {
    let query = `SELECT * WHERE {
        :${idKekkeiGenkai} rdf:type :KekkeiGenkai .
        :${idKekkeiGenkai} :name ?name .
        :${idKekkeiGenkai} :description ?description .
        :${idKekkeiGenkai} :classfication ?classfication .
        OPTIONAL{
            :${idKekkeiGenkai} :image ?image .
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

module.exports.getKekkeiGenkaiClan = async (idKekkeiGenkai) => {
    let query = `SELECT ?id ?name WHERE {
        :${idKekkeiGenkai} :belongsToClan ?id .
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

module.exports.getKekkeiGenkaiNatureTypes = async (idKekkeiGenkai) => {
    let query = `SELECT ?id ?name WHERE {
        :${idKekkeiGenkai} :isFormedBy ?id .
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

module.exports.getKekkeiGenkaiImages = async (idKekkeiGenkai) => {
    let query = `SELECT ?image WHERE {
        :${idKekkeiGenkai} :hasImage ?id .
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

module.exports.getKekkeiGenkai = async (idKekkeiGenkai) => {
    try {
        let kekkeiGenkai = await this.getKekkeiGenkaiAtomicInfo(idKekkeiGenkai);
        kekkeiGenkai["clan"] = await this.getKekkeiGenkaiClan(idKekkeiGenkai);
        kekkeiGenkai["natureTypes"] = await this.getKekkeiGenkaiNatureTypes(
            idKekkeiGenkai
        );
        let images = await this.getKekkeiGenkaiImages(idKekkeiGenkai);
        if (images.length > 0) kekkeiGenkai["images"] = images;
        return kekkeiGenkai;
    } catch (e) {
        throw e;
    }
};
