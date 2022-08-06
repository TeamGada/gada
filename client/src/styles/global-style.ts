import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Noto Sans KR', sans-serif;
    overflow-y: scroll;
  }

  html>/**/body {
    overflow-y: scroll;
  }
`;
