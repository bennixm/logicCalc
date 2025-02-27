<template>
  <svg class="wires">
    <path
      v-for="(wire, index) in wires"
      :key="index"
      :d="generateBezierPath(wire)"
      stroke="black"
      stroke-width="2"
      fill="none"
    />
  </svg>
</template>

<script>
export default {
  props: ["wires"],
  methods: {
    generateBezierPath(wire) {
      const { start, end } = wire;
      const midX = (start.x + end.x) / 2;
      return `M${start.x},${start.y} C${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`;
    },
  },
};
</script>

<style>
.wires {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
