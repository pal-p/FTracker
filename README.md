# FTracker

A fun money tracking app  
Manage your expenses, set goals, save money ... while having fun.  
Made with nodeJS, MongoDb, EJS, Bootstrap 4.
  
Everybody is welcome to contribute! Let's have fun coding together.  

Plese use the BEM notation for your css http://getbem.com/introduction/ 

# Concept

* A budget tracker where you add and track accounts  
* You can set goals let's say a holiday trip you want to save money for, you can set a money JAR and put $&& from your different accounts inside  
* Some automatic saving function where you set up a date each month, which account you want to take money from and which amount and it automatically save it in the jar you want  
* Ask me anything and feel free to request functionalities. I really want to do some teamwork on this project  

# Run the app

1. `npm install`
2. Create a .env file
    1. Copy `env.example` to `.env`
    2. Set your own values for the variables in `.env`
        1. If you don't have MongoDB on your computer you could use [mLab](https://docs.mlab.com/). It's a MongoDB Database as a Service (DaaS) provider. If you choose this option you will need to set a user admin for your database and change the MONGO_LOCAL_CONN_URL variable to the MongoDB URI provided by mlab.
3. `npm run dev`
