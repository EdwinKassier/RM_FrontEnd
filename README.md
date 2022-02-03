## Introduction

Built off of a django boilerplate as well as a React bootstrap, this repo extends the idea of a classic TODO app as it encompasses the full CRUD functionality required. 

## Requirements
* Python3
* Pipenv
* npm or Yarn

## Getting started - Frontend

1. Source the virtual environment ```[pipenv shell]```
2. Install the dependencies ```[pipenv install]```

## Getting started - Backend

1. Install the dependencies ```[npm install]```

## Run the application
You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

1. Run this command to start the backend server in the ```[backend]``` directory: ```[python manage.py runserver]``` (You have to run this command while you are sourced into the virtual environment as well as in the backend directory)
2. Run this command to start the frontend development server in the root directory: ```[npm start]``` or ```[yarn start]```(This will start the frontend on the address [localhost:3000](http://localhost:3000))