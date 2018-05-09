var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var API_Key = 'YOUR API KEY';
var defaultData = [
  {
    'title': 'California Grilled Veggie Sandwich',
    'link': 'http://food2fork.com/view/5536',
    'img': 'http://static.food2fork.com/98772868d6.jpg'
  },
  {
    'title': 'Meatball &amp; mozzarella bake',
    'link': 'http://food2fork.com/view/f4c519',
    'img': 'http://static.food2fork.com/3018690_MEDIUMafa4.jpg'
  },
  {
    'title': 'Roasted Cucumber Sandwiches',
    'link': 'http://food2fork.com/view/60adc2',
    'img': 'http://static.food2fork.com/366725336f.jpg'
  }
];

/*
    Note on View Engine:
      JSON data is being passed as partials to the index.ejs file
      when being rendered. The file is mainly HTML, with a check for
      data and a foreach loop that will setup each recipe box.
*/

// Set default data to display until a user enters ingredients/food they want
// Function creates a URL address to grab data from based on the user query
function address(q) {
  var host = 'https://www.food2fork.com';
  var path = '/api/search?q=' + q['ingredients'] + '&key=' + API_Key;
  return host + path;
}

// Fetches data from the API, given the ingredients and the response
function fetchInfo(ingredientName, res) {
  // Get the URL path built by the address function
  // Cast the ingredients as an object of the form {'ingredients': data}
  request(address({ 'ingredients': ingredientName }), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Parse the JSON data from the API
      // Have it built into an array of objects
      var info = JSON.parse(body);
      var g = recipeList(info);
      // Render the index.ejs page with a partial of the API data
      res.render('index', { 'results': g });
    }
  });
}

// Return an array of objects containing food links,imgs, and title
function recipeList(foodData) {
  // Given the JSON.parse(body) object, access the recipes array
  // Initialize the array that will contain the new objects
  var recipes = foodData['recipes'];
  var dataObj = []

  for (var i = 0; i < recipes.length; i++) {
    // Append objects with the recipe url, img, & title
    dataObj.push({
      'link': recipes[i]['f2f_url'],
      'img': recipes[i]['image_url'],
      'title': recipes[i]['title']
    });
  }
  return dataObj;
}

// Set the Port and View Engine (ejs)
// Set path to views folder
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set a static path to public folder containing imgs and css
// Use the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/recipes', (request, response) => {
  // Get the user Query from the url
  console.log(request.query);
  var q = request.query;
  // If there was no query, load some default recipes
  // Otherwise, pass the ingredients and the response to be fetched and rendered
  if (Object.keys(q).length === 0 && q.constructor === Object) {
    // Render the index.ejs page with a partial of the default data
    response.render('index', { 'results': defaultData });
  }
  else {
    fetchInfo(q['ingredients'], response);
  }
});

// HANDLES POSTS FROM THE FORM IN INDEX.EJS
app.post('/recipes', (req, res) => {
  console.log('User inputted: ' + req.body.ingredient);
  fetchInfo(req.body.ingredient, res);
});

// Listen on the port previously set
app.listen(app.get('port'), () => {
  console.log('Express started, cancel on Ctrl-C to terminate');
});
