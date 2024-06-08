import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import DatabaseCommunicatorView from '../src/views/DatabaseCommunicatorView.vue'

test('renders the setter form', () => {
  const wrapper = mount(DatabaseCommunicatorView)
  const setterForm = wrapper.get('#fragment')
  expect(setterForm.html()).toContain('Use this form to send key/value pairs to the database:')
})
