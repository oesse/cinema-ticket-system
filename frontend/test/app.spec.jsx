import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import App from '../src/app'

describe('component App', () => {
  let component
  beforeEach('mount component', () => {
    component = mount(<App />)
  })

  it('renders', () => {
    expect(component).to.be.present()
  })

  it('displays a headline', () => {
    expect(component.find('h1')).to.be.present()
  })
})
