import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";

const redColorStyle = {
  color: "red",
};

const styleMap = {
  RED: redColorStyle,
};

function CustomEditor({ editorState, setEditorState }) {
  const myKeyBindingFn = (e) => {
    if (e.keyCode === 32) {
      return "custom-command";
    }
    return getDefaultKeyBinding(e);
  };

  const removeSpecialCharacter = (selectionState, contentState, blockText) => {
    const startOffset = selectionState.getAnchorOffset();
    const endOffset = selectionState.getFocusOffset();

    const contentWithoutText = Modifier.replaceText(
      contentState,
      selectionState.merge({
        anchorOffset: startOffset - blockText.length,
        focusOffset: endOffset,
        isBackward: false, // Adjust this based on your logic
      }),
      "",
    );

    return EditorState.push(
      editorState,
      contentWithoutText,
      "remove-characters",
    );
  };

  const handleKeyCommand = (command, editorState) => {
    if (command === "custom-command") {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const startKey = selectionState.getStartKey();
      const block = contentState.getBlockForKey(startKey);
      const blockText = block.getText();

      if (blockText === "#") {
        const newEditorState = removeSpecialCharacter(
          selectionState,
          contentState,
          blockText,
        );
        setEditorState(newEditorState);
        setEditorState(RichUtils.toggleBlockType(newEditorState, "header-one"));
      }
      if (blockText === "*") {
        const newEditorState = removeSpecialCharacter(
          selectionState,
          contentState,
          blockText,
        );
        setEditorState(newEditorState);
        setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
      }
      if (blockText === "**") {
        const newEditorState = removeSpecialCharacter(
          selectionState,
          contentState,
          blockText,
        );
        setEditorState(newEditorState);
        setEditorState(RichUtils.toggleInlineStyle(newEditorState, "RED"));
      }
      if (blockText === "***") {
        const newEditorState = removeSpecialCharacter(
          selectionState,
          contentState,
          blockText,
        );
        setEditorState(newEditorState);
        setEditorState(
          RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE"),
        );
      }
      if (blockText === "```") {
        const newEditorState = removeSpecialCharacter(
          selectionState,
          contentState,
          blockText,
        );
        setEditorState(newEditorState);
        setEditorState(RichUtils.toggleBlockType(newEditorState, "code-block"));
      }
    }
  };

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={myKeyBindingFn}
      customStyleMap={styleMap}
    />
  );
}

export default CustomEditor;
