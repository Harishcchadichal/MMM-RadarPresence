# MMM-RadarPresence

**MMM-RadarPresence** is a MagicMirror module that utilizes radar-based motion detection to control your MagicMirror. It detects motion using a radar sensor and updates the MagicMirror interface accordingly.

## Features
- **Motion Detection**: Uses a radar sensor to detect movement.
- **Easy Setup**: Simple to integrate with MagicMirror.
- **Real-Time Updates**: Updates motion status to MagicMirror in real-time.

## Installation

### 1. Install MagicMirror
If you haven't already set up MagicMirror, follow the instructions on the [MagicMirror GitHub](https://github.com/MichMich/MagicMirror) to install it.

### 2. Install the Module
1. Clone the repository to your `modules` directory of MagicMirror:
   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/Harishcchadichal/mmm-radarpresence.git
   ```

2. Navigate to the module directory:
   ```bash
   cd mmm-radarpresence
   ```

3. Install the required dependencies::
   ```bash
   npm install
   ```

4. Configure the module in the MagicMirror configuration file (`config.js`):
   ```javascript
   {
     module: "mmm-radarpresence",
     position: "top_right", // Adjust position as needed
     config: {
       // Add any necessary configurations (like port path, etc.)
     }
   }
   ```

### 3. Set Up Serial Port
Make sure your radar sensor is connected to the correct serial port (e.g., `/dev/ttyS0` on Raspberry Pi). Adjust the `path` in the module code accordingly for your platform (e.g., `COM3` on Windows).

### 4. Restart MagicMirror
Once everything is set up, restart MagicMirror to load the new module:
```bash
pm2 restart mm
```

## Usage
The module will automatically detect motion when the radar sensor is activated. You can adjust the motion detection threshold in the module's configuration if necessary.

## Configuration

Here is an example of how you can configure the module:

```javascript
{
  module: "mmm-radarpresence",
  position: "top_right",  // Position of the module on your MagicMirror
  config: {
    // Optional configuration for serial port
    port: "/dev/ttyS0",  // Change this to your actual port path
    baudRate: 115200,     // Set the appropriate baud rate for your radar sensor
  }
}
```

## Troubleshooting

1. **No Motion Detected**:
   - Ensure the radar sensor is properly connected to the serial port.
   - Check the sensor's output on the console to see if data is being received.

2. **Serial Port Errors**:
   - Ensure that the correct serial port is specified in the configuration file.
   - You might need to adjust permissions for accessing the serial port (`/dev/ttyS0` on Raspberry Pi).
## Authors
- [HarishChadichal](https://github.com/Harishcchadichal)
- [NikhilMalshetti](https://github.com/NikhilNMalshetti)


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the MagicMirror community for making this platform so awesome.
- The `serialport` package by [@serialport](https://github.com/serialport) is used for serial communication.
```
