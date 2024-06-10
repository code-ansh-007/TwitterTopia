## Introducing TweeTopia
TweeTopia is a mini twitter clone or twitter inspired social media application built as an assignment for a company whose name i cannot disclose.
#### Dear Reviewer
- If you are a reviewer then please check out the deployed site at - https://twitter-topia-client.vercel.app/ 
- If you want to check out the API for the backend then you can use the "Postman Collection" file which i have included in the repository.
- Both the Backend and the Client side have been deployed in Vercel and the site is working in pristine condition
#### Tech Used
Throughout this project i have followed coding best practices according to MERN stack coding standards. For the backend i have used the MVC(Model, View, Controller) coding architecture for easy server management even after deployment keeping in mind the scalability aspect of the application.
##### Client Side 
- React.js
- Tailwind CSS
- Zustand state management
- React Icons
##### Server Side
- `MongoDB Atlas` (Cloud DB for the application)
- `Express.js` (Server code)
- `JWT` (for user authentication)
- `Cloudinary` (For storing and retrieving digital assets like images and videos)
- `Multer` (For parsing local files to stage them for uploading to Cloudinary)
- `CORS` (for allowing cross origin usage of APIs)
- `bcrypt` (for hashing passwords to enhance security)

#### Setting Up Locally
If you want to check out the application at the ground level you may want to clone the repo and run it locally, you can run it locally with the following steps

- Clone repository - https://github.com/code-ansh-007/TwitterTopia.git
- Go to sub-directory "client" - Install dependencies `npm install`
- Go to sub-directory "server" - Install dependencies `npm install`
- Open two terminals one for "server" and one for "client" run command `npm run dev` to start the development server and run command `npm start` to start the front-end development server

The client side had no environment variable, however the server has a view of them

- MONGODB_URI (Get your URI from mongodb atlas console)
- PORT (you can set it to any port of your choice)
- JWT_SECRET (configure yourself)
- CLOUDINARY_CLOUD_NAME (get credentials from cloudinary  console)
- CLOUDINARY_API_KEY (get credentials from cloudinary  console)
- CLOUDINARY_SECRET_KEY (get credentials from cloudinary  console)

After this setup you should be good to go...
