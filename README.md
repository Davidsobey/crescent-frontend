# crescent-frontend
## Deploy on Prod
1.  Go to root folder
2.  Run the command line code `yarn run build:prod`
3.  This will update the `/public` folder
4.  Open Filezilla
5.  Login using the FTP details on Azure
6.  Go to /site/wwwroot/ and delete the content that you are going to overwrite
7.  Publish the new content
