function createCountBox(title, id) {
  const boxDiv = document.createElement('div');
  boxDiv.classList.add('status-box');

  const titleHeading = document.createElement('h3');
  titleHeading.textContent = title;

  const countParagraph = document.createElement('p');
  countParagraph.id = id;
  countParagraph.textContent = '0';

  boxDiv.appendChild(titleHeading);
  boxDiv.appendChild(countParagraph);

  document.getElementById('count-boxes-container').appendChild(boxDiv);
}

function updateCountBox(id, count) {
  document.getElementById(id).textContent = count;
}

function connect() {
  // ... (existing WebSocket code)

  socket.onmessage = function (event) {
    console.log("Received Messsage : ", event);
    let data = JSON.parse(event.data);

    updateInterface(data);

    // Assuming you have 'disconnectedCount' and 'faultyCount' in your WebSocket data
    updateCountBox('disconnected-count', data.disconnectedCount);
    updateCountBox('faulty-count', data.faultyCount);
  }
}

// Function to update the conclusion boxes
function updateConclusionBoxes() {
  const disconnectedItems = document.querySelectorAll('.item.disconnected').length;
  const faultyItems = document.querySelectorAll('.item.faulty').length;

  // Update the conclusion boxes with the counts
  document.getElementById('disconnected-count').textContent = disconnectedItems;
  document.getElementById('faulty-count').textContent = faultyItems;
}

// Call the updateConclusionBoxes function whenever the item statuses change
// You can call this function in your existing code where you update item classes
// For example, after changing the class of an item:
// itemElement.classList.remove('disconnected');
// itemElement.classList.add('faulty');
// Call updateConclusionBoxes();



// Assuming your WebSocket function is already working to update HTML classes
// ...

// Function to update the conclusion box based on current HTML classes
function updateConclusionBox() {
  const deviceElements = document.querySelectorAll('.device'); // Assuming devices have the "device" class
  let connectedDevices = 0;
  let disconnectedDevices = 0;

  deviceElements.forEach((deviceElement) => {
    if (deviceElement.classList.contains('connected')) {
      connectedDevices++;
    } else if (deviceElement.classList.contains('disconnected')) {
      disconnectedDevices++;
    }
  });

  const connectedDevicesSpan = document.getElementById('connectedDevices');
  const disconnectedDevicesSpan = document.getElementById('disconnectedDevices');

  connectedDevicesSpan.textContent = connectedDevices;
  disconnectedDevicesSpan.textContent = disconnectedDevices;
}

// Call the updateConclusionBox function periodically to update the conclusion box
setInterval(updateConclusionBox, 1000); // Adjust the interval as needed


function updateConclusionBox() {
  const offlineElements = document.querySelectorAll('.offline');
  const offlineCount = offlineElements.length;

  const offlineDevicesSpan = document.getElementById('offlineDevices');
  offlineDevicesSpan.textContent = offlineCount;

  const faultElements = document.querySelectorAll('.fault');
  const faultCount = faultElements.length;

  const faultackedElements = document.querySelectorAll('.fault-acked');
  const faultackedCount = faultackedElements.length;

  const totalFaultCount = faultCount + faultackedCount;

  const totalDevicesSpan = document.getElementById('totalDevices');
  totalDevicesSpan.textContent = totalFaultCount;
}

function updateInterface(data) {
  let mroAlarmOverall = data.RSSMROalarmOverall;
  if (mroAlarmOverall == 0) {

  } else if (mroAlarmOverall == 1) {

  } else if (mroAlarmOverall == 2) {

  }
}


// let lmtMarker = document.getElementById('lmt'); //b
// let lmtAlarmOverall = data.MCCLMTalarmOverall; //s

// let lmtMarkerClass = '';
// if (lmtAlarmOverall === 1) {
//   lmtMarkerClass = 'okay';
// } else if (lmtAlarmOverall === 2) {
//   lmtMarkerClass = 'fault';
// } else if (lmtAlarmOverall === 3) {
//   lmtMarkerClass = 'fault-acked';
// } else {
//   lmtMarkerClass = 'Default';
// }
// lmtMarker.classList.remove('okay', 'fault', 'fault-acked', 'Default');
// lmtMarker.classList.add('marker', markerClass);



let lmtMarker = document.getElementById('lmt'); //b
let lmtAlarmOverall = data.MCCLMTalarmOverall; //s

lmtMarker.classList.remove('okay', 'fault', 'fault-acked', 'Default');
if (lmtAlarmOverall === 1) {
  lmtMarker.classList.add('marker', 'okay');
} else if (lmtAlarmOverall === 2) {
  lmtMarker.classList.add('marker', 'fault');
} else if (lmtAlarmOverall === 3) {
  lmtMarker.classList.add('marker', 'fault-acked');
} else {
  lmtMarker.classList.add('marker', 'Default');
}


