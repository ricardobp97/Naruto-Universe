<template>
  <div id="clans">
    <v-container>
      <h1 class="mt-5">Clans</h1>
      <v-row class="justify-center" v-if="!loading">
        <v-col cols="12" sm="3" md="3">
          <v-text-field
            label="Search"
            append-icon="mdi-magnify"
            v-model="search"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="wrapper mt-2" v-if="!loading">
        <v-card
        transition="scale-transition"
        max-width="280"
        min-width="280"
        class="card-custom"
        v-for="clan in clans" :key="clan.image"
        @click.prevent="goTo(clan)"
      >
        <v-img
          class="black--text align-end"
          height="200px"
          :src="clan.image"
        >
        </v-img>
        <v-card-text>
          <v-card-title>{{ clan.name }}</v-card-title>
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
  name: 'Clans',
  data() {
    return {
      data: [],
      loading: true,
      search: '',
    }
  },
  async created() {
    await this.axios.get('/clans').then((response) => {
      this.data = response.data
      setTimeout(() => {
        this.loading = false
      }, 500);
    })
    .catch((error) => {
      alert(error)
    })
  },
  methods: {
    goTo(item) {
      this.$router.push({
          name: 'IndividualClan', 
          params: { idClan: item.id }
      });
    }
  },
  computed: {
    clans() {
      let resp = []
      if (this.search != '') {
        this.data.forEach(element => {
          const search = this.search.toLowerCase()
          const name = element.name.toLowerCase()
          if (name.includes(search)) {
            resp.push(element)
          }
        });
      } else {
        resp = this.data
      }
      return resp
    }
  },
}
</script>

<style lang="scss">
#clans {
  text-align: center;
}
  .wrapper {
    grid-template-rows: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    justify-items: center;
    align-items: center;
  }
  .card-custom {
    cursor: pointer;
  }
  .card-custom:hover {
    transform: scale(1.05);
  }

</style>
