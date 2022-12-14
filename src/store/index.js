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
    removelist(state, payload) {
      // spliceでリストの削除
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
      state.lists = payload.lists
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    },

  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
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
