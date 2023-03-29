// Prototype Code 

// Get Input
const departureAirport = prompt("Enter departure airport code:");
const departureDate = prompt("Enter departure date (YYYY-MM-DD):");

// Build URL for HTTP GET request, Not sure if this is correct. I would double check can find it on server interface slide
const url = `http://cs509.cs.wpi.edu:8181/CS509.server/ReservationSystem?team=TeamB&action=list&list_type=departing&airport=${departureAirport}&day=${departureDate}`;

// Send HTTP GET request
// fetch returns a promise that resolves when you get a response from server
fetch(url)
//converted to text using text() method
  .then(response => response.text())
  //takes text of response so that we can create domparser object as an XML doc
  .then(xmlString => {
    // Parse response
    const parser = new DOMParser();
    //store resulting XML doc as xmlDoc
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Extract flight information and display to user
    //getElementsByTagName gets collection of objects based on specified name 

    const flights = xmlDoc.getElementsByTagName("Flight");
    if (flights.length === 0) {
      console.log("No flights found.");
    } else {
      console.log(`${flights.length} flights found for ${departureAirport} on ${departureDate}:`);
      //for (initialization; condition; increment/decrement)
      //start at 0 loop through each while i is less than flights. increment 1 so that none of flights are missed
      for (let i = 0; i < flights.length; i+=1) {
        const flight = flights[i];
        const flightNumber = flight.getAttribute("Number");
        const airplaneType = flight.getAttribute("Airplane");
        const flightTime = flight.getAttribute("FlightTime");
        const departureCode = flight.getElementsByTagName("Departure")[0].getElementsByTagName("Code")[0].childNodes[0].nodeValue;
        const departureTime = flight.getElementsByTagName("Departure")[0].getElementsByTagName("Time")[0].childNodes[0].nodeValue;
        const arrivalCode = flight.getElementsByTagName("Arrival")[0].getElementsByTagName("Code")[0].childNodes[0].nodeValue;
        const arrivalTime = flight.getElementsByTagName("Arrival")[0].getElementsByTagName("Time")[0].childNodes[0].nodeValue;
        console.log(`Flight ${flightNumber} (${airplaneType}) from ${departureCode} to ${arrivalCode}, departure time ${departureTime}, arrival time ${arrivalTime}, flight time ${flightTime} minutes.`);
        //do We need all the flight information? It doesnt specify what information we need other than
      }
    }
  })
  .catch(error => console.log(`An error occurred: ${error}`));
