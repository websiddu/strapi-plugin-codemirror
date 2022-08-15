import React, { useEffect, useRef, useState } from "react";
import GlobalStyles from "./styles";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import { Stack } from "@strapi/design-system/Stack";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

import MediaLib from "../MediaLib";

const Wrapper = styled("div")`
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

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleChangeAssets = (assets) => {
    // let newValue = value ? value : "";

    // assets.map((asset) => {
    //   if (asset.mime.includes("image")) {
    //     const imgTag = `<p><img src="${asset.url}" alt="${asset.alt}"></img></p>`;

    //     newValue = `${newValue}${imgTag}`;
    //   }

    //   // Handle videos and other type of files by adding some code
    // });

    // onChange({ target: { name, value: newValue } });
    handleToggleMediaLib();
  };

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
      <Wrapper>
        <GlobalStyles></GlobalStyles>
        <Button
          startIcon={<Landscape />}
          variant="secondary"
          fullWidth
          onClick={handleToggleMediaLib}
        >
          Media library
        </Button>
        <CodeMirror
          value={value}
          height={800}
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={(value) => {
            onChange({ target: { name, value } });
          }}
        />
      </Wrapper>
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
