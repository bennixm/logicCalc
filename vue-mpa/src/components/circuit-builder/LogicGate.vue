<template>
  <svg
    class="logic-gate"
    :id="'gate-' + id"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    draggable="true"
    @dragend="moveElement"
  >

    <rect x="10" y="10" width="80" height="50" stroke="black" stroke-width="2" fill="white" />
    <text x="50" y="30" text-anchor="middle" font-size="14" fill="black">{{ type }}</text>

    <!-- Input Fields -->
    <foreignObject x="10" y="5" width="30" height="20">
      <input v-model.number="input1" type="number" min="0" max="1" class="gate-input" @input="computeOutput" />
    </foreignObject>
    <foreignObject v-if="hasSecondInput" x="10" y="30" width="30" height="20">
      <input v-model.number="input2" type="number" min="0" max="1" class="gate-input" @input="computeOutput" />
    </foreignObject>

    <!-- Input Pins -->
    <circle
      class="gate-endpoint"
      cx="5"
      :cy="hasSecondInput ? 20 : 25"
      r="5"
      fill="black"
      @click="$emit('connect', id, 'input1')"
    />
    <circle
      v-if="hasSecondInput"
      class="gate-endpoint"
      cx="5"
      cy="35"
      r="5"
      fill="black"
      @click="$emit('connect', id, 'input2')"
    />
    <!-- Output Pin -->
    <circle
      class="gate-endpoint"
      cx="90"
      cy="25"
      r="5"
      fill="black"
      @click="$emit('connect', id, 'output')"
    />
  </svg>
</template>

<script>
export default {
  props: ["id", "type", "position"],
  data() {
    return {
      input1: 0,
      input2: 0,
      output: 0,
    };
  },
  computed: {
    hasSecondInput() {
      return this.type !== "NOT";
    },
  },
  methods: {
    computeOutput() {
      switch (this.type) {
        case "AND": this.output = this.input1 & this.input2; break;
        case "OR": this.output = this.input1 | this.input2; break;
        case "XOR": this.output = this.input1 ^ this.input2; break;
        case "NAND": this.output = !(this.input1 & this.input2) ? 1 : 0; break;
        case "NOR": this.output = !(this.input1 | this.input2) ? 1 : 0; break;
        case "XNOR": this.output = !(this.input1 ^ this.input2) ? 1 : 0; break;
        case "NOT": this.output = this.input1 === 0 ? 1 : 0; break;
        default: this.output = 0;
      }
      this.$emit("update-output", this.id, this.output);
    },
    moveElement(event) {
      this.$emit("move", this.id, { x: event.clientX, y: event.clientY });
    },
  }
};
</script>

<style>
.logic-gate {
  position: absolute;
  pointer-events: all;
}
.gate-endpoint {
  cursor: pointer;
  pointer-events: all;
}
.gate-input {
  width: 28px;
  height: 20px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #000;
  background: #fff;
  border-radius: 3px;
  padding: 2px;
  box-sizing: border-box;
}
</style>
