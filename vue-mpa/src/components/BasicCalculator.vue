<template>
    <div class="section page calculators">
 <div class="overlay shadow-overlay">
     <div class="container">
     <div class="title-container multiple-titles">
       <span class="title xl-title">Math Calculator</span>
       <span class="mini-title">Create simple calculations</span>
     </div>
     </div>
   </div>
 </div>
 <div class="section basic-calculator">
   <div class="container">
   <div class="calculator">
     <input type="text" class="result" :value="result" readonly />
     <div class="buttons">
       <button class="number" @click="handleClick('7')">7</button>
       <button class="number" @click="handleClick('8')">8</button>
       <button class="number" @click="handleClick('9')">9</button>
       <button class="operator" @click="handleOperatorClick('/')">/</button>

       <button class="number" @click="handleClick('4')">4</button>
       <button class="number" @click="handleClick('5')">5</button>
       <button class="number" @click="handleClick('6')">6</button>
       <button class="operator" @click="handleOperatorClick('*')">*</button>

       <button class="number" @click="handleClick('1')">1</button>
       <button class="number" @click="handleClick('2')">2</button>
       <button class="number" @click="handleClick('3')">3</button>
       <button class="operator" @click="handleOperatorClick('-')">-</button>

       <button class="number" @click="handleClick('0')">0</button>
       <button class="number" @click="handleClick('.')">.</button>
       <button class="number" @click="handleClick('00')">00</button>
       <button class="operator" @click="handleOperatorClick('+')">+</button>

       <button class="operator" @click="handleOperatorClick('**')">xⁿ</button>
       <button class="operator" @click="handleSquareRoot">√x</button>
       <button class="operator" @click="handleClick('(')">(</button>
       <button class="operator" @click="handleClick(')')">)</button>

       <button class="clear" @click="handleClear">C</button>
       <button class="clear" @click="handleClearEntry">CE</button>
       <button class="equal" @click="calculate">=</button>
     </div>
   </div>
</div>
</div>
</template>

<script>
export default {
 name: 'BasicCalculator',
 data() {
   return {
     result: '',
     calculated: false
   };
 },
 methods: {
   handleClick(value) {
     if (this.calculated) {
       this.result = value;
       this.calculated = false;
     } else {
       this.result += value;
     }
   },
   handleClear() {
     this.result = '';
     this.calculated = false;
   },
   handleClearEntry() {
     if (this.result.length > 0) {
       this.result = this.result.slice(0, -1);
     }
   },
   handleOperatorClick(operator) {
     if (/[+*/%-]$/.test(this.result)) {
       this.result = this.result.slice(0, -1) + operator;
     } else {
       this.result += operator;
     }
     this.calculated = false;
   },
   handleSquareRoot() {
     try {
       this.result = Math.sqrt(eval(this.result)).toString();
       this.calculated = true;
     } catch {
       this.result = 'Error';
     }
   },
   calculate() {
     try {
       let evaluatedResult = eval(this.result.replace(/(^|[^0-9])0+(\d+)/g, '$1$2'));
       if (!isFinite(evaluatedResult)) {
         throw new Error('Math Error');
       }
       this.result = evaluatedResult.toString();
       this.calculated = true;
     } catch {
       this.result = 'Error';
     }
   }
 }
};
</script>
