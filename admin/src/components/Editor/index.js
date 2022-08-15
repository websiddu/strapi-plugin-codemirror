import React, { useEffect, useRef, useState } from "react";
import GlobalStyles from "./styles";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { useIntl } from "react-intl";

import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import Landscape from "@strapi/icons/Landscape";

import MediaLib from "../MediaLib";

const CodeWrapper = styled("div")`
  border: solid 1px #eee;
  border-radius: 4px;
  overflow: hidden;
`;

const Editor = ({
  onChange,
  name,
  value,
  cmr,
  intlLabel,
  disabled,
  error,
  description,
  required,
}) => {
  const { formatMessage } = useIntl();
  const cm = useRef();

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleChangeAssets = (assets) => {
    let newValue = value ? value : "";

    let imgTag = "";

    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        imgTag = `<img src="${asset.url}" alt="${asset.alt}"></img>`;
      }
    });

    insertTextAtCursor(imgTag);

    handleToggleMediaLib();
  };

  function insertTextAtCursor(text) {
    let { state, view } = cm;
    if (!state || !view) return;

    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    );

    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: text,
      },
      selection: EditorSelection.range(main.from + 4, main.to + 4),
      // selection: { anchor: main.from + 4 },
    });
  }

  return (
    <Stack size={1}>
      <Box>
        <Typography variant="pi" fontWeight="bold">
          {formatMessage(intlLabel)}
        </Typography>
        {required && (
          <Typography variant="pi" fontWeight="bold" textColor="danger600">
            *
          </Typography>
        )}
      </Box>
      <Box>
        <GlobalStyles></GlobalStyles>
        <Button
          startIcon={<Landscape />}
          variant="secondary"
          fullWidth
          onClick={handleToggleMediaLib}
        >
          Media library
        </Button>
        <Box style={{ height: 12 }}></Box>
        <CodeWrapper>
          <CodeMirror
            ref={cm}
            value={value}
            height={800}
            extensions={[markdown({ base: markdownLanguage })]}
            onChange={(value) => {
              onChange({ target: { name, value } });
            }}
          />
        </CodeWrapper>
      </Box>
      {error && (
        <Typography variant="pi" textColor="danger600">
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography>
      )}
      {description && (
        <Typography variant="pi">{formatMessage(description)}</Typography>
      )}

      <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={handleToggleMediaLib}
      />
    </Stack>
  );
};

export default Editor;
