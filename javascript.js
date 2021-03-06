<<<<<<< HEAD
/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)        
var config = {
  apiKey: 'AIzaSyCG6p9pu7DvLtnhiAIxhu1kJjJ_eAE7AYs',
  authDomain: "coder-bay-views.firebaseapp.com",
  databaseURL: "https://coder-bay-views.firebaseio.com",
  storageBucket: "coder-bay-views.appspot.com",
  messagingSenderId: "17945436261"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -----------------------------

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").html(snap.numChildren());
});

// ------------------------------------
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref("/bidderData").on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the local variables for highBidder equal to the stored values in firebase.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // change the HTML to reflect the newly updated local values (most recent information from firebase)
    $("#highest-bidder").html(snapshot.val().highBidder);
    $("#highest-price").html("$" + snapshot.val().highPrice);

    // Print the local data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the local value in firebase
    $("#highest-bidder").html(highBidder);
    $("#highest-price").html("$" + highPrice);

    // Print the local data to the console.
    console.log("local High Price");
    console.log(highBidder);
    console.log(highPrice);
  }

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#submit-bid").on("click", function(event) {
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());

  // Log the Bidder and Price (Even if not the highest)
  console.log(bidderName);
  console.log(bidderPrice);

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref("/bidderData").set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    // Log the new High Price
    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);

    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").html(bidderName);
    $("#highest-price").html("$" + bidderPrice);
  } else {

    // Alert
    alert("Sorry that bid is too low. Try again.");
  }
});
=======
var config = {
    apiKey: "AIzaSyCG6p9pu7DvLtnhiAIxhu1kJjJ_eAE7AYs",
    authDomain: "yefei-8e467.firebaseapp.com",
    databaseURL: "https://yefei-8e467.firebaseio.com",
    projectId: "yefei-8e467",
    storageBucket: "yefei-8e467.appspot.com",
    messagingSenderId: "371896912674"
  };
firebase.initializeApp(config);
var database = firebase.database();

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  var empName = $("#name-input").val().trim();
  empName = empName.toUpperCase();
  var empDestination = $("#destination-input").val().trim();
  empDestination = empDestination.toUpperCase();
  var empTime = $("#time-input").val().trim();
  var empFrequency = $("#frequency-input").val().trim();

  if(empName !== "" && empDestination !== "" && empTime !== "" && empFrequency !== ""){
    if(moment(empTime, "HHmm", true).isValid()){
      if($.isNumeric(empFrequency)){
        database.ref().push({
          name: empName,
          destination: empDestination,
          time: empTime,
          frequency: empFrequency
        });
      console.log("Train added");
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
      }
      else{
        console.log("Frequency is not a number.")
        }
      }
    else{
      console.log("Date is wrong");
      }
  }
  else{
  console.log("Invalid input.");
  }
});

var sort = "name";


database.ref().orderByChild(sort).on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var time = snapshot.val().time;
  var frequency = snapshot.val().frequency;
  var now = moment();
  console.log(snapshot.val());
  

  if(name !== undefined && destination !== undefined && time !== undefined && frequency !== undefined){
  
    $("#employee-table > tbody").append(
      "<tr><td>" + name + 
      "</td><td>" + destination + 
      "</td><td>" + time + 
      "</td><td>" + frequency +
      "</td><td>" + (frequency - (moment().format("mm") % frequency)));  
    }
});

console.log(moment().format("HHmm"));


//compare prices of share rides
>>>>>>> e2a743c3720dbbb8f45e8f6e49735dcd3b362767
