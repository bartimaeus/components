import React from 'react'
import { Button, Icon } from 'antd'
import 'antd/es/button/style/index.css'
import 'antd/es/icon/style/index.css'

export default ({
  handleSubmit,
  label = 'Save',
  submittingLabel = 'Saving',
  pristine,
  submitting,
}) => (
  <div style={{ marginTop: 45, textAlign: 'right' }}>
    <Button
      disabled={pristine || submitting}
      onClick={handleSubmit}
      type="primary"
    >
      {submitting && (
        <>
          <Icon type="loading" style={{ marginRight: 6 }} />
          {submittingLabel}
        </>
      )}
      {!submitting && label}
    </Button>
  </div>
)
