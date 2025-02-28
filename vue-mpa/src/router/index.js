import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Calculators from '../components/Calculators.vue';
import Contact from '../components/Contact.vue';
import MathematicalOperations from '../components/MathematicalOperations.vue';
import LogicOperations from '../components/LogicOperations.vue';
import TruthTable from '../components/TruthTable.vue';
import BasicCalculator from '../components/BasicCalculator.vue';
import CircuitBuilder from '../components/circuit-builder/CircuitBuilder.vue';
import AgeCalculator from '../components/AgeCalculator.vue';
import EmiCalculator from '../components/EmiCalculator.vue';
import BmiCalculator from '../components/BmiCalculator.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/calculators', name: 'Calculators', component: Calculators },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/logical-operations', name: 'Logical Operations', component: LogicOperations },
  { path: '/mathematical-operations', name: 'Mathematical Operations', component: MathematicalOperations },
  { path: '/truth-table', name: 'Truth Table', component: TruthTable },
   { path: '/calculator', name: 'Basic Calculator', component: BasicCalculator },
   { path: '/circuit-builder', name: 'Circuit Builder', component: CircuitBuilder },
  { path: '/age-calculator', name: 'Age Calculator', component: AgeCalculator },
  { path: '/emi-calculator', name: 'Emi Calculator', component: EmiCalculator },
  { path: '/bmi-calculator', name: 'Bmi Calculator', component: BmiCalculator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
