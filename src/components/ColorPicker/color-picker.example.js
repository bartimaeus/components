import React, { useState } from 'react'

import ColorPicker from './index'

export default () => {
  const [value, onChange] = useState('4a90e2')
  return <ColorPicker input={{ value, onChange }} />
}
