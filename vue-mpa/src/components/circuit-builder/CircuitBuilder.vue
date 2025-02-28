<template>
  <div class="section page calculators">
    <div class="overlay shadow-overlay">
      <div class="container">
        <div class="title-container multiple-titles">
          <span class="title xl-title">Circuit Builder</span>
          <span class="mini-title">Drag Logic Gates</span>
        </div>
      </div>
    </div>
  </div>
  <div class="section logical-calculator-section">
    <div class="container">
      <div class="circuit-builder">
        <Sidebar />
        <div class="workspace-container">
          <div class="workspace" ref="workspace" @dragover.prevent @drop="dropElement">
            <LogicGate
              v-for="(gate, index) in gates"
              :key="index"
              :id="index"
              :type="gate.type"
              :position="gate.position"
              ref="gate"
              @move="updateGatePosition"
              @update-output="updateGateOutput"
            />

            <LEDOutput
              v-for="(led, index) in leds"
              :key="index"
              :id="index"
              :value="led.value"
              :position="led.position"
              :connectedTo="led.connectedTo"
              @move="updateLEDPosition"
              @connect="connectElements"
            />

            <SpeakerOutput
              v-for="(speaker, index) in speakers"
              :key="index"
              :id="index"
              :value="speaker.value"
              :position="speaker.position"
              @move="updateSpeakerPosition"
            />

            <WireElement
              v-for="(wire, index) in wires"
              :key="index"
              :id="index"
              :start="wire.start"
              :end="wire.end"
              :startId="wire.startId"
              :endId="wire.endId"
              @update-wire="updateWire"
              @connect-elements="connectElements"
            />
          </div>
          <button class="compute-btn" @click="computeOutput">Compute Output</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import LogicGate from "./LogicGate.vue";
import LEDOutput from "./LEDOutput.vue";
import SpeakerOutput from "./SpeakerOutput.vue";
import WireElement from "./WireElement.vue";

export default {
  components: { Sidebar, LogicGate, LEDOutput, SpeakerOutput, WireElement },
  data() {
    return {
      gates: [],
      leds: [],
      speakers: [],
      wires: [],
    };
  },
  methods: {
    dropElement(event) {
      const workspace = this.$refs.workspace.getBoundingClientRect();
      const x = event.clientX - workspace.left;
      const y = event.clientY - workspace.top;
      const type = event.dataTransfer.getData("type");
      const elementType = event.dataTransfer.getData("elementType");

      if (x >= 0 && y >= 0 && x <= workspace.width && y <= workspace.height) {
        if (elementType === "gate") {
          this.gates.push({ id: this.gates.length, type, position: { x, y }, input1: null, input2: null, output: 0 });
        } else if (elementType === "led") {
          this.leds.push({ id: this.leds.length, position: { x, y }, value: 0, connectedTo: null });
        } else if (elementType === "speaker") {
          this.speakers.push({ id: this.speakers.length, position: { x, y }, value: 0, connectedTo: null });
        } else if (elementType === "wire") {
          this.wires.push({ id: this.wires.length, start: { x, y }, end: { x: x + 50, y }, startId: null, endId: null });
        }
      }
    },

    computeOutput() {
  console.log("🔵 Starting Computation...");

  // Step 1: Compute outputs for all gates
  this.gates.forEach(gate => {
    this.$refs.gate[gate.id]?.computeOutput();
    console.log(`✅ Gate ${gate.id} computed output: ${gate.output}`);
  });

  // Step 2: Ensure Wires Transfer Values
  this.wires.forEach(wire => {
    const sourceGate = this.gates.find(gate => gate.id === wire.startId);
    const targetGate = this.gates.find(gate => gate.id === wire.endId);
    const targetLED = this.leds.find(led => led.id === wire.endId);

    if (sourceGate) {
      console.log(`📡 Wire ${wire.id} transmitting ${sourceGate.output} from Gate ${sourceGate.id}`);

      // If connected to another gate, send value to input
      if (targetGate) {
        if (targetGate.input1 === undefined || targetGate.input1 === null) {
          targetGate.input1 = sourceGate.output;
        } else {
          targetGate.input2 = sourceGate.output;
        }
        console.log(`🎛 Gate ${targetGate.id} received inputs: ${targetGate.input1}, ${targetGate.input2}`);
      }

      // If connected to LED, update its value
      if (targetLED) {
        targetLED.value = sourceGate.output;
        console.log(`💡 LED ${targetLED.id} turned ${targetLED.value === 1 ? "ON 🔴" : "OFF ⚫"}`);
      }
    }
  });

  // Step 3: Force UI Update
  this.$forceUpdate();
}
,


    /**
     * 🔗 Connect Elements (Gates, LEDs, Speakers) through Wires
     */
    connectElements(sourceId, targetId) {
      const sourceGate = this.gates.find(g => g.id === sourceId);
      const targetGate = this.gates.find(g => g.id === targetId);
      const targetLED = this.leds.find(led => led.id === targetId);
      const targetSpeaker = this.speakers.find(speaker => speaker.id === targetId);
      const wire = this.wires.find(w => w.startId === sourceId && w.endId === targetId);

      if (sourceGate) {
        console.log(`✅ Connecting Gate ${sourceId} to Component ${targetId}`);

        // Ensure the wire is correctly assigned
        if (wire) {
          console.log(`🔗 Wire Found: ${wire.startId} → ${wire.endId}`);
        } else {
          console.warn(`⚠️ No Wire Exists Between ${sourceId} → ${targetId}`);
        }

        // Update gates
        if (targetGate) {
          if (targetGate.input1 === null) {
            targetGate.input1 = sourceGate.output;
          } else if (targetGate.input2 === null) {
            targetGate.input2 = sourceGate.output;
          }
        }

        // Update LEDs
        if (targetLED) {
          targetLED.connectedTo = sourceGate.id;
          targetLED.value = sourceGate.output;
          console.log(`💡 LED ${targetLED.id} now connected to Gate ${sourceGate.id}`);
        }

        // Update Speaker
        if (targetSpeaker) {
          targetSpeaker.connectedTo = sourceGate.id;
          targetSpeaker.value = sourceGate.output;
          console.log(`🔊 Speaker ${targetSpeaker.id} now connected to Gate ${sourceGate.id}`);
        }
      }
    },

    updateGateOutput(id, output) {
      const gate = this.gates.find(gate => gate.id === id);
      if (gate) {
        gate.output = output;
        console.log(`Gate ${id} output updated to: ${output}`);
      }
    },

    updateWire(id, newWire) {
      this.wires[id] = newWire;
    },

    updateLEDPosition(id, position) {
      const led = this.leds.find(led => led.id === id);
      if (led) {
        led.position = position;
      }
    },

    updateGatePosition(id, position) {
      const gate = this.gates.find(gate => gate.id === id);
      if (gate) {
        gate.position = position;
      }
    },

    updateSpeakerPosition(id, position) {
      const speaker = this.speakers.find(speaker => speaker.id === id);
      if (speaker) {
        speaker.position = position;
      }
    }
  }

};
</script>

<style>
.circuit-builder {
  display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.circuit-builder .workspace-container {
  width: 70%;
  margin-left: 20px;
}
.circuit-builder .workspace {
  position: relative;
  width: 100%;
  height: 500px;
  box-shadow: 0 0 20px #d9dfee;
  overflow: hidden;
  margin-bottom: 20px;
}
.circuit-builder .compute-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  display: block;
  margin: 10px auto 0;
  text-align: center;
}
.circuit-builder .compute-btn:hover {
  background: #0056b3;
}
</style>
