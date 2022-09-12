## Getting Started
This is guide on how you will run the whole frontend and backend. Make sure the port 8080 and 4200 are free to your system. Otherwise you might need to change the port

## Requirements: 
* Angular CLI v14.2.1 >=
* Node v14.17.0 >=
* NPM v7.20.6 >=
* Visual Studio Code

## Running Frontend
1. Go to the Repository Folder and open AuctionWebApp directory using your visual studio code. 
2. In the terminal execute the following command:
    ```
    npm i 
    ng s
    ```
    
    <b><i>By default the ng serve run in port 4200, if your port 4200 is blocked you can run it with other port by running the following command</i></b>
    ```
      npm i 
      ng s --port 3000
    ```
    
## Running Backend
1. Go to the Repository Folder and open AuctionBackend directory with another instance of visual studio code. 
2. In the terminal execute the following command:
    ```
    npm i 
    node index.js
    ```
    
    NOTE:  <b> <i>It's important to call these commands under AuctionBackend directory because the index.js is using SQLITE for database and it use relative pathing to get the sqlite database</i> </b>
    
By default the backend will run in 8080, if your port 8080 is blocked you can run it with other port by doing the following step: 
* Inside the AuctionBackend directory, open the index.js
* Go to the line 8 and change the PORT variable with the port that you want
* Save the file and try to run it again
    
    
    
## API Documentation
For the API documentation, I use swagger to document every API endpoints. In order to access the swagger, make sure that the backend is running and you will see the terminal like this:

```
C:\Repository\FulcrumExamProject\AuctionBackend>node index.js
API listen to ${PORT}
```

Once you confirm its running well, you can visit the API documentation with this link : http://localhost:8080/api-docs

## Having an issue?
In case you having an issue, please email me at edisonesguerra.developer@gmail.com
