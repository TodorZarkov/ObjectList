# Getting Started with Object List 

## Basic functionality: 
    - Guest should be able to see only public collections (lists) (with privacyLevel property 'all') of objects.
    - User should be able to create collections, add objects to its own collections and brows trough other users collections with privacyLevel property 'users'. Also user should be able to 'Ask To Buy Collection/Object' if enabled, and offer a price.

## Authentication: 
    - The site supports users with google account only. 
    On attempt to Login for the first time (register), the user is prompted to allow access to its own google drive(the site asks to access and modify its own files and folders on the user's google drive). 
    When consent is obtained the site generates credentials for the server, uploald them to the google drive and login tho the server (softuni practice server). The credentials are generated from the gmail email and random generated password.
    On subsequent attempt to login the site prompt user to choose google account and get the credentials for  the server from the google drive.


### `Quick Add` button

### `Add` button

### `Add List` button

