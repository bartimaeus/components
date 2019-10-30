import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: getEditorStateFromHtml(props.value),
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ editorState: getEditorStateFromHtml(this.props.value) })
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    })
  }

  onEditorBlur = () => {
    const { onChange } = this.props
    const { editorState } = this.state
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    onChange(content)
  }

  render() {
    const { editorState } = this.state

    return (
      <div
        className="rte"
        style={{ border: '1px solid #d9d9d9', padding: 5, borderRadius: 4 }}
      >
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onBlur={this.onEditorBlur}
          onEditorStateChange={this.onEditorStateChange}
          onFocus={this.props.onFocus}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.props.onImageUpload,
              alt: { present: true },
              previewImage: true,
              defaultSize: {
                height: 'auto',
                width: '600',
              },
            },
          }}
        />
      </div>
    )
  }
}

TextEditor.defaultProps = {
  value: '',
}

TextEditor.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onImageUpload: PropTypes.func,
}

export default TextEditor
