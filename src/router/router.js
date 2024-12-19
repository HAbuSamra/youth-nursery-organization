import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue'; 
import OurOrganization from '../components/OurOrganization.vue';
import OurPrograms from '../components/OurPrograms.vue';
import BookSeats from '../components/BookSeats.vue';
import optionOne from '../components/optionOne.vue'; 
import optionThree from '../components/optionThree.vue';
import optionTow from '../components/optionTow.vue';
import OurActivitiesAndEvents from '../components/OurActivitiesAndEvents.vue';
import MediaCenter from '../components/MediaCenter.vue';
import LearningPage from '../components/LearningPage.vue';
import HelloWorld from '../components/HelloWorld.vue'; // صفحة بعد تسجيل الدخول
import MyHome from '../components/MyHome.vue'; // صفحة بعد تسجيل الدخول

const routes = [
  { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
  { path: '/OurOrganization', name: 'OurOrganization', component: OurOrganization },
  { path: '/OurPrograms', name: 'OurPrograms', component: OurPrograms },
  { path: '/BookSeats', name: 'BookSeats', component: BookSeats },
  { path: '/optionOne', name: 'OptionOne', component: optionOne },
  { path: '/optionThree', name: 'OptionThree', component: optionThree },
  { path: '/optionTow', name: 'OptionTow', component: optionTow },
  { path: '/OurActivitiesAndeEvents', name: 'OurActivitiesAndEvents', component: OurActivitiesAndEvents },
  { path: '/MediaCenter', name: 'MediaCenter', component: MediaCenter },
  { path: '/LearningPage', name: 'LearningPage', component: LearningPage },
  { path: '/Home', name: 'HomePage', component: HomePage },
  { path: '/MyHome', name: 'MyHome', component: MyHome },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
