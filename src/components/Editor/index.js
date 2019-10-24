import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import isFunction from 'lodash/isFunction'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const toolbar = {
  options: ['inline', 'blockType', 'list', 'link', 'image'],
  inline: {
    inDropdown: true,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
    bold: { className: 'bordered-option-classname' },
    italic: { className: 'bordered-option-classname' },
    underline: { className: 'bordered-option-classname' },
  },
  blockType: {
    className: 'bordered-option-classname',
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
  },
  list: { inDropdown: true },
  link: { inDropdown: true },
}

class TextEditor extends React.Component {
  static propTypes = {
    attribute: PropTypes.string,
    content: PropTypes.string,
    noteEdit: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    attribute: 'note',
    content: '',
    noteEdit: undefined,
    onBlur: undefined,
  }

  constructor(props) {
    super(props)
    const content = props.content || ''
    const contentBlock = htmlToDraft(content)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { editorState } = this.state
    if (newProps.content === '') {
      const newEditorState = EditorState.push(
        editorState,
        ContentState.createFromText('')
      )
      this.setState({ editorState: newEditorState })
    }
  }

  onEditorStateChange = editorState => {
    const { attribute, noteEdit, onChange } = this.props
    this.setState({ editorState })

    const currentContent = editorState.getCurrentContent()
    const plainText = currentContent.getPlainText()
    const content = draftToHtml(convertToRaw(currentContent))
    if (noteEdit) {
      return onChange(content, plainText)
    }
    return onChange({
      [attribute]: content,
      [`${attribute}PlainText`]: plainText,
    })
  }

  onEditorStateChangeBlur = (event, editorState) => {
    const { attribute, onBlur } = this.props

    // Don't continue processing if the user didn't specify onBlur prop
    if (!onBlur || !isFunction(onBlur)) return

    const currentContent = editorState.getCurrentContent()
    const plainText = currentContent.getPlainText()
    const content = draftToHtml(convertToRaw(currentContent))

    return onBlur({
      [attribute]: content,
      [`${attribute}PlainText`]: plainText,
    })
  }

  render() {
    const { editorState } = this.state

    return (
      <Editor
        editorClassName="editor-content"
        editorState={editorState}
        hashtag={{}}
        onBlur={this.onEditorStateChangeBlur}
        onEditorStateChange={this.onEditorStateChange}
        spellCheck
        toolbar={toolbar}
      />
    )
  }
}

export default TextEditor
