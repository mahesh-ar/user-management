# user-management
# Step 1 Install node modules by running `npm i`
# Step 2 replace the mongo connection string in .env file `MONGODB_CONNECTION_STRING={{mongo_connection_string}}`
# Step 3 following are routes created:

# 1. Registration API to register and get access token for updating and fetching user list
Method: POST
URL: http://localhost:4002/user/info/register
Sample Body: 
{
    "name": "test",
    "email": "test@gmail.com",
    "mobile": "12345677",
    "password": "test@123"
}
Sample Response: 
{
    "user": "test@gmail.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYWhlc2hhcjFAZ21haWwuY29tIiwiaWF0IjoxNjI0OTAxNDc0LCJleHAiOjE2MjQ5MDUwNzR9.Z-KaIi8FdIDG1Rcxe4ME80WUnCPdeHz_28BT5vUfmOA",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYWhlc2hhcjFAZ21haWwuY29tIiwiaWF0IjoxNjI0OTAxNDc0LCJleHAiOjE2MjQ5ODc4NzR9.hh1W_-dEs6mtKRjHs0CkWJeJ4EnTguBzWjw5q1VaY1c"
}

# 2. Login API to authenticate and get access token for updating and fetching user list
Method: POST
URL: http://localhost:4002/user/info/login
Sample Body: 
{
    "email": "test@gmail.com",
    "password": "test@123"
}
Sample Response: 
{
    "user": "test@gmail.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYWhlc2hhcjFAZ21haWwuY29tIiwiaWF0IjoxNjI0OTAxNDc0LCJleHAiOjE2MjQ5MDUwNzR9.Z-KaIi8FdIDG1Rcxe4ME80WUnCPdeHz_28BT5vUfmOA",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYWhlc2hhcjFAZ21haWwuY29tIiwiaWF0IjoxNjI0OTAxNDc0LCJleHAiOjE2MjQ5ODc4NzR9.hh1W_-dEs6mtKRjHs0CkWJeJ4EnTguBzWjw5q1VaY1c"
}

# 3. Update user name, mobile using access token
Method: PUT
URL: http://localhost:4002/user/info/update/:email
Header: { authorization : access_token }   # pass the access token genearted in Step 1 or 2
Sample Body: 
{
    "name": "test",
    "mobile": "12345677",
}
Sample Response: 
{
    "email": "test@gmail.com",
    "name": "test",
    "mobile": 12345677
}

# 4. Get user list using access token
Method: GET
URL: http://localhost:4002/user/info/fetchUsers
Header: { authorization : access_token }   # pass the access token genearted in Step 1 or 2

Sample Response: 
[
    {
    "email": "test@gmail.com",
    "name": "test",
    "mobile": 12345677
    }
]