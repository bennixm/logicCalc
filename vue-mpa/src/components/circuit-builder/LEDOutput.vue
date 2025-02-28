<template>
  <svg
    class="led-output"
    :id="'led-' + id"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    draggable="true"
    @dragstart="startDrag"
    @dragend="moveElement"
  >
    <!-- LED Color Updates Based on Computed Status -->
    <circle cx="15" cy="15" r="10" :fill="ledStatus ? 'green' : 'gray'" stroke="black" stroke-width="2" />
    
    <circle
      class="led-endpoint"
      cx="30"
      cy="15"
      r="5"
      fill="black"
      @click="$emit('connect', id)"
    />
  </svg>
</template>

<script>
export default {
  props: ["id", "value", "position", "connectedTo"],

  computed: {
    ledStatus() {
      console.log(`🔄 LED ${this.id} Checking Status: ${this.value}`);
      return this.value === 1;
    }
  },

  watch: {
    value(newValue) {
      console.log(`💡 LED ${this.id} Received Value: ${newValue}`);
      this.$forceUpdate(); // Force UI update if needed
    }
  },

  data() {
    return {
      dragging: false,
      offsetX: 0,
      offsetY: 0
    };
  },

  methods: {
    startDrag(event) {
      console.log(`🔧 Start dragging LED ${this.id}`);
      this.dragging = true;
      this.offsetX = event.clientX - this.position.x;
      this.offsetY = event.clientY - this.position.y;
      console.log(`OffsetX: ${this.offsetX}, OffsetY: ${this.offsetY}`);
      window.addEventListener("mousemove", this.dragElement);
      window.addEventListener("mouseup", this.stopDragging);
    },
    dragElement(event) {
      if (!this.dragging) return;
      const workspace = document.querySelector(".workspace").getBoundingClientRect();
      let x = event.clientX - workspace.left - this.offsetX;
      let y = event.clientY - workspace.top - this.offsetY;
      x = Math.max(0, Math.min(workspace.width - 30, x));
      y = Math.max(0, Math.min(workspace.height - 30, y));
      console.log(`Dragging LED ${this.id} to position: (${x}, ${y})`);
      this.$emit("move", this.id, { x, y });
    },
    stopDragging() {
      console.log(`🛑 Stop dragging LED ${this.id}`);
      this.dragging = false;
      window.removeEventListener("mousemove", this.dragElement);
      window.removeEventListener("mouseup", this.stopDragging);
    }
  }
};
</script>

<style>
.led-output {
  position: absolute;
  cursor: grab;
}
.led-endpoint {
  cursor: pointer;
  pointer-events: all;
}
</style>
