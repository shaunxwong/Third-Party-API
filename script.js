// // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// // the code isn't run until the browser has finished rendering all the elements
// // in the html.
// $(function () {
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });

$(function () {
  // Get the current date using Day.js and display it in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Function to create time blocks from 9 AM to 5 PM
  function createTimeBlocks() {
    var startHour = 9;
    var endHour = 17;

    for (var hour = startHour; hour <= endHour; hour++) {
      // Clone the time-block template
      var $timeBlock = $("#timeblock-template").clone();
      $timeBlock.attr("id", "hour-" + hour); // Set the id of the time block

      // Set the hour text based on the current hour (e.g., 9AM, 10AM)
      var displayHour = dayjs().hour(hour).format("hA");
      $timeBlock.find(".hour").text(displayHour);

      // Check if the current hour is in the past, present, or future and apply the corresponding class
      var currentHour = dayjs().hour();
      if (hour < currentHour) {
        $timeBlock.addClass("past");
      } else if (hour === currentHour) {
        $timeBlock.addClass("present");
      } else {
        $timeBlock.addClass("future");
      }

      // Get the saved event for the current time block from local storage and set the textarea value
      var savedEvent = localStorage.getItem("hour-" + hour);
      if (savedEvent) {
        $timeBlock.find(".description").val(savedEvent);
      }

      // Add a click event listener to the save button
      $timeBlock.find(".saveBtn").on("click", function () {
        var $parentTimeBlock = $(this).closest(".time-block");
        var eventDescription = $parentTimeBlock.find(".description").val();
        var hourId = $parentTimeBlock.attr("id");
        localStorage.setItem(hourId, eventDescription);
      });

      // Append the time block to the container
      $(".container-lg").append($timeBlock);
      $timeBlock.show(); // Show the time block
    }

    // Remove the time-block template from the DOM
    $("#timeblock-template").remove();
  }

  // Call the createTimeBlocks function to generate the time blocks
  createTimeBlocks();
});
