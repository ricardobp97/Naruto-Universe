<template>
  <div id="organization">
    <v-container>
      <div class="d-flex justify-center">
        <h1 class="mt-5">{{ organization.name }}</h1>
      </div>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="organization.image"
          >
          </v-img>
          <v-card-text class="info-text">
            <ul>
              <li v-if="organization.overview"> 
                <div v-if="organization.overview.length < 1200">
                   <b>Overview:</b> {{ organization.overview }}
                </div>
                <div v-else>
                  <div v-if="overviewFlag">
                    <b>Overview:</b> {{ organization.overview.match(/(.{1,1200})/g)[0] }} ...
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
                    <b>Overview:</b> {{ organization.overview }}
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
              <li v-if="organization.history"> 
                <div v-if="organization.history.length < 1200">
                 <b>History:</b> {{ organization.history }}
                </div>
                <div v-else>
                  <div v-if="historyFlag">
                    <b>History:</b> {{ organization.history.match(/(.{1,1200})/g)[0] }} ...
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="moreHistory">
                          More
                          <v-icon dark right>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <b>History:</b> {{ organization.history }}
                    <v-row align="center">
                      <v-col class="text-center" cols="12" sm="12">
                        <v-btn depressed small @click.prevent="hideHistory">
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
                <div v-if="organization.members" class="col-3">
                    <h4 class="mt-5 mb-2">Members</h4>
                    <ul>
                    <li v-for="member in members" :key="member.id"><router-link :to="'/characters/'+member.id">{{ member.name }}</router-link></li>
                    </ul>
                </div>
                <div v-if="organization.leader" class="col-3">
                    <h4 class="mt-5 mb-2">Leaders</h4>
                    <ul>
                    <li v-for="leader in leaders" :key="leader.id"><router-link :to="'/characters/'+leader.id">{{ leader.name }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div v-if="organization.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3">
                  <v-card
                      transition="scale-transition"
                      max-width="280"
                      v-for="image in organization.images" :key="image"
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
  name: 'IndividualOrganization',
  props: ['idOrganization'],
  data() {
    return {
      organization: [],
      loading: true,
      members: [],
      leaders: [],
      overviewFlag: true,
      historyFlag: true
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
    moreHistory() {
      this.historyFlag = false
    },
    hideHistory() {
      this.historyFlag = true
    },
    async loadData() {
      await this.axios.get(`/organizations/${this.idOrganization}`).then((response) => {
        this.organization = response.data
        if(this.organization.members){
            if (this.organization.members.constructor === Array) {
                this.members = response.data.members
            } else {
            this.members.push(response.data.members)
            }
        }
        if(this.organization.leader){
            if (this.organization.leader.constructor === Array) {
                this.leaders = response.data.leader
            } else {
            this.leaders.push(response.data.leader)
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
#organization{
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