Module.register("MMM-RadarPresence", {
    defaults: {
      updateInterval: 5000, // Check radar every 10 seconds
    },
  
    start: function() {
      this.motionDetected = false;         // Current state
      this.lastMotionDetected = null;      // Previous state
      this.scheduleUpdate();               // Begin radar checks
    },
  
    scheduleUpdate: function() {
      setInterval(() => {
        this.sendSocketNotification("CHECK_RADAR");
      }, this.config.updateInterval);
    },
  
    socketNotificationReceived: function(notification, payload) {
      if (notification === "RADAR_UPDATE") {
        this.motionDetected = payload;
  
        // Only toggle standby if the detection state has changed
        if (this.lastMotionDetected !== this.motionDetected) {
          this.toggleStandby(this.motionDetected);
          this.lastMotionDetected = this.motionDetected;
        }
  
        this.updateDom();
      }
    },
  
    getDom: function() {
      const wrapper = document.createElement("div");
  
      if (this.motionDetected) {
        wrapper.innerHTML = "Motion Detected!";
        wrapper.className = "bright";
      } else {
        wrapper.innerHTML = "No Motion Detected";
        wrapper.className = "dimmed";
      }
  
      return wrapper;
    },
  
    // 👇 Toggle screen standby based on motion detection
    toggleStandby: function(motionDetected) {
      const bodyClass = document.body.className;
  
      if (!motionDetected && bodyClass !== "st-standby fade") {
        // No motion & not already off
        document.body.className = "st-standby fade";
      } else if (motionDetected && bodyClass !== "st-standby show") {
        // Motion detected & not already on
        document.body.className = "st-standby show";
        this.speak("Welcome to Trinity");
      }
    },
  
    // Optional: Voice feedback
    speak: function(message) {
      const utterance = new SpeechSynthesisUtterance(message);
      function setVoice() {
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.lang === 'en-US');
        if (selectedVoice) utterance.voice = selectedVoice;
        speechSynthesis.speak(utterance);
      }
  
      if (speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  });  