import { shallowMount } from '@vue/test-utils'
import Notes from '@/views/Notes.vue'

describe('Notes.vue', () => {
  describe('when loaded', () => {
    it('has the required elements', () => {
      const wrapper = shallowMount(Notes)

      // CHECK ALL INPUT
      expect(wrapper.find('button').text()).toBe('Logout')
      expect(wrapper.find('input[type=text]').exists()).toBe(true)
    })
  })


  describe('while adding new item to the list', () => {
    it('item added to the list', async () => {
      const wrapper = shallowMount(Notes)

      const item = 'new test item'
      await wrapper.find('input[type=text]').setValue(item)
      await wrapper.find('input[type=text]').trigger('keypress.enter')
      expect(wrapper.vm.notes.length).toBeGreaterThan(0)
    })
  })


  describe('while removing item from the list', () => {
    it('item deleted from the list', async () => {
      const wrapper = shallowMount(Notes)

      const item = 'new test item'
      await wrapper.find('input[type=text]').setValue(item)
      await wrapper.find('input[type=text]').trigger('keypress.enter')
      expect(wrapper.vm.notes.length).toBe(1)

      await wrapper.find('li .delete').trigger('click')
      expect(wrapper.vm.notes.length).toBe(0)
    })
  })
})
