// https://github.com/diegohaz/arc/wiki/Testing-components
import React from 'react'
import { shallow } from 'enzyme'
import Orders from '.'

it('renders', () => {
  shallow(<Orders />)
})
