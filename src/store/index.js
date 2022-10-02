import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// localStorageに保存したリストを取得する。
// localStorageは保存するデータを「キーと値」のセットで扱う
const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    // localStorageに保存されたリストがあれば取得、無ければデフォルトのリスト配列を設置する
    // JSON形式の文字列型でデータが保存されるため、取得する時にはJSON.parse（取得するデータ）
    // でオブジェクトに変換する必要がある
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English'},
          { body: 'Mathematics'},
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
  },
  getters: {
  }
})

// subscribeはstoreのインスタンスメソッドで、全てのmutationの後に呼ばれる
store.subscribe((mutation, state) => {
  // データを文字列型にする
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// ストアインスタンスを取得する
// main.jsでインポートできる様にexport defaultを記述する
export default store
