import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  describe('when loaded', () => {
    it('has the required elements', () => {
      const wrapper = shallowMount(Login)

      // CHECK ALL INPUT
      expect(wrapper.find('input[type=email]').exists()).toBe(true)
      expect(wrapper.find('input[type=password]').exists()).toBe(true)
      expect(wrapper.find('button[type=submit]').exists()).toBe(true)
      expect(wrapper.find('button[type=submit]').text()).toBe('Login')
    })
  })


  describe('when form has been submitted', () => {
    it('moved to /notes page', async () => {
      const localVue = createLocalVue()
      localVue.use(VueRouter)
      const router = new VueRouter()

      const wrapper = shallowMount(Login, {
        localVue,
        router
      })

      const email = 'admin@gmail.com'
      const psw = '12345'

      await wrapper.find('input[type=email]').setValue(email)
      await wrapper.find('input[type=password]').setValue(psw)

      await wrapper.find('form').trigger('submit.prevent')

      // check if localstorage has been set
      expect(localStorage.getItem('isLoggedin')).toBe("true")
      expect(router.history.current.fullPath).toBe("/notes");
    })
  })
})
