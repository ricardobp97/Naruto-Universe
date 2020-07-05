<template>
  <div id="about">
    <v-container fluid>
      <v-row align-content="center" class="mt-8">
        <v-col cols="12" md="12">
          <v-card
            class="mx-auto"
            max-width="1000"
          >
            <v-card-title>
              <h2 class="auto mt-4">About Us</h2>
            </v-card-title>
            <v-card-text class="text--primary align-center pa-4">
              <v-data-table
                :headers="headers"
                :items="data"
                hide-default-footer
              >
               <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.nome" class="no-pointer">
                    <td>{{ item.nome }}</td>
                    <td>{{ item.numero }}</td>
                    <td>
                      <a :href="item.linkein_link" target="_blank">
                        LinkedIn
                      </a>
                    </td>
                   <td>
                      <a :href="item.github_link" target="_blank">
                        GitHub
                      </a>
                    </td>
                  </tr>
                </tbody>
              </template>
              </v-data-table>
            </v-card-text>
            <v-card-subtitle>
              <h3 class="auto under">Sponsors</h3> 
            </v-card-subtitle>
            <v-row>
              <v-col col="6" class="pa-6">
                <a href="https://www.uminho.pt" target="_blank">
                  <v-img
                    alt="Uminho"
                    contain
                    style="margin: 0 auto;"
                    src="../assets/uminho.png"
                    transition="scale-transition"
                    width="150"
                  />
                </a>
              </v-col>
              <v-col col="6" class="pa-6">
                <a href="https://www.eng.uminho.pt/pt" target="_blank">
                  <v-img
                    alt="Escola de Engenharia"
                    contain
                    style="margin: 0 auto;"
                    src="../assets/engenharia.png"
                    transition="scale-transition"
                    width="150"
                  />
                </a>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Número Mecanográfico', value: 'numero' },
        { text: 'LinkedIn', value: 'linkein_link' },
        { text: 'GitHub', value: 'github_link' },
      ],
      data: [
        {
          nome: 'Duarte Freitas',
          numero: 'A63129',
          linkein_link: 'https://www.linkedin.com/in/duarte-freitas-0a548415b/',
          github_link: 'https://github.com/Dukawp'
        },
        {
          nome: 'Rafael Silva',
          numero: 'A74264',
          linkein_link: 'https://www.linkedin.com/in/rafael-silva-33a9ba158/',
          github_link: 'https://github.com/RafaelSilva29'
        },
        {
          nome: 'Ricardo Pereira',
          numero: 'A77045',
          linkein_link: 'https://www.linkedin.com/in/ricardopereira10/',
          github_link: 'https://github.com/ricardobp97/'
        },
      ]
    }
  },
}
</script>

<style lang="scss">
.center {
  margin-top: 225px;
}
tr td {
  cursor: default !important;
}
.auto {
  margin: 0 auto !important;
  text-align: center;
}
.under {
  text-decoration: underline;
}
</style>