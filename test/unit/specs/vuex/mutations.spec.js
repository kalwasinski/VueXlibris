// mutations.spec.js
import mutations from 'src/vuex/mutations'
import { ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST, POPULATE_SHOPPING_LISTS, CHANGE_TITLE } from 'src/vuex/mutation_types'

describe('mutations.js', () => {
  var state

  beforeEach(() => {
    state = {
      shoppinglists: []
    }
  })

  describe('ADD_SHOPPING_LIST', () => {
    it('powinna dodać element tablicy list zakupów i zwiększyć jej rozmiar', () => {
      mutations[ADD_SHOPPING_LIST](state, {id: '1'})
      expect(state.shoppinglists).to.eql([{id: '1'}])
      expect(state.shoppinglists).to.have.length(1)
    })

    it('nie powinna dodać elementu, jeżeli element jest pusty', () => {
      mutations[ADD_SHOPPING_LIST](state)
      expect(state.shoppinglists).to.have.length(0)
    })
  })

  describe('DELETE_SHOPPING_LIST', () => {
    it('powinna usunąć element z tablicy list zakupów', () => {
      state.shoppinglists = [{id: '1'}, {id: '2'}, {id: 3}]
      mutations[DELETE_SHOPPING_LIST](state, '1')
      expect(state.shoppinglists).to.eql([{id: '2'}, {id: 3}])
    })
  })

  describe('POPULATE_SHOPPING_LISTS', () => {
    it('powinna przypisać właściwości shoppinglists daną wartość', () => {
      mutations[POPULATE_SHOPPING_LISTS](state, [{id: '1'}])
      expect(state.shoppinglists).to.eql([{id: '1'}])
    })
  })

  describe('CHANGE_TITLE', () => {
    it('powinna zmienić nazwę danej listy', () => {
      let title = 'Vue.js 2. Wprowadzenie'
      state.shoppinglists = [{id: '1', title: 'artykuły spożywcze'}, {id: '2', title: 'ubrania'}]
      mutations[CHANGE_TITLE](state, {title: title, id: '1'})
      expect(state.shoppinglists).to.eql([{id: '1', title: title}, {id: '2', title: 'ubrania'}])
    })
  })
})
