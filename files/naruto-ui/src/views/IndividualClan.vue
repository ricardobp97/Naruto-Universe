<template>
  <div id="clan">
    <v-container>
      <h1 class="mt-5">{{ clan.name }}</h1>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="clan.image"
          >
          </v-img>

          <v-card-text class="info-text">
            <ul>
              <li v-if="clan.overview"> 
                <div v-if="clan.overview.length < 1200">
                  <b>Overview:</b> {{ clan.overview }}
                </div>
                <div v-else>
                  <div v-if="overviewFlag">
                    <b>Overview:</b> {{ clan.overview.match(/(.{1,1200})/g)[0] }} ...
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
                    <b>Overview:</b> {{ clan.overview }}
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
              <li v-if="clan.leader"> <b>Leader:</b> <router-link :to="'/characters/'+clan.leader.id">  {{ clan.leader.name }}</router-link></li>
            </ul>
            <h2 class="mt-5">Details</h2>
            <div class="d-flex">
                <div v-if="clan.kekkeiGenkai" class="col-3">
                    <h4 class="mt-5 mb-2">KekkeiGenkai</h4>
                    <ul>
                    <li v-for="kekkeiGenkai in kekkeiGenkais" :key="kekkeiGenkai.id"><router-link :to="'/kekkeiGenkais/'+kekkeiGenkai.id">{{ kekkeiGenkai.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="clan.members" class="col-3">
                    <h4 class="mt-5 mb-2">Members</h4>
                    <ul>
                    <li v-for="member in members" :key="member.id"><router-link :to="'/characters/'+member.id">{{ member.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="clan.village" class="col-3">
                    <h4 class="mt-5 mb-2">Villages</h4>
                    <ul>
                    <li v-for="village in villages" :key="village.id"><router-link :to="'/villages/'+village.id">{{ village.name }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div v-if="clan.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3">
                  <v-card
                    transition="scale-transition"
                    max-width="280"
                    v-for="image in clan.images" :key="image"
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
  name: 'IndividualClan',
  props: ['idClan'],
  data() {
    return {
      clan: [],
      loading: true,
      search_villages: '',
      search_members: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Action', value: 'action'}
      ],
      villages: [],
      members: [],
      kekkeiGenkais: [],
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
      await this.axios.get(`/clans/${this.idClan}`).then((response) => {
        this.clan = response.data
        if(this.clan.village){
            if (this.clan.village.constructor === Array) {
                this.villages = response.data.village
            } else {
            this.villages.push(response.data.village)
            }
        }
        if (this.clan.members) {
          if (this.clan.members.constructor === Array) {
            this.members = this.clan.members
          } else {
            this.members.push(this.clan.members)
          }
        }
        if(this.clan.kekkeiGenkai){
            if (this.clan.kekkeiGenkai) {
          if (this.clan.kekkeiGenkai.constructor === Array) {
            this.kekkeiGenkais = this.clan.kekkeiGenkai
          } else {
            this.kekkeiGenkais.push(this.clan.kekkeiGenkai)
          }
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
#clan{
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
