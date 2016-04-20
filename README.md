Notice that the current version is using a mongo database and will have to be exchanged once we have a working hadoop database.

If you still wish to run the service as is, then here is how you go about doing it:
The first thing that one needs to do is to install mongo and nodejs. After that
running npm install in the main folder should be all that is needed for the install.
You might have to setup the accecs on the .npm folder depending on what distro you run.

To start the application just run "npm start" and then go to http://localhost:8080
