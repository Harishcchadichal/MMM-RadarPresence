const NodeHelper = require("node_helper");

const { SerialPort } = require("serialport");  // Updated import for newer versions of serialport



module.exports = NodeHelper.create({

  start: function() {

    console.log("MMM-RadarPresence helper started...");

    this.motionDetected = false;



    // Adjust the port path to match your operating system

    const port = new SerialPort({

      path: "/dev/ttyS0",  // Update to your correct COM port on Windows (e.g., COM3, COM4)

      baudRate: 115200,

    });



    // Handle errors from the serial port

    port.on("error", (err) => {

      console.log("SerialPort error:", err.message);

    });



    // Handle incoming data from the radar sensor

    port.on("data", (data) => {

      const rawData = data.toString().trim();

      console.log("Received raw data:", rawData);  // Log received data for debugging



      if (rawData.includes("mov") || rawData.includes("occ")) {

        // Example: "mov, 1 78"

        let parts = rawData.split(" ");  // Split the string to extract relevant data

        if (parts.length >= 2) {

          let zone = parseInt(parts[1], 10);  // Convert zone to an integer for comparison

          console.log("Detected Zone:", zone);  // Log the detected zone for debugging



          // If motion is detected in a close zone (0-2)

          if (zone < 2) {

            this.motionDetected = true;  // Motion is detected

          } else {

            this.motionDetected = false;  // No motion detected

          }



          // Send the motion detection status to the frontend

          this.sendSocketNotification("RADAR_UPDATE", this.motionDetected);

        }

      }

    });

  },



  // Respond to MagicMirror frontend requests

  socketNotificationReceived: function(notification, payload) {

    if (notification === "CHECK_RADAR") {

      // Send the latest motion data to the frontend

      this.sendSocketNotification("RADAR_UPDATE", this.motionDetected);

    }

  },

});
