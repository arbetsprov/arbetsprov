// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Orders } from 'components'

storiesOf('Orders', module)
  .add('default', () => (
    <Orders />
  ))
