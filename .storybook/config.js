import * as React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'

setOptions({
  name: '@repay/react-credit-card',
  url: 'https://github.com/repaygithub/react-credit-card',
})
// addDecorator(withInfo())
addDecorator(withKnobs)
addDecorator(storyFn => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
    }}
  >
    {storyFn()}
  </div>
))

function loadStories() {
  require('./stories.tsx')
}

configure(loadStories, module)
