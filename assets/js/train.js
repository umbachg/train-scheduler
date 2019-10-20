var firebaseConfig = {
    apiKey: "AIzaSyAJHM80KPk93fwTzKoHk-6vBfDUX98Fuik",
    authDomain: "trainhw8.firebaseapp.com",
    databaseURL: "https://trainhw8.firebaseio.com",
    projectId: "trainhw8",
    storageBucket: "trainhw8.appspot.com",
    messagingSenderId: "1010076165224",
    appId: "1:1010076165224:web:58eed6e4bf17b2ff0007dd"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainTime
var destination
var firstTrainTime
var frequency


$(document).ready(function () {

    var database = firebase.database()

    $("#submit").on("click", function (e) {
        e.preventDefault()

        var formTrainName = $("#formTrainName").val()
        var formDestination = $("#formDestination").val()
        var formFirstTrainTime = $("#formFirstTrainTime").val()
        var formFrequency = $("#formFrequency").val()

        database.ref().push({
            trainTime: formTrainName,
            destination: formDestination,
            firstTrainTime: formFirstTrainTime,
            frequency: formFrequency,
        })
    })

    database.ref().on('child_added', function (snap) {
        var newTrainName = snap.val().trainTime
        var newDestination = snap.val().destination
        var newFirstTrainTime = snap.val().firstTrainTime
        var newFrequency = snap.val().frequency

        console.log("Train Name: " + newTrainName)
        console.log("Destination: " + newDestination)
        console.log("First Arrival: " + newFirstTrainTime)
        console.log("Frequency: " + newFrequency)

        var currentTime = moment()
        var firstTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(1, "years")
        var timeDiff = moment().diff(moment(firstTimeConverted), "minutes")
        var timeRemainder = timeDiff % newFrequency
        var minUntilNext = newFrequency - timeRemainder
        var nextTrainTime = moment().add(minUntilNext, "minutes").format("hh:mm")

        console.log(currentTime.format("hh:mm"))
        console.log(firstTimeConverted)
        console.log(timeDiff)
        console.log(timeRemainder)
        console.log(minUntilNext)
        console.log(newTrainName)

        $("#infoTable").append("<tr><td>" +
            newTrainName + "</td><td>" +
            newDestination + "</td><td>" +
            newFrequency + "</td><td>" +
            nextTrainTime + "</td><td>" +
            minUntilNext + "</td></tr>")
    })
})