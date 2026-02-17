const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

let count = 0;
const maxCount = 50;
let attendees = [];

function renderAttendeeList() {
  const attendeeList = document.getElementById("attendeeList");
  attendeeList.innerHTML = "";

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const listItem = document.createElement("li");
    listItem.classList.add("attendee-item");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("attendee-name");
    nameSpan.textContent = attendee.name;

    const teamSpan = document.createElement("span");
    teamSpan.classList.add("attendee-team", `team-${attendee.team}`);
    teamSpan.textContent = attendee.teamName;

    listItem.appendChild(nameSpan);
    listItem.appendChild(teamSpan);
    attendeeList.appendChild(listItem);
  }
}

function loadCountsFromStorage() {
  const savedCount = localStorage.getItem("attendeeCount");
  const savedWater = localStorage.getItem("waterCount");
  const savedZero = localStorage.getItem("zeroCount");
  const savedPower = localStorage.getItem("powerCount");
  const savedAttendees = localStorage.getItem("attendeeList");

  if (savedCount !== null) {
    count = parseInt(savedCount);
  }

  if (savedWater !== null) {
    document.getElementById("waterCount").textContent = savedWater;
  }

  if (savedZero !== null) {
    document.getElementById("zeroCount").textContent = savedZero;
  }

  if (savedPower !== null) {
    document.getElementById("powerCount").textContent = savedPower;
  }

  if (savedAttendees !== null) {
    attendees = JSON.parse(savedAttendees);
  }

  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  const percentage = Math.round((count / maxCount) * 100) + "%";
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;

  renderAttendeeList();
}

loadCountsFromStorage();

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
  if (count <= maxCount) {
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    const attendeeCount = document.getElementById("attendeeCount");
    attendeeCount.textContent = count;
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage;

    //Update the Team counters
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    //Update attendee list
    attendees.push({ name: name, team: team, teamName: teamName });
    renderAttendeeList();

    //show welcome message
    const welcomeMessage = document.getElementById("greeting");
    welcomeMessage.textContent = `🥳Welcome, ${name}! You have checked in for the ${teamName}.`;
    welcomeMessage.classList.add("success-message");
    welcomeMessage.style.display = "block";

    localStorage.setItem("attendeeCount", count);
    localStorage.setItem(team + "Count", teamCounter.textContent);
    localStorage.setItem("attendeeList", JSON.stringify(attendees));
  } else {
    const winningTeamMessage = document.getElementById("greeting");
    winningTeamMessage.textContent = `🎉Congratulations to the ${teamName} for reaching the most Members!🏆`;
    winningTeamMessage.classList.add("success-message");
    winningTeamMessage.style.display = "block";
  }

  form.reset();
});
