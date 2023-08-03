<template>
  <div>
    <div>
      <label for="search"></label>
      <input type="text" name="search" class="bg-[#F4F4F4]" v-model="search" />
    </div>
    <h2 v-if="isLoading">Search for the word</h2>
    <div v-if="error">
      <h1>
        {{ error.title }}
      </h1>
      <h1>
        {{ error.message }}
      </h1>
      <h1>
        {{ error.resolution }}
      </h1>
    </div>
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
      <h1>EXAMPLE</h1>
      <div>
        {{ example }}
      </div>
      <h1>SYNONYMS</h1>
      <div v-for="synonym in synonyms" :key="synonym">
        {{ synonym }}
      </div>
      <h1>SOURCE</h1>
      <div>
        {{ url }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      word: {},
      isLoading: true,
      url: "",
      error: {},
    };
  },
  watch: {
    search(search) {
      if (search !== "") {
        this.clearData();
        this.getData(search);
      } else {
        this.clearData();
      }
    },
  },
  computed: {
    nouns() {
      let nouns = [];
      this.word.meanings.forEach((meaning) => {
        if (meaning.partOfSpeech === "noun") {
          meaning.definitions.forEach((definition) => {
            nouns.push(definition.definition);
          });
        }
      });
      return nouns;
    },
    verbs() {
      let verbs = [];
      this.word.meanings.forEach((meaning) => {
        if (meaning.partOfSpeech === "verb") {
          meaning.definitions.forEach((definition) => {
            verbs.push(definition.definition);
          });
        }
      });
      return verbs;
    },
    phoneticsAudio() {
      const phonetics = this.word.phonetics;
      const phoneticsAudio = phonetics.find((item) => item.audio);
      return phoneticsAudio;
    },
    phoneticsText() {
      const phonetics = this.word.phonetics;
      const phoneticsText = phonetics.find((item) => item.text);
      return phoneticsText;
    },
    synonyms() {
      let synonyms = [];
      this.word.meanings.forEach((meaning) => {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          meaning.synonyms.forEach((synonym) => {
            synonyms.push(synonym);
          });
        }
      });
      return synonyms;
    },
    example() {
      let example = "";
      this.word.meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          if (definition.example && definition.example !== "") {
            example = definition.example;
          }
        });
      });
      return example;
    },
  },
  methods: {
    async getData(searchTerm) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchTerm
        );
        this.word = response.data[0];
        this.isLoading = false;
        this.error = {};
        this.getLink(this.word.sourceUrls[0]);
      } catch (error) {
        this.error = JSON.parse(error.request.responseText);
        console.log(this.error);
      }
    },
    getLink(link) {
      this.url = link;
    },
    clearData() {
      this.word = {};
      this.isLoading = true;
      this.phonetics = null;
      this.phoneticsAudio = "";
      this.phoneticsText = "";
      this.nouns = [];
      this.verbs = [];
      this.synonyms = [];
      this.example = "";
      this.url = "";
    },
  },
};
</script>
