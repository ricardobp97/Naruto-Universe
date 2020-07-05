<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-app-bar
      app
      color="primary"
      dark
      v-if="$route.path !== '/'"
    >
      <div class="d-flex align-center over">
        <v-img
          alt="Naruto Logo"
          class="shrink mr-2"
          contain
          src="./assets/naruto-logo.png"
          transition="scale-transition"
          width="50"
          @click="$router.push('/')"
        />
        <h1 class="ml-2" @click="$router.push('/')">Naruto Universe</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="$router.go(-1)"
        text
      >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        <span>Go Back</span>
      </v-btn>
      <v-divider
        class="mx-1"
        inset
        vertical
      />
      <v-btn
        @click="$router.push('/about')"
        text
      >
        <span>About Us</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <div id="footer" v-if="$route.path !== '/'">
      <v-footer
        :style="{background: $vuetify.theme.themes[theme].background}"
        class="font-weight-medium"
      >
        <v-col
          class="text-center pb-1"
          cols="12"
        >
          <strong>PRC {{ new Date().getFullYear() }} - <router-link to="/about">About Us</router-link></strong>
        </v-col>
         <v-col
          class="text-center pa-0 ma-0"
          cols="12"
        >
          <p>PLC - Processamento de Linguagens e Compiladores</p>
        </v-col>
        <div class="pa-2"></div>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style lang="scss">
#footer {
  display: table-row;
}
.over {
  cursor: pointer;
}
p {
  font-size: 14px;
}
a {
  text-decoration: none;
}
</style>

