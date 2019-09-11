
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyAMvGzL4-RToBw5bVB49PSiCDCSLm7cyUA",
    authDomain: "trainschedule-e7175.firebaseapp.com",
    databaseURL: "https://trainschedule-e7175.firebaseio.com",
    projectId: "trainschedule-e7175",
    storageBucket: "trainschedule-e7175.appspot.com",
    messagingSenderId: "233019844909",
    appId: "1:233019844909:web:5e46a8e4cb5bdafe"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainStart = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainStart: trainStart,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log("New Train start " + newTrain.trainStart);
  console.log("New Train Frequency " + newTrain.frequency);

  alert("Train Scheduled!");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().trainStart;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log("Train Start " + trainStart);
  console.log("Frequency " + frequency);

  //Converted Time
  var remainder = moment().diff(moment.unix(trainStart), "minutes") % frequency;
  var minAway = frequency - remainder;

  var arrival = moment().add(minAway, "m").format("hh:mm A");

  console.log("Remainder " + remainder);
  console.log("MinAway " + minAway)
  console.log("Arrival " + arrival)
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrival),
    $("<td>").text(minAway)
  );

  // Append the new row to the table
  $("#schedule > tbody").append(newRow);
});




