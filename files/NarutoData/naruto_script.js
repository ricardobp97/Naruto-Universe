const fs = require("fs");
/*
// Preparing Villages TTL
let data = fs.readFileSync("./data/json/naruto_villages.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Village ;\n               :name "' +
        c.name +
        '" ';
    if (c.country) {
        text +=
            ";\n               :country :" +
            c.country
                .replace(/ /g, "_")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ";
    }
    if (c.leader) {
        if (Array.isArray(c.leader)) {
            text +=
                ";\n               :hasLeader :" +
                c.leader[0]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < c.leader.length; i++) {
                text +=
                    "\n                         :" +
                    c.leader[i]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        } else {
            text +=
                ";\n               :hasLeader :" +
                c.leader
                    .replace(/\-| /g, "_")
                    .replace(/\'s|\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ";
        }
    }
    if (c.clans) {
        text +=
            ";\n                :hasClan :" +
            c.clans[0]
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.clans.length; i++) {
            text +=
                "\n                     :" +
                c.clans[i]
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.image) {
        text += ';\n                :image "' + c.image[0] + '" ';
        if (c.image[1]) {
            text +=
                ";\n                :hasImage :" +
                c.name
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                "_image1" +
                " ,";
            for (let i = 2; i < c.image.length; i++) {
                text +=
                    "\n                             :" +
                    c.name
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    "_image" +
                    i +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.symbol) {
        text += ';\n               :symbol "' + c.symbol + '" ';
    }
    if (c.englishName) {
        text += ';\n               :englishName "' + c.englishName + '" ';
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    if (c.history) {
        text +=
            ';\n               :history "' +
            c.history.replace(/\"/g, '\\"') +
            '" ';
    }
    if (c.stats) {
        text += ";\n               :statPopulation " + c.stats.population + " ";
        text += ";\n               :statMilitary " + c.stats.military + " ";
        text += ";\n               :statEconomy " + c.stats.economy + " ";
    }
    text += ".\n\n\n";
});
fs.writeFile("./villages_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Species TTL
let data = fs.readFileSync("./data/json/naruto_species.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name.replace(" ", "_") +
        "\n:" +
        c.name.replace(" ", "_") +
        ' rdf:type owl:NamedIndividual ,\n                    :Species ;\n               :name "' +
        c.name +
        '" ';
    if (c.members) {
        text +=
            ";\n               :hasMember :" +
            c.members[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.members.length; i++) {
            text +=
                "\n                         :" +
                c.members[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.summoners) {
        text +=
            ";\n               :hasSummoner :" +
            c.summoners[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.summoners.length; i++) {
            text +=
                "\n                         :" +
                c.summoners[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.image) {
        text += ';\n               :image "' + c.image + '" ';
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./species_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
//Preparing Ranks TTL
let data = fs.readFileSync("./data/json/naruto_ranks.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(" ", "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(" ", "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Rank ;\n               :name "' +
        c.name +
        '" ';
    text +=
        ';\n               :description "' +
        c.description.replace(/\"/g, '\\"') +
        '" ';
    text += ".\n\n\n";
});
fs.writeFile("./ranks_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Organizations TTL
let data = fs.readFileSync("./data/json/naruto_organizations.json");
let list = JSON.parse(data);
let v = fs.readFileSync("./data/json/naruto_villages.json");
let villages = JSON.parse(v).map((e) => e.name);
let co = fs.readFileSync("./data/json/naruto_countries.json");
let countries = JSON.parse(co).map((e) => e.name);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Organization ;\n               :name "' +
        c.name +
        '" ';
    if (c.affiliation) {
        let tmpVillages = [];
        let tmpCountries = [];
        c.affiliation.map((a) => {
            if (villages.includes(a)) tmpVillages.push(a);
            if (countries.includes(a)) tmpCountries.push(a);
        });

        if (tmpVillages.length > 0) {
            text +=
                ";\n               :belongsToVillage :" +
                tmpVillages[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < tmpVillages.length; i++) {
                text +=
                    "\n                                :" +
                    tmpVillages[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (tmpCountries.length > 0) {
            text +=
                ";\n               :belongsToCountry :" +
                tmpCountries[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < tmpCountries.length; i++) {
                text +=
                    "\n                                :" +
                    tmpCountries[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.leader) {
        if (c.name != "Allied Shinobi Forces") {
            text +=
                ";\n               :hasLeader :" +
                c.leader[0]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < c.leader.length; i++) {
                text +=
                    "\n                         :" +
                    c.leader[i]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        } else {
            text +=
                ";\n               :hasLeader :" +
                c.leader[0].supremeLeader
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            text +=
                "\n                         :" +
                c.leader[1].regimentalCommander
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.members) {
        text +=
            ";\n               :hasMember :" +
            c.members[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.members.length; i++) {
            text +=
                "\n                         :" +
                c.members[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.image) {
        text += ';\n               :image "' + c.image[0] + '" ';
        if (c.image[1]) {
            text +=
                ";\n               :hasImage :" +
                c.name
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                "_image1" +
                " ,";
            for (let i = 2; i < c.image.length; i++) {
                text +=
                    "\n                             :" +
                    c.name
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    "_image" +
                    i +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.symbol) {
        text += ';\n               :symbol "' + c.symbol + '" ';
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    if (c.history) {
        text +=
            ';\n               :history "' +
            c.history.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./organizations_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Occupations TTL
let data = fs.readFileSync("./data/json/naruto_occupations.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/\-| /g, "_")
            .replace(/\'s|\(|\)/g, "")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/\-| /g, "_")
            .replace(/\'s|\(|\)/g, "")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Occupation ;\n               :name "' +
        c.name +
        '" ';
    if (c.members) {
        text +=
            ";\n               :hasMember :" +
            c.members[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.members.length; i++) {
            text +=
                "\n                         :" +
                c.members[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.image) {
        text += ';\n                :image "' + c.image + '" ';
    }
    if (c.description) {
        text +=
            ';\n                :description "' +
            c.description.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./occupations_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Nature Types TTL
let data = fs.readFileSync("./data/naruto_nature_types.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name +
        "\n:" +
        c.name +
        ' rdf:type owl:NamedIndividual ,\n                    :NatureType ;\n               :name "' +
        c.name +
        '" ';
    text +=
        ';\n               :description "' +
        c.description.replace(/\"/g, '\\"') +
        '" ';
    text += ".\n\n\n";
});
fs.writeFile("./nature_types_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Kekkei Genkais TTL
let data = fs.readFileSync("./data/json/naruto_kekkei_genkai.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :KekkeiGenkai ;\n               :name "' +
        c.name +
        '" ';
    if (c.clan) {
        text +=
            ";\n                :belongsToClan :" +
            c.clan[0]
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.clan.length; i++) {
            text +=
                "\n                             :" +
                c.clan[i]
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.basicTypes) {
        text += ";\n                :isFormedBy :" + c.basicTypes[0] + " ,";
        for (let i = 1; i < c.basicTypes.length; i++) {
            text += "\n                         :" + c.basicTypes[i] + " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.image) {
        text += ';\n                :image "' + c.image[0] + '" ';
        if (c.image[1]) {
            text +=
                ";\n                :hasImage :" +
                c.name
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                "_image1" +
                " ,";
            for (let i = 2; i < c.image.length; i++) {
                text +=
                    "\n                         :" +
                    c.name
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    "_image" +
                    i +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.classfication) {
        text += ';\n                :classfication "' + c.classfication + '" ';
    }
    if (c.description) {
        text +=
            ';\n                :description "' +
            c.description.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./kekkei_genkais_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Images TTL
let data = fs.readFileSync("./data/json/naruto_characters.json");
let list = JSON.parse(data);
let c = fs.readFileSync("./data/json/naruto_clans.json");
let clans = JSON.parse(c);
let k = fs.readFileSync("./data/json/naruto_kekkei_genkai.json");
let kekkeiGenkais = JSON.parse(k);
let o = fs.readFileSync("./data/json/naruto_organizations.json");
let organizations = JSON.parse(o);
let v = fs.readFileSync("./data/json/naruto_villages.json");
let villages = JSON.parse(v);
let text = "";
list.map((c) => {
    if (c.image) {
        let name = c.name
            .replace(/ /g, "_")
            .replace(/\(|\)/g, "")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u");
        for (let i = 1; i < c.image.length; i++) {
            text +=
                "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
                name +
                "_image" +
                i +
                "\n:" +
                name +
                "_image" +
                i +
                " rdf:type owl:NamedIndividual ,\n                    :Image ;\n               :belongsToCharacter :" +
                name +
                " ;" +
                '\n               :image "' +
                c.image[i] +
                '" .\n\n\n';
        }
    }
});
clans.map((c) => {
    if (c.image) {
        let name = c.name
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u");
        for (let i = 1; i < c.image.length; i++) {
            text +=
                "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
                name +
                "_image" +
                i +
                "\n:" +
                name +
                "_image" +
                i +
                " rdf:type owl:NamedIndividual ,\n                    :Image ;\n               :belongsToClan :" +
                name +
                " ;" +
                '\n               :image "' +
                c.image[i] +
                '" .\n\n\n';
        }
    }
});
kekkeiGenkais.map((c) => {
    if (c.image) {
        let name = c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u");
        for (let i = 1; i < c.image.length; i++) {
            text +=
                "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
                name +
                "_image" +
                i +
                "\n:" +
                name +
                "_image" +
                i +
                " rdf:type owl:NamedIndividual ,\n                    :Image ;\n               :belongsToKekkeiGenkai :" +
                name +
                " ;" +
                '\n               :image "' +
                c.image[i] +
                '" .\n\n\n';
        }
    }
});
organizations.map((c) => {
    if (c.image) {
        let name = c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u");
        for (let i = 1; i < c.image.length; i++) {
            text +=
                "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
                name +
                "_image" +
                i +
                "\n:" +
                name +
                "_image" +
                i +
                " rdf:type owl:NamedIndividual ,\n                    :Image ;\n               :belongsToOrganization :" +
                name +
                " ;" +
                '\n               :image "' +
                c.image[i] +
                '" .\n\n\n';
        }
    }
});
villages.map((c) => {
    if (c.image) {
        let name = c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u");
        for (let i = 1; i < c.image.length; i++) {
            text +=
                "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
                name +
                "_image" +
                i +
                "\n:" +
                name +
                "_image" +
                i +
                " rdf:type owl:NamedIndividual ,\n                    :Image ;\n               :belongsToVillage :" +
                name +
                " ;" +
                '\n               :image "' +
                c.image[i] +
                '" .\n\n\n';
        }
    }
});
fs.writeFile("./images_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Domains TTL
let data = fs.readFileSync("./data/json/naruto_domains.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Domain ;\n               :name "' +
        c.name +
        '" ';
    if (c.leader) {
        text +=
            ";\n               :hasLeader :" +
            c.leader
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ";
    }
    if (c.inhabitants) {
        text +=
            ";\n               :hasMember :" +
            c.inhabitants[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.inhabitants.length; i++) {
            text +=
                "\n                         :" +
                c.inhabitants[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.summoners) {
        text +=
            ";\n               :hasSummoner :" +
            c.summoners[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.summoners.length; i++) {
            text +=
                "\n                         :" +
                c.summoners[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.symbol) {
        text += ';\n               :symbol "' + c.symbol + '" ';
    }
    if (c.image) {
        text += ';\n               :image "' + c.image + '" ';
    }
    if (c.englishName) {
        text += ';\n               :englishName "' + c.englishName + '" ';
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    if (c.history) {
        text +=
            ';\n               :history "' +
            c.history.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./domains_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Countries TTL
let data = fs.readFileSync("./data/json/naruto_countries.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/ /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Country ;\n               :name "' +
        c.name +
        '" ';
    if (c.symbol) {
        text += ';\n               :symbol "' + c.symbol + '" ';
    }
    if (c.image) {
        text += ';\n               :image "' + c.image + '" ';
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./countries_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Classifications TTL
let data = fs.readFileSync("./data/json/naruto_classifications.json");
let list = JSON.parse(data);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/\-| /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/\-| /g, "_")
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Classification ;\n               :name "' +
        c.name +
        '" ';
    text +=
        ';\n               :description "' +
        c.description.replace(/\"/g, '\\"') +
        '" ';
    text += ".\n\n\n";
});
fs.writeFile("./classifications_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Clans TTL
let data = fs.readFileSync("./data/json/naruto_clans.json");
let list = JSON.parse(data);
let v = fs.readFileSync("./data/json/naruto_villages.json");
let villages = JSON.parse(v).map((e) => e.name);
let c = fs.readFileSync("./data/json/naruto_countries.json");
let countries = JSON.parse(c).map((e) => e.name);
let text = "";
list.map((c) => {
    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        c.name
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        "\n:" +
        c.name
            .replace(/\ō/g, "o")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U")
            .replace(/\ū/g, "u") +
        ' rdf:type owl:NamedIndividual ,\n                    :Clan ;\n               :name "' +
        c.name +
        '" ';

    if (c.affiliation) {
        let tmpVillages = [];
        let tmpCountries = [];
        c.affiliation.map((a) => {
            if (villages.includes(a)) tmpVillages.push(a);
            if (countries.includes(a)) tmpCountries.push(a);
        });

        if (tmpVillages.length > 0) {
            text +=
                ";\n               :belongsToVillage :" +
                tmpVillages[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < tmpVillages.length; i++) {
                text +=
                    "\n                                :" +
                    tmpVillages[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (tmpCountries.length > 0) {
            text +=
                ";\n               :belongsToCountry :" +
                tmpCountries[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
            for (let i = 1; i < tmpCountries.length; i++) {
                text +=
                    "\n                                :" +
                    tmpCountries[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U")
                        .replace(/\ū/g, "u") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.kekkeiGenkai) {
        text +=
            ";\n               :hasKekkeiGenkai :" +
            c.kekkeiGenkai[0]
                .replace(/ /g, "_")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.kekkeiGenkai.length; i++) {
            text +=
                "\n                         :" +
                c.kekkeiGenkai[i]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.leader) {
        text +=
            ";\n               :hasLeader :" +
            c.leader
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ";
    }
    if (c.image) {
        text += ';\n               :image "' + c.image[0] + '" ';
        if (c.image[1]) {
            text +=
                ";\n               :hasImage :" +
                c.name
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                "_image1" +
                " ,";
            for (let i = 2; i < c.image.length; i++) {
                text +=
                    "\n                             :" +
                    c.name +
                    "_image" +
                    i +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }
    if (c.members) {
        text +=
            ";\n               :hasMember :" +
            c.members[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U")
                .replace(/\ū/g, "u") +
            " ,";
        for (let i = 1; i < c.members.length; i++) {
            text +=
                "\n                         :" +
                c.members[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
                    .replace(/\ū/g, "u") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }
    if (c.overview) {
        text +=
            ';\n               :overview "' +
            c.overview.replace(/\"/g, '\\"') +
            '" ';
    }
    text += ".\n\n\n";
});
fs.writeFile("./clans_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
/*
// Preparing Characters TTL
let data = fs.readFileSync("./data/json/naruto_characters.json");
let list = JSON.parse(data);
let v = fs.readFileSync("./data/json/naruto_villages.json");
let villages = JSON.parse(v).map((e) => e.name);
let o = fs.readFileSync("./data/json/naruto_organizations.json");
let organizations = JSON.parse(o).map((e) => e.name);
let c = fs.readFileSync("./data/json/naruto_countries.json");
let countries = JSON.parse(c).map((e) => e.name);
let d = fs.readFileSync("./data/json/naruto_domains.json");
let domains = JSON.parse(d).map((e) => e.name);
let t = fs.readFileSync("./data/json/naruto_nature_types.json");
let types = JSON.parse(t).map((e) => e.name);
let all = [];
list.filter((e) => e.jinchuriki)
    .map((b) => b.jinchuriki)
    .map((li) => li.map((l) => all.push(l)));
let jinchurikis = Array.from(new Set(all)).map((e) =>
    e
        .replace(/ /g, "_")
        .replace(/\(|\)/g, "")
        .replace(/\ō/g, "o")
        .replace(/\Ō/g, "O")
        .replace(/\Ū/g, "U")
        .replace(/\ū/g, "u")
);
let characters = {};
for (let i = 0; i < jinchurikis.length; i++) {
    characters[jinchurikis[i]] = [];
}
list.filter((e) => e.jinchuriki).map((b) => {
    b.jinchuriki.map((j) => {
        let name = j
            .replace(/ /g, "_")
            .replace(/\(|\)/g, "")
            .replace(/\ō/g, "o")
            .replace(/\ū/g, "u")
            .replace(/\Ō/g, "O")
            .replace(/\Ū/g, "U");
        characters[name].push(b.name);
    });
});
let text = "";
list.map((c) => {
    let name = c.name
        .replace(/ /g, "_")
        .replace(/\(|\)/g, "")
        .replace(/\ō/g, "o")
        .replace(/\ū/g, "u")
        .replace(/\Ō/g, "O")
        .replace(/\Ū/g, "U");

    text +=
        "###  http://www.semanticweb.org/bosch/ontologies/2020/4/naruto#" +
        name +
        "\n:" +
        name +
        ' rdf:type owl:NamedIndividual ,\n                       :Character ;\n              :name "' +
        c.name +
        '" ';

    if (c.species) {
        text +=
            ";\n                :isSpecie :" +
            c.species.replace(" ", "_") +
            " ";
    }

    if (c.kekkeiGenkai) {
        text +=
            ";\n                :hasKekkeiGenkai :" +
            c.kekkeiGenkai[0]
                .replace(/ /g, "_")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ,";
        for (let i = 1; i < c.kekkeiGenkai.length; i++) {
            text +=
                "\n                                 :" +
                c.kekkeiGenkai[i]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (c.classification) {
        text +=
            ";\n                :hasClassification :" +
            c.classification[0]
                .replace(/\-| /g, "_")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ,";
        for (let i = 1; i < c.classification.length; i++) {
            text +=
                "\n                                 :" +
                c.classification[i]
                    .replace(/\-| /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (jinchurikis.includes(name)) {
        text +=
            ";\n                :hasTailedBeast :" +
            characters[name][0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ,";
        for (let i = 1; i < characters[name].length; i++) {
            text +=
                "\n                                 :" +
                characters[name][i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (c.occupation) {
        text +=
            ";\n                :hasOccupation :" +
            c.occupation[0]
                .replace(/\-| /g, "_")
                .replace(/\'s|\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ,";
        for (let i = 1; i < c.occupation.length; i++) {
            text +=
                "\n                             :" +
                c.occupation[i]
                    .replace(/\-| /g, "_")
                    .replace(/\'s|\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (c.affiliation) {
        let tmpVillages = [];
        let tmpOrganizations = [];
        let tmpDomains = [];
        let tmpCountries = [];
        c.affiliation.map((a) => {
            if (villages.includes(a)) tmpVillages.push(a);
            if (organizations.includes(a)) tmpOrganizations.push(a);
            if (domains.includes(a)) tmpDomains.push(a);
            if (countries.includes(a)) tmpCountries.push(a);
        });

        if (tmpVillages.length > 0) {
            text +=
                ";\n                :belongsToVillage :" +
                tmpVillages[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < tmpVillages.length; i++) {
                text +=
                    "\n                                 :" +
                    tmpVillages[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (tmpOrganizations.length > 0) {
            text +=
                ";\n                :belongsToOrganization :" +
                tmpOrganizations[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < tmpOrganizations.length; i++) {
                text +=
                    "\n                                 :" +
                    tmpOrganizations[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (tmpDomains.length > 0) {
            text +=
                ";\n                :belongsToDomain :" +
                tmpDomains[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < tmpDomains.length; i++) {
                text +=
                    "\n                                 :" +
                    tmpDomains[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (tmpCountries.length > 0) {
            text +=
                ";\n                :belongsToCountry :" +
                tmpCountries[0]
                    .replace(/ /g, "_")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < tmpCountries.length; i++) {
                text +=
                    "\n                                 :" +
                    tmpCountries[i]
                        .replace(/ /g, "_")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }

    if (c.rank) {
        text +=
            ";\n                :hasRank :" +
            c.rank
                .replace(" ", "_")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ";
    }

    if (c.partner) {
        if (Array.isArray(c.partner)) {
            text +=
                ";\n                :hasPartner :" +
                c.partner[0]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < c.partner.length; i++) {
                text +=
                    "\n                                 :" +
                    c.partner[i]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        } else {
            text +=
                ";\n                :hasPartner :" +
                c.partner
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
    }

    if (c.clan) {
        if (Array.isArray(c.clan)) {
            text +=
                ";\n                :belongsToClan :" +
                c.clan[0]
                    .split(" ")[0]
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
            for (let i = 1; i < c.clan.length; i++) {
                text +=
                    "\n                                 :" +
                    c.clan[i]
                        .split(" ")[0]
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        } else {
            text +=
                ";\n                :belongsToClan :" +
                c.clan
                    .split(" ")[0]
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
    }

    if (c.jinchuriki) {
        text +=
            ";\n                :hasJinchuriki :" +
            c.jinchuriki[0]
                .replace(/ /g, "_")
                .replace(/\(|\)/g, "")
                .replace(/\ō/g, "o")
                .replace(/\ū/g, "u")
                .replace(/\Ō/g, "O")
                .replace(/\Ū/g, "U") +
            " ,";
        for (let i = 1; i < c.jinchuriki.length; i++) {
            text +=
                "\n                             :" +
                c.jinchuriki[i]
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (c.natureTypes) {
        let tmpTypes = c.natureTypes.filter((n) => types.includes(n));
        text += ";\n                :hasNatureType :" + tmpTypes[0] + " ,";
        for (let i = 1; i < tmpTypes.length; i++) {
            text += "\n                         :" + tmpTypes[i] + " ,";
        }
        text = text.substring(0, text.length - 1);
    }

    if (c.family) {
        if (c.family.son) {
            if (!Array.isArray(c.family.son)) {
                text +=
                    ";\n                :hasSon :" +
                    c.family.son
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasSon :" +
                    c.family.son[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.son.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.son[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.nephew) {
            if (!Array.isArray(c.family.nephew)) {
                text +=
                    ";\n                :hasNephew :" +
                    c.family.nephew
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasNephew :" +
                    c.family.nephew[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.nephew.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.nephew[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.adoptedSon) {
            if (!Array.isArray(c.family.adoptedSon)) {
                text +=
                    ";\n                :hasAdoptedSon :" +
                    c.family.adoptedSon
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasAdoptedSon :" +
                    c.family.adoptedSon[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.adoptedSon.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.adoptedSon[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.father) {
            text +=
                ";\n                :hasFather :" +
                c.family.father
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.cousin) {
            if (!Array.isArray(c.family.cousin)) {
                text +=
                    ";\n                :hasCousin :" +
                    c.family.cousin
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasCousin :" +
                    c.family.cousin[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.cousin.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.cousin[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.adoptedBrother) {
            if (!Array.isArray(c.family.adoptedBrother)) {
                text +=
                    ";\n                :hasAdoptedBrother :" +
                    c.family.adoptedBrother
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasAdoptedBrother :" +
                    c.family.adoptedBrother[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.adoptedBrother.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.adoptedBrother[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.mother) {
            text +=
                ";\n                :hasMother :" +
                c.family.mother
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.daughter) {
            if (!Array.isArray(c.family.daughter)) {
                text +=
                    ";\n                :hasDaughter :" +
                    c.family.daughter
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasDaughter :" +
                    c.family.daughter[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.daughter.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.daughter[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.wife) {
            text +=
                ";\n                :hasWife :" +
                c.family.wife
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.grandMother) {
            if (!Array.isArray(c.family.grandMother)) {
                text +=
                    ";\n                :hasGrandMother :" +
                    c.family.grandMother
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasGrandMother :" +
                    c.family.grandMother[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.grandMother.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.grandMother[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.grandFather) {
            if (!Array.isArray(c.family.grandFather)) {
                text +=
                    ";\n                :hasGrandFather :" +
                    c.family.grandFather
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasGrandFather :" +
                    c.family.grandFather[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.grandFather.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.grandFather[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.uncle) {
            if (!Array.isArray(c.family.uncle)) {
                text +=
                    ";\n                :hasUncle :" +
                    c.family.uncle
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasUncle :" +
                    c.family.uncle[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.uncle.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.uncle[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.brother) {
            if (!Array.isArray(c.family.brother)) {
                text +=
                    ";\n                :hasBrother :" +
                    c.family.brother
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasBrother :" +
                    c.family.brother[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.brother.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.brother[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.sister) {
            if (!Array.isArray(c.family.sister)) {
                text +=
                    ";\n                :hasSister :" +
                    c.family.sister
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasSister :" +
                    c.family.sister[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.sister.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.sister[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.grandDaughter) {
            if (!Array.isArray(c.family.grandDaughter)) {
                text +=
                    ";\n                :hasGrandDaughter :" +
                    c.family.grandDaughter
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasGrandDaughter :" +
                    c.family.grandDaughter[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.grandDaughter.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.grandDaughter[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.husband) {
            text +=
                ";\n                :hasHusband :" +
                c.family.husband
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.grandSon) {
            if (!Array.isArray(c.family.grandSon)) {
                text +=
                    ";\n                :hasGrandSon :" +
                    c.family.grandSon
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasGrandSon :" +
                    c.family.grandSon[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.grandSon.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.grandSon[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.adoptedCousin) {
            if (!Array.isArray(c.family.adoptedCousin)) {
                text +=
                    ";\n                :hasAdoptedCousin :" +
                    c.family.adoptedCousin
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasAdoptedCousin :" +
                    c.family.adoptedCousin[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.adoptedCousin.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.adoptedCousin[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.grandUncle) {
            if (!Array.isArray(c.family.grandUncle)) {
                text +=
                    ";\n                :hasGrandUncle :" +
                    c.family.grandUncle
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasGrandUncle :" +
                    c.family.grandUncle[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.grandUncle.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.grandUncle[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.aunt) {
            text +=
                ";\n                :hasAunt :" +
                c.family.aunt
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.niece) {
            if (!Array.isArray(c.family.niece)) {
                text +=
                    ";\n                :hasNiece :" +
                    c.family.niece
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ";
            } else {
                text +=
                    ";\n                :hasNiece :" +
                    c.family.niece[0]
                        .replace(/ /g, "_")
                        .replace(/\(|\)/g, "")
                        .replace(/\ō/g, "o")
                        .replace(/\ū/g, "u")
                        .replace(/\Ō/g, "O")
                        .replace(/\Ū/g, "U") +
                    " ,";
                for (let i = 1; i < c.family.niece.length; i++) {
                    text +=
                        "\n                     :" +
                        c.family.niece[i]
                            .replace(/ /g, "_")
                            .replace(/\(|\)/g, "")
                            .replace(/\ō/g, "o")
                            .replace(/\ū/g, "u")
                            .replace(/\Ō/g, "O")
                            .replace(/\Ū/g, "U") +
                        " ,";
                }
                text = text.substring(0, text.length - 1);
            }
        }
        if (c.family.lover) {
            text +=
                ";\n                :hasLover :" +
                c.family.lover
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.grandNephew) {
            text +=
                ";\n                :hasGrandNephew :" +
                c.family.grandNephew
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.grandNiece) {
            text +=
                ";\n                :hasGrandNiece :" +
                c.family.grandNiece
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedUncle) {
            text +=
                ";\n                :hasAdoptedUncle :" +
                c.family.adoptedUncle
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.godSon) {
            text +=
                ";\n                :hasGodSon :" +
                c.family.godSon
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedMother) {
            text +=
                ";\n                :hasAdoptedMother :" +
                c.family.adoptedMother
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedNephew) {
            text +=
                ";\n                :hasAdoptedNephew :" +
                c.family.adoptedNephew
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedGrandSon) {
            text +=
                ";\n                :hasAdoptedGrandSon :" +
                c.family.adoptedGrandSon
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedFather) {
            text +=
                ";\n                :hasAdoptedFather :" +
                c.family.adoptedFather
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.godFather) {
            text +=
                ";\n                :hasGodFather :" +
                c.family.godFather
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedGrandFather) {
            text +=
                ";\n                :hasAdoptedGrandFather :" +
                c.family.adoptedGrandFather
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedGrandMother) {
            text +=
                ";\n                :hasAdoptedGrandMother :" +
                c.family.adoptedGrandMother
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedGrandNephew) {
            text +=
                ";\n                :hasAdoptedGrandNephew :" +
                c.family.adoptedGrandNephew
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedAunt) {
            text +=
                ";\n                :hasAdoptedAunt :" +
                c.family.adoptedAunt
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        if (c.family.adoptedGrandUncle) {
            text +=
                ";\n                :hasAdoptedGrandUncle :" +
                c.family.adoptedGrandUncle
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U") +
                " ";
        }
        let ancestors = [];
        let descendants = [];
        if (c.family.greatGrandFather) {
            ancestors.push(
                c.family.greatGrandFather
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.greatGrandDaughter) {
            descendants.push(
                c.family.greatGrandDaughter
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.greatGrandSon) {
            descendants.push(
                c.family.greatGrandSon
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.greatGreatGrandDaughter) {
            descendants.push(
                c.family.greatGreatGrandDaughter
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.greatGreatGrandFather) {
            ancestors.push(
                c.family.greatGreatGrandFather
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.ancestor) {
            ancestors.push(
                c.family.ancestor
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (c.family.descendant) {
            descendants.push(
                c.family.descendant
                    .replace(/ /g, "_")
                    .replace(/\(|\)/g, "")
                    .replace(/\ō/g, "o")
                    .replace(/\ū/g, "u")
                    .replace(/\Ō/g, "O")
                    .replace(/\Ū/g, "U")
            );
        }
        if (ancestors.length > 0) {
            text += ";\n                :hasAncestor :" + ancestors[0] + " ,";
            for (let i = 1; i < ancestors.length; i++) {
                text +=
                    "\n                             :" + ancestors[i] + " ,";
            }
            text = text.substring(0, text.length - 1);
        }
        if (descendants.length > 0) {
            text +=
                ";\n                :hasDescendant :" + descendants[0] + " ,";
            for (let i = 1; i < descendants.length; i++) {
                text += "\n                         :" + descendants[i] + " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }

    if (c.image) {
        text += ';\n                :image "' + c.image[0] + '" ';
        if (c.image[1]) {
            text += ";\n                :hasImage :" + name + "_image1" + " ,";
            for (let i = 2; i < c.image.length; i++) {
                text +=
                    "\n                             :" +
                    name +
                    "_image" +
                    i +
                    " ,";
            }
            text = text.substring(0, text.length - 1);
        }
    }

    if (c.birthdate)
        text += ';\n                :birthdate "' + c.birthdate + '" ';
    if (c.sex) text += ';\n                :sex "' + c.sex + '" ';
    if (c.status) text += ';\n                :status "' + c.status + '" ';
    if (c.age) text += ";\n                :age " + c.age + " ";
    if (c.height) text += ';\n                :height "' + c.height + '" ';
    if (c.weight) text += ';\n                :weight "' + c.weight + '" ';
    if (c.tails) text += ";\n                :tails " + c.tails + " ";
    if (c.bloodType)
        text += ';\n                :bloodType "' + c.bloodType + '" ';
    if (c.stats) {
        text += ";\n                :statNinjutsu " + c.stats.ninjutsu + " ";
        text += ";\n                :statTaijutsu " + c.stats.taijutsu + " ";
        text += ";\n                :statGenjutsu " + c.stats.genjutsu + " ";
        text +=
            ";\n                :statIntelligence " +
            c.stats.intelligence +
            " ";
        text += ";\n                :statStrength " + c.stats.strength + " ";
        text += ";\n                :statSpeed " + c.stats.speed + " ";
        text += ";\n                :statStamina " + c.stats.stamina + " ";
        text += ";\n                :statSeals " + c.stats.seals + " ";
    }
    if (c.academyGradAge)
        text += ";\n                :academyGradAge " + c.academyGradAge + " ";
    if (c.chunninGradAge)
        text += ";\n                :chunninGradAge " + c.chunninGradAge + " ";
    if (c.background)
        text +=
            ';\n                :background "' +
            c.background.replace(/\"/g, '\\"') +
            '" ';
    if (c.personality)
        text +=
            ';\n                :personality "' +
            c.personality.replace(/\"/g, '\\"') +
            '" ';
    text += ".\n\n\n";
});
fs.writeFile("./characters_final.ttl", text, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
