<template>
  <div>
    <the-header></the-header>
    <div>
      <label for="search"></label>
      <input type="text" name="search" class="bg-[#F4F4F4]" />
    </div>
    <h2 v-if="isLoading">Data is loading...</h2>
    <div v-if="!isLoading">
      <h2>
        {{ word.word }}
      </h2>

      <p>
        {{ phoneticsText }}
      </p>
      <audio :src="phoneticsAudio" controls></audio>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "../components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      word: {},
      isLoading: true,
      phoneticsText: "",
      phoneticsAudio: "",
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    phoneticsText() {
      const phonetics = this.word?.phonetics;
      const phoneticWithText = phonetics.find((item) => item.text);
      return phoneticWithText ? phoneticWithText.text : "";
    },
    phoneticsAudio() {
      const phonetics = this.word?.phonetics;
      const phoneticWithAudio = phonetics.find((item) => item.audio);
      return phoneticWithAudio ? phoneticWithAudio.audio : "";
    },
  },
  methods: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en/bear"
        );
        this.word = response.data[0];
        this.isLoading = false;
        console.log(this.word);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
