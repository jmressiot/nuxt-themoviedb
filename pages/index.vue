<template>
  <v-app dark>
    <v-form ref="form">
      <v-autocomplete
        v-model="movie"
        :items="entries"
        :search-input.sync="input"
        :loading="isLoading"
        clearable
        hide-no-data
        hide-selected
        item-text="title"
        item-value="id"
        label="Titre"
        placeholder="Ajouter un film"
        return-object
      />
    </v-form>

    <v-layout v-if="movies.length" row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Mes films</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-list>
            <v-list-tile v-for="item in movies" :key="item.id">
              <v-list-tile-avatar v-if="item.cover">
                <img :src="item.cover">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <nuxt-link :to="item.id + '/movie'">
                  <v-list-tile-title v-text="item.title" />
                </nuxt-link>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon @click="removeMovie(item.id)">
                  remove_circle
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import IMovie from 'models/Movie'

const API_KEY = 'f20135b292080c1a6bdcdd3cf8616d48'

@Component
export default class Home extends Vue {
  input: string = ''
  isLoading: boolean= false
  entries: any[] = []
  movies: IMovie[] = []
  movie: IMovie = {}

  @Watch('input')
  async onInputChanged(newInput: string) {
    if (newInput && newInput.length >= 3) {
      this.isLoading = true
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${newInput}&page=1&language=fr-FR`
      const { data } = await axios.get(url)
      this.isLoading = false
      if (data && data.results) {
        this.entries = data.results
      }
    }
  }

  @Watch('movie')
  onMovieChanged(item: any) {
    if (item && item.id) {
      this.movies.push({
        id: item.id,
        title: item.title,
        cover: 'https://image.tmdb.org/t/p/w342' + item.poster_path,
        overview: item.overview,
        rating: item.vote_average / 2
      })

      this.$nextTick(() => {
        this.movie = {}
      })
    }
  }

  @Watch('movies')
  onMoviesChanged(items: Array<any>[]) {
    localStorage.setItem('movies', JSON.stringify(items))
  }

  removeMovie(id) {
    if (this.movies) {
      this.movies = this.movies.filter(function (item) {
        return item.id !== id
      })
    }
  }

  mounted() {
    if (localStorage.getItem('movies')) {
      this.movies = JSON.parse(localStorage.getItem('movies') as string)
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
