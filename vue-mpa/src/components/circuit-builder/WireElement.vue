<template>
  <svg v-if="start && end" class="wire">
    <line
      :x1="start.x"
      :y1="start.y"
      :x2="end.x"
      :y2="end.y"
      stroke="black"
      stroke-width="3"
    />
    <circle
      class="wire-endpoint"
      :cx="start.x"
      :cy="start.y"
      r="5"
      fill="red"
      @mousedown.stop="startDragging('start', $event)"
      @mouseup="confirmConnection('start')"
    />
    <circle
      class="wire-endpoint"
      :cx="end.x"
      :cy="end.y"
      r="5"
      fill="blue"
      @mousedown.stop="startDragging('end', $event)"
      @mouseup="confirmConnection('end')"
    />
  </svg>
</template>

<script>
export default {
  props: {
    id: Number,
    start: { type: Object, default: () => ({ x: 0, y: 0 }) },
    end: { type: Object, default: () => ({ x: 0, y: 0 }) },
    startId: Number,
    endId: Number
  },
  data() {
    return {
      dragging: null,
    };
  },
  mounted() {
    console.log(`🟢 Wire ${this.id} Mounted:`, this.start, this.end);
  },
  methods: {
    startDragging(point, event) {
      console.log(`🛠 Start dragging ${point}`);
      this.dragging = point;
      window.addEventListener("mousemove", this.moveWire);
      window.addEventListener("mouseup", this.stopDragging);
    },
    moveWire(event) {
      if (!this.dragging) return;
      const workspace = document.querySelector(".workspace").getBoundingClientRect();
      const x = event.clientX - workspace.left;
      const y = event.clientY - workspace.top;
      console.log(`📡 Moving wire ${this.dragging} to (${x}, ${y})`);
      if (this.dragging === "start") {
        this.$emit("update-wire", this.id, { ...this.$props, start: { x, y } });
      } else {
        this.$emit("update-wire", this.id, { ...this.$props, end: { x, y } });
      }
    },
    stopDragging() {
      console.log(`🛑 Stop dragging ${this.dragging}`);
      this.dragging = null;
      window.removeEventListener("mousemove", this.moveWire);
      window.removeEventListener("mouseup", this.stopDragging);
    },
    confirmConnection(point) {
  console.log(`🔗 Confirm connection for ${point}`);

  // 🔍 Find both gates and LEDs
  const elements = document.querySelectorAll(".gate, .led-output");
  let closestElement = null;
  let minDistance = 50; // Connection threshold

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (!rect) return; // Ensure rect is valid before proceeding

    const workspace = document.querySelector(".workspace").getBoundingClientRect();

    // Convert global (page) coordinates to workspace-relative coordinates
    const elementX = rect.left - workspace.left + rect.width / 2;
    const elementY = rect.top - workspace.top + rect.height / 2;

    const wireX = point === "start" ? this.start.x : this.end.x;
    const wireY = point === "start" ? this.start.y : this.end.y;

    const dynamicThreshold = rect.width && rect.height ? Math.max(rect.width, rect.height) * 0.75 : 50;

    const distance = Math.sqrt(
      Math.pow(elementX - wireX, 2) + Math.pow(elementY - wireY, 2)
    );

    console.log(`📌 Checking element ${element.id || "(No ID)"} at (${elementX}, ${elementY}) - Distance: ${distance}`);

    if (distance < dynamicThreshold) {
      closestElement = element;
      minDistance = distance;
    }
  });

  if (closestElement && closestElement.id) {
    console.log(`✅ Connected to element ${closestElement.id}`);

    // 🔗 Emit event for both Gate-to-Gate and Gate-to-LED connections
    this.$emit("connect-elements", this.id, closestElement.id, point);
  } else {
    console.log(`❌ No element close enough to connect (Threshold: ${minDistance}px)`);
  }
},

  }
};
</script>

<style>
.circuit-builder .wire {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.circuit-builder .wire-endpoint {
  cursor: pointer;
  pointer-events: all;
}
</style>
