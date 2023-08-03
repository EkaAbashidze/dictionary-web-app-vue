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
      <h1>NOUNS</h1>
      <div v-for="noun in nouns" :key="noun">
        {{ noun }}
      </div>
      <h1>VERBS</h1>
      <div v-for="verb in verbs" :key="verb">
        {{ verb }}
      </div>
      <h1>SYNONYMS</h1>
      <div v-for="synonym in synonyms" :key="synonym">
        {{ synonym }}
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
      nouns: [],
      verbs: [],
      synonyms: [],
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
          "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard"
        );
        this.word = response.data[0];
        this.getPhonetics(this.word?.phonetics);
        this.isLoading = false;
        this.getMeanings(this.word.meanings);
        this.getSynonyms(this.word.meanings);
        console.log(this.word);
        console.log(this.word.meanings);
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
        if (meaning.partOfSpeech === "noun") {
          meaning.definitions.forEach((definition) => {
            this.nouns.push(definition.definition);
          });
        } else if (meaning.partOfSpeech === "verb") {
          meaning.definitions.forEach((definition) => {
            this.verbs.push(definition.definition);
          });
        }
      });
    },
    getSynonyms(meanings) {
      meanings.forEach((meaning) => {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          meaning.synonyms.forEach((synonym) => {
            this.synonyms.push(synonym);
          });
        }
      });
      console.log("SYNONYMS: " + this.synonyms);
    },
  },
};
</script>
