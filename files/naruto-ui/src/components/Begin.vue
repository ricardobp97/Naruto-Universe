<template>
  <div id="begin">
    <v-row>
      <v-col
        class="pa-0 custom-card"
        cols="4"
        md="4"
        @click="$router.push('/clans')"
      >
        <v-card
          max-width="auto"
          class="card-no"
        >
          <v-img
            class="white--text align-end"
            :height="windowHeight"
            position="center"
            src="https://i.pinimg.com/originals/88/70/7f/88707f615c8566aaab945b765192bc62.jpg"
          >
            <v-card-title class="ml-2">Clans</v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-col
        class="pa-0 custom-card"
        cols="4"
        md="4"
        @click="$router.push('/characters')"
      >
        <v-card
          max-width="auto"
          class="card-no"
        >
          <v-img
            class="white--text align-end"
            :height="windowHeight"
            position="center"
            src="https://fsa.zobj.net/crop.php?r=39LOylCf4qcSn6nrveabneY_sJ3XXLv7Vi97FaLbuipzFC1C2TL6_JY-iWV3rRKAd5xprFFNgSomfN1Gps4vo4XzjVXNGP4TaNrDN3DDKlHUK48uwJKZRgU2aqu58MUGcRk6fphKfZDOfT0Z"
          >
            <v-card-title class="ml-2">Characters</v-card-title>
          </v-img>
        </v-card>
      </v-col>
      <v-col
        class="pa-0 custom-card"
        cols="4"
        md="4"
        @click="$router.push('/villages')"
      >
        <v-card
          max-width="auto"
          class="card-no"
        >
          <v-img
            class="white--text align-end"
            :height="windowHeight"
            position="center"
            src="https://i.pinimg.com/564x/7d/16/f8/7d16f8e9c6f8f15b92e551eccbf28080.jpg"
          >
            <v-card-title class="ml-2">Villages</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: 'Begin',
  data() {
    return {
      windowHeight: 0,
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight
    window.addEventListener('resize', () => { 
     this.windowHeight = window.innerHeight
    });
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
    }
  },
}
</script>

<style lang="scss">
.custom-card{
  cursor: pointer;
  border-radius : 0 !important;
  border: 0;
  opacity: 0.5;
}
.custom-card:hover{
  opacity: 1;
}
.card-no {
  border-radius: 0 !important;
}
</style>