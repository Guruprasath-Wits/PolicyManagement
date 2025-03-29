# PolicyManagement
Task

Versions
Node - 10.2.3
nvm - 20.10
Mongo Db  - 4.4

Endpoint: (postman call)

http://localhost:5000/api/upload => post call (body => form-data => key (file)) =>Upload file 
responce => {
  "message": "Data uploaded successfully",
  "details": { "status": "success" }
}


http://localhost:5000/api/policy/search?username=Torie Buchanan => get policy details using username(passing username in params)

http://localhost:5000/api/policy/aggregate => get policy aggregate with user 

Setup Instructions

git clone https://github.com/Guruprasath-Wits/PolicyManagement.git
cd PolicyManagement

npm install

npm start

The application processes file uploads asynchronously using worker threads to enhance performance.

Proper error handling is implemented for API responses.

Uses PM2 for process monitoring and MongoDB for data storage.



