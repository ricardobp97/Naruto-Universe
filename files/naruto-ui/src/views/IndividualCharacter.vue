<template>
  <div id="character">
    <v-container>
      <h1 class="mt-5">{{ character.name }}</h1>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="300px"
            :src="character.image"
          >
          </v-img>

          <v-card-text class="info-text">
            <ul>
              <li v-if="character.sex"><b>Sex:</b> {{ character.sex }}</li>
              <li v-if="character.age"> <b>Age:</b> {{ character.age }}</li>
              <li v-if="character.weight"> <b>Weight:</b> {{ character.weight }}</li>
              <li v-if="character.height"> <b>Height:</b> {{ character.height }}</li>
              <li v-if="character.specie.id"> <b>Specie:</b> <router-link :to="'/species/'+character.specie.id">{{ character.specie.name }}</router-link></li>
              <li v-else> <b>Specie:</b> {{ character.specie }}</li>
              <li v-if="character.bloodType"> <b>BloodType:</b> {{ character.bloodType }}</li>
              <li v-if="character.academyGradAge"> <b>AcademyGradAge:</b> {{ character.academyGradAge }}</li>
              <li v-if="character.chunninGradAge"> <b>ChunninGradAge:</b> {{ character.chunninGradAge }}</li>
              <li v-if="character.birthdate"> <b>BirthDate:</b> {{ character.birthdate }}</li>
              <li v-if="character.personality">
                <div v-if="character.personality.length < 1200">
                  <b>Personality:</b> {{ character.personality }}
                </div>
                <div v-else>
                  <div v-if="personalityFlag">
                    <b>Personality:</b> {{ character.personality.match(/(.{1,1200})/g)[0] }} ...
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="morePersonality">
                          More
                          <v-icon dark right>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <b>Personality:</b> {{ character.personality }}
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="hidePersonality">
                          Hide
                          <v-icon dark right>mdi-arrow-up</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </li>
              <li v-if="character.background">
                <div v-if="character.background.length < 1200">
                  <b>Background:</b> {{ character.background }}
                </div>
                <div v-else>
                  <div v-if="backgroundFlag">
                    <b>Background:</b> {{ character.background.match(/(.{1,1200})/g)[0] }} ...
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="moreBackground">
                          More
                          <v-icon dark right>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <b>Background:</b> {{ character.background }}
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="hideBackground">
                          Hide
                          <v-icon dark right>mdi-arrow-up</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </li>
              <div v-if="character.stats" class="col-4">
                <li>
                  <h4 class="mb-2">Stats</h4>
                </li>
                <ul>
                  <li v-for="(value, name) in character.stats" :key="name"> <b>{{ name }} :</b> {{value}}</li>
                </ul>
              </div>
            </ul>
            <h2 class="mt-5">Details</h2>
            <div class="d-flex">
               <div v-if="character.family" class="col-4">
                <h4 class="mb-2">Family</h4>
                <ul>
                  <li v-for="keyFam in keysFamily" :key="keyFam"><b>{{ capitalizeFirstLetter(keyFam) }}:</b> <router-link :to="'/characters/'+character.family[keyFam].id">{{ character.family[keyFam].name }}</router-link></li>
                </ul>
              </div>
              <div v-if="character.organization" class="col-4">
                <h4 class="mb-2">Organizations</h4>
                <ul>
                  <li v-for="organization in organizations" :key="organization.id"><router-link :to="'/organizations/'+organization.id">{{ organization.name }}</router-link></li>
                </ul>
              </div>
              <div v-if="character.domain" class="col-4">
                <h4 class="mb-2">Domains</h4>
                <ul>
                  <li v-for="domain in domains" :key="domain.id"><router-link :to="'/domains/'+domain.id">{{ domain.name }}</router-link></li>
                </ul>
              </div>
            </div>
            <div class="d-flex">
             <div v-if="character.clan" class="col-4">
                  <h4 class="mt-2">Clans</h4>
                  <ul >
                    <li v-for="clan in clans" :key="clan.id"><router-link :to="'/clans/'+clan.id">{{ clan.name }}</router-link></li>
                  </ul>
              </div>
              <div v-if="character.rank" class="col-4">
                <h4 class="mt-2">Ranks</h4>
                <ul >
                  <li v-for="rank in ranks" :key="rank.id"><a @click.prevent="openRank(rank.id)">{{ rank.name }}</a></li>
                </ul>
              </div>
              <div v-if="character.village" class="col-4">
                <h4 class="mt-2">Villages</h4>
                <ul >
                  <li v-for="village in villages" :key="village.id"><router-link :to="'/villages/'+village.id">{{ village.name }}</router-link></li>
                </ul>
              </div>
            </div>
            <div class="d-flex">
               <div v-if="character.partner" class="col-4">
                <h4 class="mb-2">Parterns</h4>
                <ul>
                  <li v-for="partner in partners" :key="partner.id"><router-link :to="'/characters/'+partner.id">{{ partner.name }}</router-link></li>
                </ul>
              </div>
              <div v-if="character.occupation" class="col-4">
                <h4 class="mb-2">Occupations</h4>
                <ul>
                  <li v-for="occupation in occupations" :key="occupation.id"><router-link :to="'/occupations/'+occupation.id">{{ occupation.name }}</router-link></li>
                </ul>
              </div>
              <div v-if="character.natureTypes" class="col-4">
                <h4 class="mb-2">NatureTypes</h4>
                <ul >
                  <li v-for="natureType in natureTypes" :key="natureType.id"><a @click.prevent="openNatureType(natureType.id)">{{ natureType.name }}</a></li>
                </ul>
              </div>
            </div>
            <div class="d-flex">
               <div v-if="character.kekkeiGenkai" class="col-4">
                <h4 class="mb-2">Kekkei Genkais</h4>
                <ul>
                  <li v-for="kekkeiGenkai in kekkeiGenkais" :key="kekkeiGenkai.id"><router-link :to="'/kekkeiGenkais/'+kekkeiGenkai.id">{{ kekkeiGenkai.name }}</router-link></li>
                </ul>
              </div>
              <div v-if="character.classification" class="col-4">
                <h4 class="mb-2">Classifications</h4>
                <ul>
                  <li v-for="classification in classifications" :key="classification.id"><a @click.prevent="openClassification(classification.id)">{{ classification.name }}</a></li>
                </ul>
              </div>
              <div v-if="character.tailedBeast" class="col-4">
                <h4 class="mb-2">Tailed Beasts</h4>
                <ul>
                  <li v-for="tailedBeast in tailedBeasts" :key="tailedBeast.id"><router-link :to="'/characters/'+tailedBeast.id">{{ tailedBeast.name }}</router-link></li>
                </ul>
              </div>
            </div>
            <div v-if="character.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper-custom pa-3">
                <v-card
                  transition="scale-transition"
                  max-width="280"
                  v-for="image in character.images" :key="image"
                >
                  <v-img
                    class="white--text align-end"
                    :src="image"
                    max-width="250"
                  >
                  </v-img>
                </v-card>
              </div>
            </div>
          </v-card-text>
          <Modal
            v-if="character.classification && dialogClassifications"
            :dialog="dialogClassifications"
            :id="idClassification"
            :type="'Classification'"
            v-on:closeClassification="closeClassification"
          />
          <Modal
            v-if="character.rank && dialogRanks"
            :dialog="dialogRanks"
            :id="idRank"
            :type="'Rank'"
            v-on:closeRank="closeRank"
          />
          <Modal
            v-if="character.natureTypes && dialogNatureTypes"
            :dialog="dialogNatureTypes"
            :id="idNatureType"
            :type="'NatureType'"
            v-on:closeNatureType="closeNatureType"
          />
        </v-card>
      </div>
      <div v-else class="mt-12">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="100"
        />
        <p class="mt-5">Loading, Please wait...</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'IndividualCharacter',
  props: ['idCharacter'],
  components: {
    Modal
  },
  data() {
    return {
      dialogClassifications: false,
      idClassification: '',
      dialogRanks: false,
      idRank: '',
      dialogNatureTypes: false,
      idNatureType: '',
      character: [],
      loading: true,
      occupations: [],
      natureTypes: [],
      organizations: [],
      kekkeiGenkais: [],
      classifications: [],
      tailedBeasts: [],
      clans: [],
      ranks: [],
      villages: [],
      partners: [],
      keysFamily: {},
      domains: [],
      personalityFlag: true,
      backgroundFlag: true
    }
  },
  async created() {
    this.loadData()
  },
  methods: {
    moreBackground() {
      this.backgroundFlag = false
    },
    hideBackground() {
      this.backgroundFlag = true
    },
    morePersonality() {
      this.personalityFlag = false
    },
    hidePersonality() {
      this.personalityFlag = true
    },
    async loadData() {
      this.occupations = []
      this.natureTypes = []
      this.organizations = []
      this.kekkeiGenkais = []
      this.classifications = []
      this.tailedBeasts = []
      this.clans = []
      this.ranks = []
      this.villages = []
      this.partners = []
      await this.axios.get(`/characters/${this.idCharacter}`).then((response) => {
        this.character = response.data
        if (this.character.family) {
          this.keysFamily = Object.keys(this.character.family)
        }
        if (this.character.clan) {
          if (this.character.clan.constructor === Array) {
            this.clans = this.character.clan
          } else {
            this.clans.push(this.character.clan)
          }
        }
        if (this.character.domain) {
          if (this.character.domain.constructor === Array) {
            this.domains = this.character.domain
          } else {
            this.domains.push(this.character.domain)
          }
        }
        if (this.character.village) {
          if (this.character.village.constructor === Array) {
            this.villages = this.character.village
          } else {
            this.villages.push(this.character.village)
          }
        }
        if (this.character.rank) {
          if (this.character.rank.constructor === Array) {
            this.ranks = this.character.rank
          } else {
            this.ranks.push(this.character.rank)
          }
        }
        if (this.character.partner) {
          if (this.character.partner.constructor === Array) {
            this.partners = this.character.partner
          } else {
            this.partners.push(this.character.partner)
          }
        }
        if (this.character.occupation) {
          if (this.character.occupation.constructor === Array) {
            this.occupations = this.character.occupation
          } else {
            this.occupations.push(this.character.occupation)
          }
        }
        if (this.character.natureTypes) {
           if (this.character.natureTypes.constructor === Array) {
            this.natureTypes = this.character.natureTypes
          } else {
            this.natureTypes.push(this.character.natureTypes)
          }
        }
        if (this.character.organization) {
          if (this.character.organization.constructor === Array) {
            this.organizations = this.character.organization
          } else {
            this.organizations.push(this.character.organization)
          }
        }
        if (this.character.kekkeiGenkai) {
          if (this.character.kekkeiGenkai.constructor === Array) {
            this.kekkeiGenkais = this.character.kekkeiGenkai
          } else {
            this.kekkeiGenkais.push(this.character.kekkeiGenkai)
          }
        }
        if (this.character.classification) {
          if (this.character.classification.constructor === Array) {
            this.classifications = this.character.classification
          } else {
            this.classifications.push(this.character.classification)
          }
        }
        if (this.character.tailedBeast) {
          if (this.character.tailedBeast.constructor === Array) {
            this.tailedBeasts = this.character.tailedBeast
          } else {
            this.tailedBeasts.push(this.character.tailedBeast)
          }
        }
        setTimeout(() => {
          this.loading = false
        }, 500);
      })
      .catch((error) => {
        alert(error)
      })
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }, 
    openClassification(id) {
      this.idClassification = id
      this.dialogClassifications = true
    },
    closeClassification() {
      this.dialogClassifications = false
    },
    openRank(id) {
      this.idRank = id
      this.dialogRanks = true
    },
    closeRank() {
      this.dialogRanks = false
    },
    openNatureType(id) {
      this.idNatureType = id
      this.dialogNatureTypes = true
    },
    closeNatureType() {
      this.dialogNatureTypes = false
    }
  },
  watch: {
    '$route': function(){
        this.loadData();
    }
  } 
}
</script>

<style lang="scss">
#character {
  text-align: center;
}
  .info-text {
    text-align: left;
    font-size: 16px;
  }
  ul li {
    margin-bottom: 5px;
    text-align: justify;
    text-justify: inter-word;
  }
  .custom-router {
    text-decoration: none;
  }
  .wrapper-custom {
    grid-template-rows: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    justify-items: center;
    align-items: center;
  }
</style>
