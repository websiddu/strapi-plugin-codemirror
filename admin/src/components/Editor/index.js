import React, { useEffect, useRef } from "react";
import GlobalStyles from "./styles";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import { Stack } from "@strapi/design-system/Stack";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { useIntl } from "react-intl";

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
    </Stack>
  );
};

export default Editor;
