import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Characters from '../views/Characters.vue'
import Clans from '../views/Clans.vue'
import Villages from '../views/Villages.vue'
import IndividualCharacter from '../views/IndividualCharacter.vue'
import IndividualClan from '../views/IndividualClan.vue'
import IndividualVillage from '../views/IndividualVillage.vue'
import IndividualDomain from '../views/IndividualDomain.vue'
import IndividualKekkeiGenkai from '../views/IndividualKekkeiGenkai.vue'
import IndividualOccupation from '../views/IndividualOccupation.vue'
import About from '../views/About.vue'
import IndividualOrganization from '../views/IndividualOrganization.vue'
import IndividualSpecie from '../views/IndividualSpecie.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters
  },
  {
    path: '/characters/:idCharacter',
    name: 'IndividualCharacter',
    component: IndividualCharacter,
    props: true
  },
  {
    path: '/clans',
    name: 'Clans',
    component: Clans
  },
  {
    path: '/clans/:idClan',
    name: 'IndividualClan',
    component: IndividualClan,
    props: true
  },
  {
    path: '/villages',
    name: 'Villages',
    component: Villages
  },
  {
    path: '/villages/:idVillage',
    name: 'IndividualVillage',
    component: IndividualVillage,
    props: true
  },
  {
    path: '/domains/:idDomain',
    name: 'IndividualDomain',
    component: IndividualDomain,
    props: true
  },
  {
    path: '/kekkeiGenkais/:idKekkeiGenkai',
    name: 'IndividualKekkeiGenkai',
    component: IndividualKekkeiGenkai,
    props: true
  },
  {
    path: '/occupations/:idOccupation',
    name: 'IndividualOccupation',
    component: IndividualOccupation,
    props: true
  },
  {
    path: '/organizations/:idOrganization',
    name: 'IndividualOrganization',
    component: IndividualOrganization,
    props: true
  },
  {
    path: '/species/:idSpecie',
    name: 'IndividualSpecie',
    component: IndividualSpecie,
    props: true
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
