<template>
  <div id="village">
    <v-container>
      <div class="d-flex justify-center">
        <v-row>
            <div class="col-3"></div>
            <div class="col-4">
                <h1 class="mt-5">{{ village.name }}</h1>
            </div>
            <div class="col-2">
            <v-img
                class="white--text align-end"
                height="100"
                width="100"
                :src="village.symbol"
                >
                </v-img>
            </div>
        </v-row>
      </div>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="village.image"
          >
          </v-img>
          <v-card-text class="info-text">
            <ul>
              <li v-if="village.englishName"> <b>English Name:</b> {{ village.englishName }}</li>
              <li v-if="village.overview"> <b>Overview:</b> {{ village.overview }}</li>
              <li v-if="village.statPopulation"> <b>Stat Population:</b> {{ village.statPopulation }}</li>
              <li v-if="village.statMilitary"> <b>Stat Military:</b> {{ village.statMilitary }}</li>
              <li v-if="village.statEconomy"> <b>Stat Economy:</b> {{ village.statEconomy }}</li>
            </ul>
            <h2 class="mt-5">Details</h2>
            <div class="d-flex">
                <div v-if="village.clan" class="col-3">
                    <h4 class="mt-5 mb-2">Clans</h4>
                    <ul>
                    <li v-for="clan in clans" :key="clan.id"><router-link :to="'/clans/'+clan.id">{{ clan.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="village.leader" class="col-3">
                    <h4 class="mt-5 mb-2">Leaders</h4>
                    <ul>
                      <li v-for="leader in leaders" :key="leader.id">
                        <div v-if="leader.type == 'occupation' ">
                          <router-link :to="'/occupations/'+leader.id">{{ leader.name }}</router-link>
                        </div>
                        <div v-else>
                          <router-link :to="'/characters/'+leader.id">{{ leader.name }}</router-link>
                        </div>
                      </li>
                    </ul>
                </div>
                <div v-if="village.country" class="col-3">
                    <h4 class="mt-5 mb-2">Country</h4>
                    <ul>
                    <li><a @click.prevent="openCountry(village.country.id)">{{ village.country.name }}</a></li>
                    </ul>
                </div>
            </div>
            <div v-if="village.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3" v-if="village.images">
                <v-card
                  transition="scale-transition"
                  max-width="280"
                  v-for="image in village.images" :key="image"
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
            v-if="village.country && dialogCountry"
            :dialog="dialogCountry"
            :id="idCountry"
            :type="'Country'"
            v-on:closeCountry="closeCountry"
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
  name: 'IndividualVillage',
  props: ['idVillage'],
  components: {
    Modal
  },
  data() {
    return {
      dialogCountry: false,
      idCountry: '',
      village: [],
      loading: true,
      search_clans: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Action', value: 'action'}
      ],
      clans: [],
      leaders: []
    }
  },
  async created() {
    this.loadData()
  },
  methods: {
    goTo(item) {
      alert(item.id)
    },
    async loadData() {
      await this.axios.get(`/villages/${this.idVillage}`).then((response) => {
        this.village = response.data
        if(this.village.clan){
            if (this.village.clan.constructor === Array) {
                this.clans = response.data.clan
            } else {
            this.clans.push(response.data.clan)
            }
        }
        if (this.village.leader) {
          if (this.village.leader.constructor === Array) {
            this.leaders = this.village.leader
          } else {
            this.leaders.push(this.village.leader)
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
    openCountry(id) {
      this.idCountry = id
      this.dialogCountry = true
    },
    closeCountry() {
      this.dialogCountry = false
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
#village{
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