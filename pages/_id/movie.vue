<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          :src="movie.cover"
          height="100%"
        />

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              {{ movie.title }}
            </h3>
            <v-spacer />
            <span class="grey--text text--lighten-2 caption mr-2">
              ({{ movie.rating }})
            </span>
            <v-rating
              v-model="movie.rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
            />

            <div> {{ movie.overview }} </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import IMovie from 'models/Movie'
const API_KEY = 'f20135b292080c1a6bdcdd3cf8616d48'

@Component
export default class Home extends Vue {
  movie: IMovie = {}

  async asyncData({ params }) {
    const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=fr-FR`
    const { data } = await axios.get(url)

    return {
      movie: {
        id: data.id,
        title: data.title,
        cover: 'https://image.tmdb.org/t/p/w342' + data.poster_path,
        overview: data.overview,
        rating: data.vote_average / 2
      }
    }
  }

  validate({ params }) {
    return /^\d+$/.test(params.id)
  }

  head() {
    return {
      title: this.movie.title
    }
  }
}
</script>

<style>
body {
  background-color: #303030;
  color: white;
  padding: 40px;
}
</style>
