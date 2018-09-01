import getters from 'src/vuex/getters'

describe('getters.js', () => {
  var state, lists

  beforeEach(() => {
    lists = [{id: '1', title: 'artykuły spożywcze'}, {id: '2', title: 'ubrania'}]
    state = {
      shoppinglists: lists
    }
  })

  describe('getLists', () => {
    it('powinna zwrócić listy', () => {
      expect(getters.getLists(state)).to.eql(lists)
    })
  })

  describe('getListById', () => {
    it('powinna zwrócić obiekt listy zakupów na podstawie jego identyfikatora', () => {
      expect(getters.getListById(state, '1')).to.eql({id: '1', title: 'artykuły spożywcze'})
    })

    it('nie powinna nic zwrócić, jeśli nie ma listy o przekazanym id', () => {
      expect(getters.getListById(state, 'nieistniejąca')).to.be.empty
    })
  })
})

