<template>
  <div class="p-8 w-screen">
    <the-header></the-header>
    <div class="mt-8 flex justify-center relative">
      <label for="search"></label>
      <input
        type="text"
        name="search"
        class="bg-[#F4F4F4] w-[327px] h-[48px] rounded-xl outline-none px-6 pr-14 font-lora font-bold text-base"
        placeholder="Search"
        v-model="search"
      />
      <img
        class="absolute top-4 right-10"
        src="../assets/images/icon-search.svg"
        alt="search"
      />
    </div>

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

      <h1 class="font-lora-italic font-bold">noun</h1>
      <div v-for="noun in nouns" :key="noun">
        {{ noun }}
      </div>

      <h1 class="font-lora-italic font-bold">verb</h1>
      <div v-for="verb in verbs" :key="verb">
        {{ verb }}
      </div>

      <h1 class="font-lora-italic font-bold">example</h1>
      <div>
        {{ example }}
      </div>

      <h1 class="font-lora-italic font-bold">Synonyms</h1>
      <div v-for="synonym in synonyms" :key="synonym">
        {{ synonym }}
      </div>

      <h1 class="font-lora-italic font-bold">Source</h1>
      <div>
        {{ url }}
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
      search: "",
      word: {},
      isLoading: true,
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
  methods: {
    async getData(searchTerm) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
        );
        this.word = response.data[0];
        this.isLoading = false;
        this.error = {};
      } catch (error) {
        this.error = JSON.parse(error.request.responseText);
      }
    },
    clearData() {
      this.word = {};
      this.isLoading = true;
      this.error = {};
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
    url() {
      let url = this.word.sourceUrls[0];
      return url;
    },
  },
};
</script>
