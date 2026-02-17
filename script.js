const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

let count = 0;
const maxCount = 50;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // get valuse
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;
  console.log(`Name: ${name}, Team: ${teamName}`);

  if (count < maxCount) {
    count++;
  } else {
    this.ariaBrailleRoleDescription =
      "Maximum number of attendees reached. Please try again later.";
    alert("Maximum number of attendees reached. Please try again later.");
  }
  console.log("Attendee Count: " + count);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  //Update the Team counters
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //show welcome message
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${name}! You have checked in for the ${teamName}.`;

  form.reset();
});
