import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Calculators from '../components/Calculators.vue';
import Contact from '../components/Contact.vue';
import MathematicalOperations from '../components/MathematicalOperations.vue';
import LogicOperations from '../components/LogicOperations.vue';
import TruthTable from '../components/TruthTable.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/calculators', name: 'Calculators', component: Calculators },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/logical-operations', name: 'Logical Operations', component: LogicOperations },
  { path: '/mathematical-operations', name: 'Mathematical Operations', component: MathematicalOperations },
  { path: '/truth-table', name: 'Truth Table', component: TruthTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
