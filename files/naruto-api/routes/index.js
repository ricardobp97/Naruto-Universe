const express = require("express");
const router = express.Router();
const Characters = require("../controllers/characters");
const Clans = require("../controllers/clans");
const Classifications = require("../controllers/classifications");
const Countries = require("../controllers/countries");
const Domains = require("../controllers/domains");
const KekkeiGenkais = require("../controllers/kekkeiGenkais");
const NatureTypes = require("../controllers/natureTypes");
const Occupations = require("../controllers/occupations");
const Ranks = require("../controllers/ranks");
const Organizations = require("../controllers/organizations");
const Species = require("../controllers/species");
const Villages = require("../controllers/villages");

router.get("/characters", function (req, res) {
    Characters.getAllCharacters()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/characters/:idCharacter", function (req, res) {
    Characters.getCharacter(req.params.idCharacter)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/clans", function (req, res) {
    Clans.getAllClans()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/clans/:idClan", function (req, res) {
    Clans.getClan(req.params.idClan)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/classifications", function (req, res) {
    Classifications.getAllClassifications()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/classifications/:idClassification", function (req, res) {
    Classifications.getClassification(req.params.idClassification)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/countries", function (req, res) {
    Countries.getAllCountries()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/countries/:idCountry", function (req, res) {
    Countries.getCountry(req.params.idCountry)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/domains", function (req, res) {
    Domains.getAllDomains()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/domains/:idDomain", function (req, res) {
    Domains.getDomain(req.params.idDomain)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/kekkeiGenkais", function (req, res) {
    KekkeiGenkais.getAllKekkeiGenkais()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/kekkeiGenkais/:idKekkeiGenkai", function (req, res) {
    KekkeiGenkais.getKekkeiGenkai(req.params.idKekkeiGenkai)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/natureTypes", function (req, res) {
    NatureTypes.getAllNatureTypes()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/natureTypes/:idNatureType", function (req, res) {
    NatureTypes.getNatureType(req.params.idNatureType)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/occupations", function (req, res) {
    Occupations.getAllOccupations()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/occupations/:idOccupation", function (req, res) {
    Occupations.getOccupation(req.params.idOccupation)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/organizations", function (req, res) {
    Organizations.getAllOrganizations()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/organizations/:idOrganizations", function (req, res) {
    Organizations.getOrganization(req.params.idOrganizations)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/ranks", function (req, res) {
    Ranks.getAllRanks()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/ranks/:idRank", function (req, res) {
    Ranks.getRank(req.params.idRank)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/species", function (req, res) {
    Species.getAllSpecies()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/species/:idSpecie", function (req, res) {
    Species.getSpecie(req.params.idSpecie)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/villages", function (req, res) {
    Villages.getAllVillages()
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

router.get("/villages/:idVillage", function (req, res) {
    Villages.getVillage(req.params.idVillage)
        .then((data) => res.jsonp(data))
        .catch((error) => res.status(500).send(`Error: ${error}`));
});

module.exports = router;
