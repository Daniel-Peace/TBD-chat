import { expect, it, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import DatabaseCommunicatorView from '../src/views/DatabaseCommunicatorView.vue'

describe('The top-level database communicator component', () => {
  it('renders the setter form', () => {
    const wrapper = mount(DatabaseCommunicatorView)
    const setterForm = wrapper.get('#setter')
    expect(setterForm.html()).toContain('Use this form to send key/value pairs to the database:')
  })

  it('does not initially render the getter form', () => {
    const wrapper = mount(DatabaseCommunicatorView)
    expect(wrapper.find('#getter').exists()).toBe(false)
  })

  it('renders the radio input', () => {
    const wrapper = mount(DatabaseCommunicatorView)
    expect(wrapper.find('#getterOption').exists()).toBe(true)
    expect(wrapper.get('#getterOption').text()).toBe('View Bio')
  })

  it('renders the getter form after the button click', async () => {
    const wrapper = mount(DatabaseCommunicatorView)

    const getterRadioInput = wrapper.find('input[type="radio"]#getterRadio')

    await getterRadioInput.setValue(true) // checks/selects the input

    expect(wrapper.find('#getter').exists()).toBe(true)
  })
})
