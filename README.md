# ReactNative-SimpleForm
SimpleForm to fetch data from the github API with custom list view
Project Created with Expo.

To install the app, run npm install

Simple project to fetch the repository data for a given user (through a previous
form)

![app](https://github.com/ianvasco/ReactNative-SimpleForm/blob/master/s4ngif.gif)

This project uses native-base for rendering the Form, as well as redux Form for 
validating user input.

Basic validations were used for each field, easily customizable for everyone needs. 

Form is hidden after submit to give more space to fetched data. You could get back
adding a button for it. In case you need to show fewer data from the github API
you could change the url end to "?page=/number/&per_page=/desired_data/".

SlimAsync were used to simplify middleware.


