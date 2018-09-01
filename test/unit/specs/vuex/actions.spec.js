import actions from 'src/vuex/actions'
import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS } from 'src/vuex/mutation_types'

describe('actions.js', () => {
  var server, store, lists, successPut, successPost, successDelete

  successDelete = {'delete': true}
  successPost = {'post': true}
  successPut = {'put': true}

  beforeEach(() => {
    // imituj listy zakupów
    lists = [{
      id: '1',
      title: 'Artykuły spożywcze'
    }, {
      id: '2',
      title: 'Ubrania'
    }]

    // imituj metody magazynu commit i dispatch
    store = {
      commit: (method, data) => {},
      dispatch: () => {
        return Promise.resolve()
      },
      state: {
        shoppinglists: lists
      }
    }
    sinon.stub(store, 'commit')

    // imituj serwer
    server = sinon.fakeServer.create()
    server.respondWith('GET', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(lists))
    })
    server.respondWith('POST', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPost))
    })
    server.respondWith('PUT', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPut))
    })
    server.respondWith('DELETE', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successDelete))
    })
    server.autoRespond = true
  })

  afterEach(() => {
    // przywróć atrapy i imitację serwera do pierwotnego stanu
    store.commit.restore()
    server.restore()
  })

  describe('populateShoppingLists', () => {
    it('powinna wywołać metodę commit z ciągiem znaków POPULATE_SHOPPING_LIST', done => {
      actions.populateShoppingLists(store).then(() => {
        expect(store.commit).to.have.been.calledWith(POPULATE_SHOPPING_LISTS, lists)
        done()
      }).catch(done)
    })
  })

  describe('changeTitle', () => {
    it('powinna wywołać metodę commit z ciągiem znaków CHANGE_TITLE', (done) => {
      let title = 'nowa nazwa'

      actions.changeTitle(store, {title: title, id: '1'}).then(() => {
        expect(store.commit).to.have.been.calledWith(CHANGE_TITLE, {title: title, id: '1'})
        done()
      }).catch(done)
    })
  })

  describe('updateList', () => {
    it('powinna zwrócić odpowiedź z komunikatem o pomyślnym wykonaniu żądania PUT', (done) => {
      actions.updateList(store, '1').then((data) => {
        expect(data.data).to.eql(successPut)
        done()
      }).catch(done)
    })
  })
})

