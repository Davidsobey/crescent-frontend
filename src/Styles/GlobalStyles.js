import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    display: flex;
    background: #0033aa; /* Old browsers */
    background: linear-gradient(135deg,#ff1616 0%,#ff6000c4 21%,#ff9400 51%,#ff4300 79%,#ff3d00f5 79%,#ff0000 100%);
  }

  a{
    text-decoration: none;
  }

  .logo{
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding-top: 90px;
    padding-bottom: 45px;
    max-width: 450px;
    border-radius: 4px !important;
    margin: auto;
  }

  .login{
    max-width: 500px;
  }

  .content{
    width:100%;
  }


  body.fontLoaded {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
  }

  .MuiPaper-rounded-2 {
    border-radius: 5px !important;
  }

  .drawerLogo{
    width: 100%
  }

  .center{
    display: flex;
    justify-content: center;
  }
  .center-img{
    display: flex;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
    margin: auto;
  }
  .card {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
    border-radius: 4px !important;
    margin: auto;
  }

  .inline{
    display: inline-flex;
  }

  .pushdown{
    margin-top:1.2rem ;
  }

  .black{
    color: #757575;
  }

  .alignRight{
    display: flex;
    justify-content: flex-end;
  }

  .row{
    width: 100%;
  }

  .flex-container{
    display: flex;
  }

  .flex-column{
    flex-direction: column;
  }

  .flex-row-reverse{
    flex-direction: row-reverse;
  }

  .fullHeight{
    height: 100%;
  }
`;
