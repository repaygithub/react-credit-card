import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/react'
import React from 'react'

export const parameters = {
  docs: {
    inlineStories: true,
  },
  layout: 'fullscreen',
}

addDecorator(withKnobs)
addDecorator((storyFn) => (
  <div
    style={{
      fontFamily: 'Helvetica, sans serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '20px',
    }}
  >
    {storyFn()}
  </div>
))
