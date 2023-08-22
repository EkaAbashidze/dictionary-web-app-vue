<template>
  <div class="flex w-full justify-between items-center" :class="fontClass">
    <img src="../assets/images/icon-book.svg" alt="" />

    <div class="flex gap-4">
      <div class="flex gap-4 relative">
        <select class="appearance-none outline-none" v-model="selected">
          <option value="font-sans">Sans Serif</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Mono</option>
        </select>
        <img src="../assets/images/icon-arrow-down.svg" alt="" />
      </div>

      <div class="w-[1px] h-[32px] bg-[#E9E9E9]"></div>

      <div class="flex items-center gap-4">
        <div
          class="w-[35px] h-[20px] bg-[#757575] rounded-full flex items-center px-[2px] justify-start"
        >
          <div class="w-[15px] h-[15px] bg-white rounded-full"></div>
        </div>
        <img src="../assets/images/icon-moon.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedFont: String,
    fontClass: String,
  },
  data() {
    return {
      selected: this.selectedFont,
    };
  },
  mounted() {
    console.log(this.selectedFont);
  },
  methods: {
    emitFontChange(newFont) {
      this.$emit("update-font", newFont);
    },
  },
  watch: {
    selected(newVal) {
      this.emitFontChange(newVal);
    },
  },
  computed: {},
};
</script>
