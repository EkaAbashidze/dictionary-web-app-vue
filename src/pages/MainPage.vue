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

      <h2>{{ phoneticsText.text }}</h2>
      <audio :src="phoneticsAudio.audio" controls></audio>
      <div v-for="definition in definitions" :key="definition">
        {{ definition }}
      </div>
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
      phonetics: null,
      phoneticsAudio: "",
      phoneticsText: "",
      definitions: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en/bear"
        );
        this.word = response.data[0];
        this.getPhonetics(this.word?.phonetics);
        this.isLoading = false;
        this.getMeanings(this.word.meanings);
      } catch (error) {
        console.log(error);
      }
    },
    getPhonetics(phon) {
      this.phonetics = phon;
      this.phoneticsText = this.phonetics.find((item) => item.text);
      this.phoneticsAudio = this.phonetics.find((item) => item.audio);
    },
    getMeanings(meanings) {
      meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          this.definitions.push(definition.definition);
        });
      });
    },
  },
};
</script>
