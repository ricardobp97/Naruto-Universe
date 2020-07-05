<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    scrollable
    light
    persistent
  >
    <v-card>
      <v-card-title class="headline">{{ type }}</v-card-title>

      <v-card-text v-if="type == 'Classification' || type == 'Rank' || type == 'NatureType'">
        <h4>{{ data.name }}</h4>
        <p class="mt-2 center-text">{{  data.description }}</p>
      </v-card-text>

      <v-card-text v-else-if="type == 'Country'">
        <h4>{{ data.name }}</h4>
        <p class="mt-2 center-text">{{  data.overview }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          text
          @click.prevent="closeModal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    dialog: Boolean,
    id: String,
    type: String
  },
  data() {
    return {
      data: {}
    }
  },
  async created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      if (this.type === 'Classification') {
        await this.axios.get(`/classifications/${this.id}`).then((response) => { 
          this.data = response.data
        })
        .catch((error) => {
          alert(error)
        })
      } else if (this.type === 'Rank') {
        await this.axios.get(`/ranks/${this.id}`).then((response) => { 
          this.data = response.data
        })
        .catch((error) => {
          alert(error)
        })
      } else if (this.type === 'NatureType') {
        await this.axios.get(`/natureTypes/${this.id}`).then((response) => { 
          this.data = response.data
        })
        .catch((error) => {
          alert(error)
        })
      }  else if (this.type === 'Country') {
        await this.axios.get(`/countries/${this.id}`).then((response) => { 
          this.data = response.data
        })
        .catch((error) => {
          alert(error)
        })
      }
    },
    closeModal() {
        if (this.type === 'Classification') {
            this.$emit('closeClassification', 'ok')
        } else if (this.type === 'Country') {
            this.$emit('closeCountry', 'ok')
        } else if (this.type === 'Rank') {
            this.$emit('closeRank', 'ok')
        } else if (this.type === 'NatureType') {
            this.$emit('closeNatureType', 'ok')
        }
    }
  },
}
</script>

<style lang="scss">
.center-text {
  text-align: justify;
  text-justify: inter-word;
}
</style>