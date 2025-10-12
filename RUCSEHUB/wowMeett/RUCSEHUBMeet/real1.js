// Home and About button functionality
document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "https://rucsehubapp.netlify.app/";
});

document.getElementById("aboutBtn").addEventListener("click", () => {
  alert("RUCSEHUB Meet is a virtual classroom platform designed for CSE students to collaborate in real-time. Powered by RUCSEHUB Mobile App.");
});

// Form submission to Google Sheets
const form = document.getElementById('meetingForm');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const scriptURL = "https://script.google.com/macros/s/AKfycbyMjLSMIqngMI6Xd4aNHw_X1UtaqK-5XPRHBe4GAS7_7mxdG298380Hmc4jdH6rbWQK/exec";

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Show loading state
  submitText.textContent = "Processing...";
  submitSpinner.classList.remove('d-none');
  submitBtn.disabled = true;

  const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
hours = String(hours).padStart(2, '0');

const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();

const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;


      const data = {
        name: form.name.value,
        id: form.id.value,
        date: formattedDateTime // dd-mm-yyyy HH:MM:SS
      };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if(response.status === 'success') {
      message.textContent = "Data saved successfully! Redirecting to meeting...";
      message.style.color = "green";
      
      // Hide form and show Jitsi container after successful submission
      setTimeout(() => {
        document.getElementById("user-form").style.display = "none";
        document.querySelector("footer").style.display = "none";
        const jaasContainer = document.getElementById("jaas-container");
        jaasContainer.style.display = "block";
        jaasContainer.style.height = "100vh";

        // Initialize Jitsi meeting
        initializeJitsiMeeting(form.name.value, form.id.value);
      }, 1500);
    } else {
      message.textContent = "Error: " + response.message;
      message.style.color = "red";
      resetSubmitButton();
    }
  })
  .catch(err => {
    message.textContent = "Error: " + err;
    message.style.color = "red";
    resetSubmitButton();
  });
});

function resetSubmitButton() {
  submitText.textContent = "Join Meeting";
  submitSpinner.classList.add('d-none');
  submitBtn.disabled = false;
}

function initializeJitsiMeeting(name, studentId) {
  const domain = "8x8.vc";
  const options = {
    roomName:
      "vpaas-magic-cookie-c6f623b736374f419f0abea7115f92d5/RUCSEHUBMainRoom",
    parentNode: document.getElementById("jaas-container"),
    width: "100%",
    height: "100%",
    userInfo: {
      displayName: name + " (" + studentId + ")",
    },
    interfaceConfigOverwrite: {
      TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "desktop",
        "fullscreen",
        "chat",
        "raisehand",
        "tileview",
        "hangup",
      ],
      SHOW_JITSI_WATERMARK: false,
      SHOW_BRAND_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      DEFAULT_REMOTE_DISPLAY_NAME: "Guest",
      DEFAULT_LOCAL_DISPLAY_NAME: name,
    },
    configOverwrite: {
      prejoinPageEnabled: true,
      disableDeepLinking: true,
    },
  };

  const api = new JitsiMeetExternalAPI(domain, options);

  // Create icon buttons
  const leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.className = "meeting-btn";
  leaveBtn.innerHTML = '<i class="bi bi-box-arrow-right fs-4"></i>';
  leaveBtn.title = "Leave Meeting";

  const endBtn = document.createElement("button");
  endBtn.id = "endBtn";
  endBtn.className = "meeting-btn";
  endBtn.innerHTML = '<i class="bi bi-power fs-4"></i>';
  endBtn.title = "End Meeting";

  document.body.appendChild(endBtn);
  document.body.appendChild(leaveBtn);

  // Leave Meeting
  leaveBtn.addEventListener("click", () => {
    api.executeCommand("hangup");
    window.location.href = "https://rucsehubapp.netlify.app/";
  });

  // End Meeting
  endBtn.addEventListener("click", () => {
    api.executeCommand("hangup");
    window.location.href = "https://rucsehubapp.netlify.app/";
  });

  // Resize fix
  window.addEventListener("resize", () => {
    api.resizeLargeVideo();
  });
}