import { injectGlobal } from 'styled-components';

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
    background: linear-gradient(135deg,#16ff7e 0%,#00ff95c4 21%,#00ff89 51%,#00ffbe 79%,#00ffc4 79%,#1cf97f 100%)
  }

  a{
    text-decoration: none;
  }

  .app{
    min-height: 100%;
    min-width: 100%;
  }
  .small-font{
    font-size:12px !important;
  }
  .user-type{
    display: flex !important;
    justify-content: center !important;
    padding-right: 22px !important;
    border: 1px solid white !important;
    border-radius: 6px !important;
    color: white !important;
    font-size: 14px !important;
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
  .width200{
    width: 200px;
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
    display: flex !important;
    justify-content: center;
  }
  .center-img{
    display: flex;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 3.25rem;
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

  .push_down{
    margin-top:1.2rem ;
  }

  .black{
    color: #757575;
  }

  .alignCenter{
    display: flex !important;
    align-items: center;
  }

 .alignRight{
    display: flex !important;
    justify-content: flex-end !important;
  }
  
  .formAlignRight{
    display: flex !important;
    justify-content: flex-end !important;
  }

  .buttonFormat{
    margin-left: 260px !important;
    margin-top: 15px !important;
  }
  
  .centerForm{
    display: flex !important;
    justify-content: center !important;
    flex-direction: column !important;
    align-items: center !important;
  }
 
  .test-table{
    display: table;
    max-width: 500px;
    margin: auto;
  }

  .button-completed{
    border: 1px solid #66bb6a !important;
    color: #66bb6a !important;
    background-color: #66bb6a1a !important;
    margin: 5px !important;
  }

  .button-not-completed{
    border: 1px solid #7ee6b3 !important;
    color: #7ee6b3 !important;
    background-color: #7ee6b31a !important;
    margin: 5px !important;
  }

  .justify-content{
    justify-content: space-between;
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
