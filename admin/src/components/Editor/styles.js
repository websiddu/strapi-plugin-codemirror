import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	.cm-editor .cm-content {
		white-space: pre-wrap !important;
		max-width: 95%;
		font-size: 12px;
		line-height: 20px;
		font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
	}

	 .md-editor {
    --color-border-muted: #888;

    color: var(--color-fg-default);
    box-shadow: var(--color-border-shadow);
    text-align: left;
    border-radius: 3px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--color-canvas-subtle);
  }

  .md-editor-content {
    position: relative;
    flex: 1;
    overflow: auto;
  }

  .md-editor-fullscreen .md-editor {
    border-radius: 0;
  }

  .md-editor-fullscreen {
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .md-editor-fullscreen .md-editor-toolbar {
    border-radius: 0;
  }

  .md-editor-preview {
    padding: 20px;
    width: 0%;
    overflow: hidden;
    border-left: 0;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
  }

  .md-editor h1 a, .md-editor h2 a, .md-editor h3 a, .md-editor h4 a, .md-editor h5 a, .md-editor h6 a {
    display: none;
  }



  .md-editor-toolbar {
	 border-bottom: 1px solid var(--color-border-muted);
	 background-color: var(--color-canvas-subtle);
	 padding: 4px 2px 4px 5px;
	 border-radius: 3px 3px 0 0;
	 display: flex;
	 gap: 2px;
}

 .md-editor-toolbar button {
	 background: none;
	 border: none;
	 cursor: pointer;
	 outline: 0;
	 display: inline-block;
	 height: 24px;
	 width: 24px;
	 padding: 3px 2px;
	 border-radius: 2px;
	 transition: all 0.3s;
	 color: var(--color-fg-default);
}
 .md-editor-toolbar button:hover {
	 color: var(--color-accent-fg);
	 background-color: var(--color-neutral-muted);
}
 .md-editor-toolbar button.active {
	 color: var(--color-prettylights-syntax-constant);
	 background-color: var(--color-neutral-muted);
}
 .md-editor-toolbar button:active {
	 color: var(--color-danger-fg);
	 background-color: var(--color-neutral-muted);
}
 .md-editor-toolbar button svg {
	 vertical-align: middle;
}
 .md-editor-toolbar-mode {
	 float: right;
	 padding-right: 5px;
}
`;
