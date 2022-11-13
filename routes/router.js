
// Import helper functions
const {writeData, readData} = require('../helpers/save')
const {isEmail, isPhone} = require('../helpers/helper')
const { resolve } = require('path'); // Import path finder
const imageFolder = resolve('./images/'); // Identify invoices storage folder

module.exports = {

    // Object function to load front page.
    indexPage: async (req, res) => {

        async function findDestinations(client, resultsLimit) {

            const cursor = client
              .db('safari')
              .collection('destinations')
              .find()
              .limit(resultsLimit);
          
            const results = await cursor.toArray();

            return results;

        }

        let destinations = await findDestinations(client, 20); // Get travel destinations

        res.render('home.ejs', {
            title: " ",
            message: '',
            destinations:destinations
        });

    },

    // Object function to load front page.
    add: (req, res) => {
        res.render('add.ejs', {
            title: " ",
            message: ''
        });
    },

    // Object function to post new user data into database.
    newAdd: (req, res) => {

        const {email, phone, location, country} = req.body; // Capture post request data from new user

        // Capture photo from form data
        const uploadedFile = req.files.image;

        // Check if passwords match
        if(!isEmail(email) || !isPhone(phone) || !location || !country ){
        
            // If not, redirect back to signup
            res.render('home.ejs', {
                message: 'Please check that the data you provided is correct.',
                title: "Safari Destinations | Submit Request"
            });   

        } else {

        // Give file new name
        let image_name = uploadedFile.name;
        const fileExtension = uploadedFile.mimetype.split('/')[1];

        image_name = Math.random() + '.' + fileExtension;    // Give image new name

        // Filter invalid photo formats 
        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg') {
        
        // upload the file to the /public/assets/i directory
        uploadedFile.mv(`${imageFolder}/${image_name}`, async (err ) => {
            if (err) {
                console.log(err)
                res.redirect('/');
            } else {

                let newLocation = {
                    location: location,
                    email: email,
                    phone: phone,
                    image: image_name,
                    country: country,
                    date: new Date(), // Date of signup
                };

                // Insert location data into MongoDB Database

                const destinationCollection = client.db("safari").collection("destinations");

                destinationCollection.insertOne(newLocation)
                .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
                .catch(err => console.error(`Failed to insert item: ${err}`));

               // If not, redirect back to signup
               res.redirect('/done');
               }
        }); 

        // Prevent invalid photo formats by choosing default photo               
        } else {

        // Invalid File format. Only jpeg' and 'png' images are allowed.
        // Redirect back to home page if photo is invalid
        res.render('index.ejs', {
            title: "",
            message: ''
        });
        }
       }   
    }, 

    // Object function to load submission done page.
    done: (req, res) => {
        res.render('done.ejs', {
            title: " "
            ,message: ''
        });
    },      
    
    // Object function to load about page
    about: (req, res) => {
        res.render('about.ejs', {
            title: " "
            ,message: ''
        });
    },     

};

