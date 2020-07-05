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

module.exports.getAllOrganizations = async () => {
    let query = `SELECT ?id ?name WHERE {
        ?id rdf:type :Organization .
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

module.exports.getOrganizationAtomicInfo = async (idOrganization) => {
    let query = `SELECT * WHERE {
        :${idOrganization} rdf:type :Organization .
        :${idOrganization} :name ?name .
        :${idOrganization} :overview ?overview .
        OPTIONAL{
            :${idOrganization} :history ?history .
        }
        :${idOrganization} :image ?image .
        OPTIONAL{
            :${idOrganization} :symbol ?symbol .
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

module.exports.getOrganizationLeader = async (idOrganization) => {
    let query = `SELECT * WHERE {
        :${idOrganization} rdf:type :Organization .
        :${idOrganization} :hasLeader ?id .
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

module.exports.getOrganizationMembers = async (idOrganization) => {
    let query = `SELECT * WHERE {
        :${idOrganization} rdf:type :Organization .
        :${idOrganization} :hasMember ?id .
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

module.exports.getOrganizationImages = async (idOrganization) => {
    let query = `SELECT ?image WHERE {
        :${idOrganization} :hasImage ?id .
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

module.exports.getOrganization = async (idOrganization) => {
    try {
        let organization = await this.getOrganizationAtomicInfo(idOrganization);
        organization["leader"] = await this.getOrganizationLeader(
            idOrganization
        );
        organization["members"] = await this.getOrganizationMembers(
            idOrganization
        );
        let images = await this.getOrganizationImages(idOrganization);
        if (images.length > 0) organization["images"] = images;
        return organization;
    } catch (e) {
        throw e;
    }
};
