<template>
  <div class="output-display">
    <h3>Final Output</h3>
    <p v-if="finalOutput !== null">Result: {{ finalOutput }}</p>
  </div>
</template>

<script>
export default {
  props: ["gates"],
  data() {
    return {
      finalOutput: null,
    };
  },
  methods: {
    calculate() {
      if (!this.gates.length) {
        this.finalOutput = "No gates!";
        return;
      }
      this.finalOutput = this.gates.reduce((acc, gate) => {
        return acc & gate.value; // Example logic
      }, 1);
    },
  },
};
</script>

<style>
.circuit-builder .output-display {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
}
</style>
