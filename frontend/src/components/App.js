import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { OrdersList } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={OrdersList} exact />
      </Switch>
    </ThemeProvider>
  )
}

export default App
