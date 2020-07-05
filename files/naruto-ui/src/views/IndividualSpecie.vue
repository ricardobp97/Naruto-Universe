<template>
  <div id="specie">
    <v-container>
      <div class="d-flex justify-center">
          <h1 class="mt-5">{{ specie.name }}</h1>
      </div>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="specie.image"
          >
          </v-img>
          <v-card-text class="info-text">
            <ul>
              <li v-if="specie.overview"> 
                <div v-if="specie.overview.length < 1200">
                   <b>Overview:</b> {{ specie.overview }}
                </div>
                <div v-else>
                  <div v-if="overviewFlag">
                    <b>Overview:</b> {{ specie.overview.match(/(.{1,1200})/g)[0] }} ...
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="moreOverview">
                          More
                          <v-icon dark right>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <b>Overview:</b> {{ specie.overview }}
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="hideOverview">
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
                <div v-if="specie.members" class="col-3">
                    <h4 class="mt-5 mb-2">Members</h4>
                    <ul>
                    <li v-for="member in members" :key="member.id"><router-link :to="'/characters/'+member.id">{{ member.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="specie.summoners" class="col-3">
                    <h4 class="mt-5 mb-2">Summoners</h4>
                    <ul>
                    <li v-for="summoner in summoners" :key="summoner.id"><router-link :to="'/characters/'+summoner.id">{{ summoner.name }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div v-if="specie.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3">
                <v-card
                  transition="scale-transition"
                  max-width="280"
                  v-for="image in specie.images" :key="image"
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
export default {
  name: 'IndividualSpecie',
  props: ['idSpecie'],
  data() {
    return {
      specie: [],
      loading: true,
      members: [],
      summoners: [],
      overviewFlag: true
    }
  },
  async created() {
    this.loadData()
  },
  methods: {
    moreOverview() {
      this.overviewFlag = false
    },
    hideOverview() {
      this.overviewFlag = true
    },
    async loadData() {
      await this.axios.get(`/species/${this.idSpecie}`).then((response) => {
        this.specie = response.data
        if(this.specie.members){
            if (this.specie.members.constructor === Array) {
                this.members = response.data.members
            } else {
            this.members.push(response.data.members)
            }
        }
        if (this.specie.summoners) {
          if (this.specie.summoners.constructor === Array) {
            this.summoners = this.specie.summoners
          } else {
            this.summoners.push(this.specie.summoners)
          }
        }
        setTimeout(() => {
          this.loading = false
        }, 500);
      })
      .catch((error) => {
        alert(error)
      })
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
#specie{
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