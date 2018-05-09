# Food2Fork API

A javascript client-server app that accesses a public API, using the express.js framework and ejs view engine. Allows users to search for food recipes, either in a textfield or in the url bar, and displays the results from the food2fork API.

## Getting Started

### Installing Modules
In order to install the modules needed to use the app, enter the command:
```
>>> npm install
```

### Executing

The app can be executed using the command:
```
>> node Server.js
```

### Finding The Page

A step by step series of instructions explaining the URL of the application

In Chrome (or any browser with similar abilities), use the url:

```
http://localhost:3000/recipes
```

The URL can also be:

```
http://localhost:3000/recipes/?ingredients=kale,bread
```

where it will display the page with recipes containing the ingredients kale
and bread.

## Using the App

To start using the app, type in the food/ingredient you would like to search for in the textfield.
You can hit the enter key to submit or click the search button. When you hover over a recipe, it will
display the title below. When you click on a recipe, it will open a new tab and send you to the
food2fork page for it.

## Author

* **Jonathan Scala** - *November 22, 2017*
