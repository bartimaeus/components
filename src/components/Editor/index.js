import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Editor from 'nib-core'
import NibConverter from 'nib-converter'

const TextEditor = ({ value, onChange }) => {
  const [content, setContent] = useState()
  const config = {
    plugins: {
      options: 'block inline link list table help',
    },
    toolbar: {
      options: 'top',
      top: {
        options: 'block inline link list table history help',
        block: { options: 'p h1 h2 h3 h4 h5 h6', grouped: true },
        inline: { options: 'strong em underline strike subsup code' },
      },
      inline: {
        options: 'block inline link list image',
        block: { options: 'p h1 h2 h3' },
        inline: { options: 'strong em underline' },
      },
    },
  }

  useEffect(() => {
    if (typeof value === 'string') {
      setContent(NibConverter.convertFromHTML(value))
    } else {
      setContent(value)
    }
  }, []) // eslint-disable-line

  const handleChange = delta => {
    setContent(delta)
    try {
      const htmlStr = NibConverter.convertToHTML(delta)
      onChange(htmlStr)
    } catch (err) {
      console.log('Error', err)
    }
    // onChange(delta)
  }

  // Don't render Editor until we have content
  if (!content) return null

  return (
    <Editor config={config} defaultValue={content} onChange={handleChange} />
  )
}

TextEditor.defaultProps = {
  value: '',
}

TextEditor.propTypes = {
  // value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextEditor
