import Router from './Router';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

interface IBtnTheme {
  isDark: boolean;
}
export const BtnTheme = styled.button<IBtnTheme>`
    display: flex;
    align-items: center;
    padding: 6px;
    font-size: 12px;
    background-color: ${(props) => props.isDark ? props.theme.boxColor : "#fffdfa" };
    border: 0;
    border-radius: 12px;
    position: relative;
    width: 70px;
    height: 20px;
    cursor: pointer;

    transition: left 0.3s linear, background-color 0.3s linear;

    /* color: ${(props) => props.isDark ? "red" : "blue"}; */
    &:before {
        content: ${(props) => props.isDark ? `"Dark🌑"` : `"🌞Light"`};
        display: block;
        flex: 1;
        color: ${(props) => props.isDark ? "white" : "#444"};

        position: absolute;
        left: ${(props) => props.isDark ? "auto" : "4px"};
        right: ${(props) => props.isDark ? "4px" : "auto"};
    };
    &:after {
        content: '';
        display: inline-block;
        flex: 0 0 auto;

        width: 12px;
        height: 12px;
        background-color: ${(props) => props.isDark ? "#75799d" : "#bab5ac"};
        border-radius: 6px;

        position: absolute;
        left: ${(props) => props.isDark ? "4px" : "calc(100% - 12px - 4px)"};

        transition: left 0.3s linear, background-color 0.3s linear;
    };
`;
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    transition: background-color 0.24s ease-out, color 0.24s ease-out;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router toggleDark={toggleDark} isDark={isDark} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  )
}

export default App;
