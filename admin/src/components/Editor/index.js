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

    newValue = insertTextAtCursor(imgTag);
    onChange({ target: { name, value: newValue } });
    handleToggleMediaLib();
  };

  function insertTextAtCursor(text) {
    let range = cm.current?.state?.selection?.ranges[0] || { from: 0, to: 0 };
    let transaction = cm.current.state.update({
      changes: {
        from: range.from,
        to: range.to,
        inset: text,
      },
    });

    return transaction.state.doc.toString();
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
