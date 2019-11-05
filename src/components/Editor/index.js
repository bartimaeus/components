/* eslint react/require-default-props: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './style.css'

const getEditorStateFromHtml = html => {
  if (!html) {
    const editorState = EditorState.createEmpty()
    return editorState
  }
  const contentBlock = htmlToDraft(html)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    )
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
}

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
          wrapperClassName="bartimaeus-editor-wrapper"
          editorClassName="bartimaeus-editor"
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
