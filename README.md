
# vnStat Traffic Telegram Bot

A Telegram bot built using Node.js that exposes `vnstat` traffic data from a server. The bot uses the `node-telegram-bot-api` library and `vnstat` to monitor and report network traffic statistics.

## Features

- Retrieve real-time traffic data for network interfaces.
- Expose `vnstat` JSON data in a user-friendly format.
- Support for multiple network interfaces.
- Easy-to-use commands via Telegram.
- Simple, configurable setup with minimal dependencies.

## Requirements

Before running the bot, ensure you have the following installed on your system:

- **Node.js** (v12+)
- **npm** (Node Package Manager)
- **vnstat** (Network traffic monitor)
- A **Telegram Bot API Token** (you can get this by creating a bot via [BotFather](https://core.telegram.org/bots#botfather))

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saffari-m/vnstat_telegrambot.git
   cd vnstat_telegrambot
   ```

2. **Install dependencies**:
   Run the following command to install the required Node.js dependencies:
   ```bash
   npm install
   ```

3. **Configure the bot**:
   - Create a `.env` file in the root directory of the project.
   - Add your Telegram bot token to the `.env` file:
     ```bash
     TELEGRAM_TOKEN=your-telegram-bot-token
     ```

4. **Set up `vnstat`**:
   Make sure `vnstat` is installed on your system. You can install it with the following commands:

   **For Ubuntu/Debian**:
   ```bash
   sudo apt update
   sudo apt install vnstat
   ```

   **For CentOS/RHEL**:
   ```bash
   sudo yum install vnstat
   ```

5. **Run the bot**:
   You can now run the bot using:
   ```bash
   node bot.js
   ```

   Alternatively, you can run the bot in the background using a process manager like `pm2`:
   ```bash
   pm2 start bot.js
   ```

## Usage

Once the bot is running, you can interact with it via Telegram by sending the following commands:

- `/start` - Start the bot and see the welcome message.
- `/traffic` - Get traffic data for the default network interface.
- `/traffic eth0` - Get traffic data for the `eth0` interface.
- `/help` - Show available commands.

## Example Output

```
Traffic for eth0:
--------------------
Received: 1.23 GB
Sent: 456.78 MB
--------------------
```

## Customization

- **Default Interface**: You can set the default network interface to monitor in the configuration.
- **Poll Interval**: If you're using polling to check traffic data at intervals, you can modify the polling frequency in the bot code.

## Error Handling

If you encounter errors such as `ETELEGRAM: 409 Conflict`, make sure that only one instance of the bot is running at any time, or consider switching to a webhook-based update method.

## Troubleshooting

### 409 Conflict Error (Polling Issues)
If you encounter the `ETELEGRAM: 409 Conflict` error, it's likely that another instance of the bot is running, or the bot is being polled from multiple locations.

- To resolve, stop all bot instances and ensure only one instance is polling for updates.
- Consider switching to **webhooks** if you prefer not to use polling.

### Importing Existing `vnstat` Data
If you need to import existing `vnstat` data, you can generate and import traffic statistics using the `vnstat --import` command. The traffic data should be formatted correctly for `vnstat` to recognize it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
