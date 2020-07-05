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

function removeDuplicates(array) {
    let ids = [];
    array.map((o) => (!ids.includes(o.id) ? ids.push(o.id) : o));
    let newArray = ids.map((i) => {
        return array.filter((o) => o.id == i)[0];
    });
    return newArray;
}

function removeDuplicatesAndReorganizate(array) {
    let keys = Object.keys(array[0]).filter((k) => !k.includes("Name"));
    let newObj = {};
    keys.map((k) => (newObj[k] = []));
    keys.map((k) =>
        array.map((o) => newObj[k].push({ id: o[k], name: o[k + "Name"] }))
    );
    keys.map((k) => (newObj[k] = removeDuplicates(newObj[k])));
    keys.map((k) => (newObj[k][1] ? "" : (newObj[k] = newObj[k][0])));
    return newObj;
}

module.exports.getAllCharacters = async () => {
    let query = `SELECT ?id ?name ?image WHERE {
        ?id rdf:type :Character .
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

module.exports.getCharacterAtomicInfo = async (idCharacter) => {
    let query = `SELECT ?name ?image ?age ?sex ?birthdate ?status ?weight ?height ?bloodType ?academyGradAge
    ?chunninGradAge ?background ?personality ?statGenjutsu ?statIntelligence ?statNinjutsu ?statSeals ?statSpeed
    ?statStamina ?statStrength ?statTaijutsu WHERE {
        :${idCharacter} rdf:type :Character .
        :${idCharacter} :name ?name .
        :${idCharacter} :image ?image .
        OPTIONAL{
            :${idCharacter} :personality ?personality .
        }
        OPTIONAL{
            :${idCharacter} :background ?background .
        }
        OPTIONAL{
            :${idCharacter} :chunninGradAge ?chunninGradAge .
        }
        OPTIONAL{
            :${idCharacter} :academyGradAge ?academyGradAge .
        }
        OPTIONAL{
            :${idCharacter} :weight ?weight .
        }
        OPTIONAL{
            :${idCharacter} :bloodType ?bloodType .
        }
        OPTIONAL{
            :${idCharacter} :height ?height .
        }
        OPTIONAL{
            :${idCharacter} :age ?age .
        }
        OPTIONAL{
            :${idCharacter} :birthdate ?birthdate .
        }
        OPTIONAL{
            :${idCharacter} :sex ?sex .
        }
        OPTIONAL{
            :${idCharacter} :status ?status .
        }
        OPTIONAL {
            :${idCharacter} :statGenjutsu ?statGenjutsu .
            :${idCharacter} :statIntelligence ?statIntelligence .
            :${idCharacter} :statNinjutsu ?statNinjutsu .
            :${idCharacter} :statSeals ?statSeals .
            :${idCharacter} :statSpeed ?statSpeed .
            :${idCharacter} :statStamina ?statStamina .
            :${idCharacter} :statStrength ?statStrength .
            :${idCharacter} :statTaijutsu ?statTaijutsu .
        }
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let obj = normalize(response.data)[0];
        if (obj.statGenjutsu) {
            obj.stats = {
                Genjutsu: obj.statGenjutsu,
                Intelligence: obj.statIntelligence,
                Ninjutsu: obj.statNinjutsu,
                Seals: obj.statSeals,
                Speed: obj.statSpeed,
                Stamina: obj.statStamina,
                Strength: obj.statStrength,
                Taijutsu: obj.statTaijutsu,
            };
            delete obj.statGenjutsu;
            delete obj.statIntelligence;
            delete obj.statNinjutsu;
            delete obj.statSeals;
            delete obj.statSpeed;
            delete obj.statStamina;
            delete obj.statStrength;
            delete obj.statTaijutsu;
        }
        return obj;
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterAncestors = async (idCharacter) => {
    let query = `SELECT * WHERE {
        OPTIONAL{
            :${idCharacter} :hasAncestor ?ancestor .
            ?ancestor :name ?ancestorName .
        }
        OPTIONAL{
            :${idCharacter} :hasAunt ?aunt .
            ?aunt :name ?auntName .
        }
        OPTIONAL{
            :${idCharacter} :hasFather ?father .
            ?father :name ?fatherName .
        }
        OPTIONAL{
            :${idCharacter} :hasGodFather ?godFather .
            ?godFather :name ?godFatherName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandFather ?grandFather .
            ?grandFather :name ?grandFatherName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandMother ?grandMother .
            ?grandMother :name ?grandMotherName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandUncle ?grandUncle .
            ?grandUncle :name ?grandUncleName .
        }
        OPTIONAL{
            :${idCharacter} :hasMother ?mother .
            ?mother :name ?motherName .
        }
        OPTIONAL{
            :${idCharacter} :hasUncle ?uncle .
            ?uncle :name ?uncleName .
        }
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        return removeDuplicatesAndReorganizate(normalized);
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterDescendants = async (idCharacter) => {
    let query = `SELECT * WHERE {
        OPTIONAL{
            :${idCharacter} :hasDaughter ?daughter .
            ?daughter :name ?daughterName .
        }
        OPTIONAL{
            :${idCharacter} :hasDescendant ?descendant .
            ?descendant :name ?descendantName .
        }
        OPTIONAL{
            :${idCharacter} :hasGodSon ?godSon .
            ?godSon :name ?godSonName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandDaughter ?grandDaughter .
            ?grandDaughter :name ?grandDaughterName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandNephew ?grandNephew .
            ?grandNephew :name ?grandNephewName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandNiece ?grandNiece .
            ?grandNiece :name ?grandNieceName .
        }
        OPTIONAL{
            :${idCharacter} :hasGrandSon ?grandSon .
            ?grandSon :name ?grandSonName .
        }
        OPTIONAL{
            :${idCharacter} :hasNephew ?nephew .
            ?nephew :name ?nephewName .
        }
        OPTIONAL{
            :${idCharacter} :hasNiece ?niece .
            ?niece :name ?nieceName .
        }
        OPTIONAL{
            :${idCharacter} :hasSon ?son .
            ?son :name ?sonName .
        }
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        return removeDuplicatesAndReorganizate(normalized);
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterSameGeneration = async (idCharacter) => {
    let query = `SELECT * WHERE {
        OPTIONAL{
            :${idCharacter} :hasBrother ?brother .
            ?brother :name ?brotherName .
        }
        OPTIONAL{
            :${idCharacter} :hasCousin ?cousin .
            ?cousin :name ?cousinName .
        }
        OPTIONAL{
            :${idCharacter} :hasHusband ?husband .
            ?husband :name ?husbandName .
        }
        OPTIONAL{
            :${idCharacter} :hasLover ?lover .
            ?lover :name ?loverName .
        }
        OPTIONAL{
            :${idCharacter} :hasSister ?sister .
            ?sister :name ?sisterName .
        }
        OPTIONAL{
            :${idCharacter} :hasWife ?wife .
            ?wife :name ?wifeName .
        }
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        return removeDuplicatesAndReorganizate(normalized);
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterAdoptedFamily = async (idCharacter) => {
    let query = `SELECT * WHERE {
        OPTIONAL{
            :${idCharacter} :hasAdoptedAunt ?adoptedAunt .
            ?adoptedAunt :name ?adoptedAuntName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedBrother ?adoptedBrother .
            ?adoptedBrother :name ?adoptedBrotherName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedCousin ?adoptedCousin .
            ?adoptedCousin :name ?adoptedCousinName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedFather ?adoptedFather .
            ?adoptedFather :name ?adoptedFatherName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedGrandFather ?adoptedGrandFather .
            ?adoptedGrandFather :name ?adoptedGrandFatherName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedGrandMother ?adoptedGrandMother .
            ?adoptedGrandMother :name ?adoptedGrandMotherName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedGrandNephew ?adoptedGrandNephew .
            ?adoptedGrandNephew :name ?adoptedGrandNephewName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedGrandSon ?adoptedGrandSon .
            ?adoptedGrandSon :name ?adoptedGrandSonName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedGrandUncle ?adoptedGrandUncle .
            ?adoptedGrandUncle :name ?adoptedGrandUncleName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedMother ?adoptedMother .
            ?adoptedMother :name ?adoptedMotherName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedNephew ?adoptedNephew .
            ?adoptedNephew :name ?adoptedNephewName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedSon ?adoptedSon .
            ?adoptedSon :name ?adoptedSonName .
        }
        OPTIONAL{
            :${idCharacter} :hasAdoptedUncle ?adoptedUncle .
            ?adoptedUncle :name ?adoptedUncleName .
        }
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        return removeDuplicatesAndReorganizate(normalized);
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterFamily = async (idCharacter) => {
    try {
        let ancestors = await this.getCharacterAncestors(idCharacter);
        let descendants = await this.getCharacterDescendants(idCharacter);
        let sameGeneration = await this.getCharacterSameGeneration(idCharacter);
        let adopted = await this.getCharacterAdoptedFamily(idCharacter);
        let family = {
            ...ancestors,
            ...descendants,
            ...sameGeneration,
            ...adopted,
        };
        return family;
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterPartners = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasPartner ?id .
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

module.exports.getCharacterClan = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :belongsToClan ?id .
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

module.exports.getCharacterRank = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasRank ?id .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        return normalize(response.data)[0];
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterCountry = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :belongsToCountry ?id .
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

module.exports.getCharacterDomain = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :belongsToDomain ?id .
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

module.exports.getCharacterOrganization = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :belongsToOrganization ?id .
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

module.exports.getCharacterVillage = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :belongsToVillage ?id .
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

module.exports.getCharacterNatureTypes = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasNatureType ?id .
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

module.exports.getCharacterKekkeiGenkai = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasKekkeiGenkai ?id .
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

module.exports.getCharacterClassification = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasClassification ?id .
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

module.exports.getCharacterOccupation = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasOccupation ?id .
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

module.exports.getCharacterSpecie = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :isSpecie ?id .
        ?id :name ?name .
    }`;
    let encoded = encodeURIComponent(prefixes + query);
    try {
        let response = await axios.get(getLink + encoded);
        let normalized = normalize(response.data);
        if (normalized.length > 0) return normalized[0];
        else return "Person";
    } catch (e) {
        throw e;
    }
};

module.exports.getCharacterTailedBeast = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasTailedBeast ?id .
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

module.exports.getCharacterImages = async (idCharacter) => {
    let query = `SELECT ?image WHERE {
        :${idCharacter} :hasImage ?id .
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

module.exports.getCharacterJinchuriki = async (idCharacter) => {
    let query = `SELECT ?id ?name WHERE {
        :${idCharacter} :hasJinchuriki ?id .
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

module.exports.getCharacter = async (idCharacter) => {
    try {
        let character = await this.getCharacterAtomicInfo(idCharacter);
        character["specie"] = await this.getCharacterSpecie(idCharacter);
        character["jinchuriki"] = await this.getCharacterJinchuriki(
            idCharacter
        );
        character["rank"] = await this.getCharacterRank(idCharacter);
        character["clan"] = await this.getCharacterClan(idCharacter);
        character["classification"] = await this.getCharacterClassification(
            idCharacter
        );
        character["tailedBeast"] = await this.getCharacterTailedBeast(
            idCharacter
        );
        character["occupation"] = await this.getCharacterOccupation(
            idCharacter
        );
        character["partner"] = await this.getCharacterPartners(idCharacter);
        character["country"] = await this.getCharacterCountry(idCharacter);
        character["domain"] = await this.getCharacterDomain(idCharacter);
        character["organization"] = await this.getCharacterOrganization(
            idCharacter
        );
        character["village"] = await this.getCharacterVillage(idCharacter);
        character["natureTypes"] = await this.getCharacterNatureTypes(
            idCharacter
        );
        character["kekkeiGenkai"] = await this.getCharacterKekkeiGenkai(
            idCharacter
        );
        let family = await this.getCharacterFamily(idCharacter);
        if (Object.keys(family)[0]) character["family"] = family;
        let images = await this.getCharacterImages(idCharacter);
        if (images.length > 0) character["images"] = images;
        return character;
    } catch (e) {
        throw e;
    }
};
