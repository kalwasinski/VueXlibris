import Vue from 'vue'
import AddItemComponent from 'src/components/AddItemComponent'
import store from 'src/vuex/store'

describe('AddItemComponent.vue', () => {
  describe('initialization', () => {
    it('powinna zainicjalizować komponent z właściwością newItem z pustym ciągiem znaków', () => {
      expect(AddItemComponent.data()).to.eql({
        newItem: ''
      })
    })
  })

  describe('addItem', () => {
    var component

    beforeEach(() => {
      var vm = new Vue({
        template: '<add-item-component :items="items" :id="id" ref="additemcomponent">' +
        '</add-item-component>',
        components: {
          AddItemComponent
        },
        data () {
          return {
            items: [],
            id: 'niceId'
          }
        },
        store
      }).$mount()

      component = vm.$refs.additemcomponent
    })

    it('powinna wywołać metodę $emit', () => {
      let newItem = 'Vue.js 2. Wprowadzenie'
      // utwórz atrapę metody $emit
      sinon.stub(component, '$emit')
      // utwórz atrapę metody magazynu dispatch dispatch mthod
      sinon.stub(store, 'dispatch')
      // ustaw nowy produkt
      component.newItem = newItem
      component.addItem()
      // właściwość newItem powinna zostać zresetowana
      expect(component.newItem).to.eql('')
      // metoda $emit powinna zostać wywołana z niestandardowym zdarzeniem add i wartością newItem
      expect(component.$emit).to.have.been.calledWith('add', newItem)
      // metoda dispatch powinna zostać wywołana z wartością updateList i identyfikatorem listy
      expect(store.dispatch).to.have.been.calledWith('updateList', 'niceId')
      store.dispatch.restore()
      component.$emit.restore()
    })
  })
})
