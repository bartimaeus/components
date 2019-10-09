import React, { useState } from 'react'

import Editor from './index'

export default () => {
  const [value, onChange] = useState(
    '<h1>Hello<span style="font-family: Tahoma;"> world!</span></h1>'
  )
  return <Editor value={value} onChange={onChange} />
}
