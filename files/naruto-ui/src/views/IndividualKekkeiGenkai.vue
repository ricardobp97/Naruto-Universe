<template>
  <div id="kekkeiGenkai">
    <v-container>
      <div class="d-flex justify-center">
        <h1 class="mt-5">{{ kekkeiGenkai.name }}</h1>
      </div>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="kekkeiGenkai.image"
          >
          </v-img>
          <v-card-text class="info-text">
            <ul>
              <li v-if="kekkeiGenkai.description"> 
                <div v-if="kekkeiGenkai.description.length < 1200">
                  <b>Description:</b> {{ kekkeiGenkai.description }}
                </div>
                <div v-else>
                  <div v-if="descriptionFlag">
                    <b>Description:</b> {{ kekkeiGenkai.description.match(/(.{1,1200})/g)[0] }} ...
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="moreDescription">
                          More
                          <v-icon dark right>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <b>Description:</b> {{ kekkeiGenkai.description }}
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="hideDescription">
                          Hide
                          <v-icon dark right>mdi-arrow-up</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </li>
            </ul>
            <h2 class="mt-5">Details</h2>
            <div class="d-flex">
                <div v-if="kekkeiGenkai.clan" class="col-3">
                    <h4 class="mt-5 mb-2">Clans</h4>
                    <ul>
                    <li v-for="clan in clans" :key="clan.id"><router-link :to="'/clans/'+clan.id">{{ clan.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="kekkeiGenkai.natureTypes" class="col-3">
                    <h4 class="mt-5 mb-2">Nature types</h4>
                    <ul>
                    <li v-for="naturetype in naturetypes" :key="naturetype.id"><a @click.prevent="openNatureType(naturetype.id)">{{ naturetype.name }}</a></li>
                    </ul>
                </div>
            </div>
            <div v-if="kekkeiGenkai.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3">
                <v-card
                  transition="scale-transition"
                  max-width="280"
                  v-for="image in kekkeiGenkai.images" :key="image"
                >
                  <v-img
                    class="white--text align-end"
                    :src="image"
                  >
                  </v-img>
                </v-card>
              </div>
            </div>
          </v-card-text>
          <Modal
            v-if="kekkeiGenkai.natureTypes && dialogNatureTypes"
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
  name: 'IndividualKekkeiGenkai',
  props: ['idKekkeiGenkai'],
  components: {
    Modal
  },
  data() {
    return {
      kekkeiGenkai: [],
      loading: true,
      clans: [],
      naturetypes: [],
      dialogNatureTypes: false,
      idNatureType: '',
      descriptionFlag: true
    }
  },
  async created() {
    this.loadData()
  },
  methods: {
    moreDescription() {
      this.descriptionFlag = false
    },
    hideDescription() {
      this.descriptionFlag = true
    },
    async loadData() {
      await this.axios.get(`/kekkeiGenkais/${this.idKekkeiGenkai}`).then((response) => {
        this.kekkeiGenkai = response.data
        if(this.kekkeiGenkai.clan){
            if (this.kekkeiGenkai.clan.constructor === Array) {
                this.clans = response.data.clan
            } else {
            this.clans.push(response.data.clan)
            }
        }
        if(this.kekkeiGenkai.natureTypes){
            if (this.kekkeiGenkai.natureTypes.constructor === Array) {
                this.naturetypes = response.data.natureTypes
            } else {
            this.naturetypes.push(response.data.natureTypes)
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
#kekkeiGenkai{
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
  .wrapper {
    grid-template-rows: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    justify-items: center;
    align-items: center;
  }
</style>