// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function reset(launchChecks)
{
   launchChecks.faultyItems.style.visibility = "hidden";
   launchChecks.cargoStatus.innerHTML = `Cargo mass low enough for launch`;
   launchChecks.fuelStatus.innerHTML = `Fuel level high enough for launch`;
   launchChecks.launchStatus.innerHTML = `Awaiting Information Before Launch`;
   launchChecks.pilotStatus.innerHTML = `Pilot Ready`;
   launchChecks.copilotStatus.innerHTML = `Co-pilot Ready`;
   launchChecks.launchStatus.style.color = "black";
}

window.addEventListener("load", function(){
   let pilotName = document.querySelector("input[name=pilotName]");
   let coPilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let launchChecks = {
      "pilotStatus":document.getElementById("pilotStatus"),
      "copilotStatus":document.getElementById("copilotStatus"),
      "faultyItems":document.getElementById("faultyItems"),
      "fuelStatus":document.getElementById("fuelStatus"),
      "cargoStatus":document.getElementById("cargoStatus"),
      "launchStatus":document.getElementById("launchStatus")
   };
   document.querySelector("form").addEventListener("submit", function(event){
      event.preventDefault();
      if(pilotName.value === "" || coPilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "")
      {
         reset(launchChecks);
         alert("ALL FIELDS REQUIRED!");
      }
      else
      {
         if(isNaN(pilotName.value) && isNaN(coPilotName.value) && !isNaN(fuelLevel.value) && !isNaN(cargoMass.value))
         {
            reset(launchChecks);
            launchChecks.pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
            launchChecks.copilotStatus.innerHTML = `Co-pilot ${coPilotName.value} is ready for launch`;

            if(Number(fuelLevel.value)>=10000&&Number(cargoMass.value)<=10000)
            {
               launchChecks.launchStatus.innerHTML = `Shuttle is ready for launch`;
               launchChecks.launchStatus.style.color = "green";
            }
            else
            {
               launchChecks.launchStatus.innerHTML = `Shuttle not ready for launch`;
               launchChecks.launchStatus.style.color = "red";
               launchChecks.faultyItems.style.visibility = "visible";
               if(Number(fuelLevel.value)<10000)
               {
                  launchChecks.fuelStatus.innerHTML = `Fuel level too low for launch`;
               }
               if(Number(cargoMass.value)>10000)
               {
                  launchChecks.cargoStatus.innerHTML = `Too much mass for the shuttle to take off`;
               }
            }
         }
         else
         {
            reset(launchChecks);
            alert("ONE OR MORE FIELDS NOT ENTERED CORRECTLY!");
         }
      }
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const div = document.getElementById("missionTarget");
         div.innerHTML = `
         <ol>
            <li>Name: ${json[0].name}</li>
            <li>Diameter: ${json[0].diameter}</li>
            <li>Star: ${json[0].star}</li>
            <li>Distance from Earth: ${json[0].distance}</li>
            <li>Number of Moons: ${json[0].moons}</li>
         </ol>
         <img src="${json[0].image}">
         `;
      })
   });
});