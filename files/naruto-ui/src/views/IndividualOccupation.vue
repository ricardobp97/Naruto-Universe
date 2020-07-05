<template>
  <div id="occupation">
    <v-container>
      <div class="d-flex justify-center">
        <h1 class="mt-5">{{ occupation.name }}</h1>
      </div>
      <div class="mt-10" v-if="!loading">
        <v-card
          class="mx-auto"
          max-width="auto"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            :src="occupation.image"
          >
          </v-img>
          <v-card-text class="info-text">
            <ul>
              <li v-if="occupation.description"> 
                <div v-if="occupation.description.length < 1200">
                  <b>Description:</b> {{ occupation.description }}
                </div>
                <div v-else>
                  <div v-if="descriptionFlag">
                    <b>Description:</b> {{ occupation.description.match(/(.{1,1200})/g)[0] }} ...
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
                    <b>Description:</b> {{ occupation.description }}
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
                <div v-if="occupation.members" class="col-3">
                    <h4 class="mt-5 mb-2">Members</h4>
                    <ul>
                    <li v-for="member in members" :key="member.id"><router-link :to="'/characters/'+member.id">{{ member.name }}</router-link></li>
                    </ul>
                </div>
            </div>
            <div v-if="occupation.images">
              <h2 class="mt-5 mb-2">Images</h2>
              <div class="wrapper pa-3">
                  <v-card
                      transition="scale-transition"
                      max-width="280"
                      v-for="image in occupation.images" :key="image"
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
  name: 'IndividualOccupation',
  props: ['idOccupation'],
  data() {
    return {
      occupation: [],
      loading: true,
      members: [],
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
      await this.axios.get(`/occupations/${this.idOccupation}`).then((response) => {
        this.occupation = response.data
        if(this.occupation.members){
            if (this.occupation.members.constructor === Array) {
                this.members = response.data.members
            } else {
            this.members.push(response.data.members)
            }
        }
        if(this.occupation.natureTypes){
            if (this.occupation.natureTypes.constructor === Array) {
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
#occupation{
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