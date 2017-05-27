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