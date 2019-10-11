import React from 'react'
import { addDecorator, configure } from '@storybook/react'
// import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

addDecorator(storyFn => <div style={{ padding: '2em' }}>{storyFn()}</div>)

// automatically import all files ending in *.stories.js
// configure(require.context("../stories", true, /\.stories\.(js|mdx)$/), module);
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
