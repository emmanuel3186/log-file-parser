# Log File Parser & Error Reporter CLI

A lightweight, asynchronous Node.js Command Line Interface (CLI) utility that parses application and system log files, categorizes issue severity levels using Regular Expressions, and exports structured status reports in Markdown format.

## Features

* **Asynchronous File Processing:** Leverages Node.js `fs/promises` and line-by-line regex scanning for memory-efficient handling.
* **Regex-Driven Parsing:** Extracts structured data (timestamps, levels, and messages) using named capture groups.
* **Smart Severity Filtering:** Detects and categorizes `ERROR`, `WARN`, and `CRITICAL` log events while ignoring standard telemetry.
* **Cross-Platform Compatibility:** Handles both Unix (`\n`) and Windows (`\r\n`) line endings seamlessly.
* **Auto-Generated Diagnostics:** Exports detailed Markdown reports containing log metrics and timestamped error traces into a `/reports` directory.

## Project Structure

```text
log-file-parser/
├── log-file-parser.js   # Main CLI application script
├── package.json         # Project metadata and ES module configuration
├── reports/             # Auto-generated Markdown diagnostic reports
└── README.md            # Project documentation
```

## Installation & Setup
Clone the repository:

```bash
git clone https://github.com/emmanuel3186/log-file-parser.git
cd log-file-parser
```
Ensure Node.js is installed:
This project uses native ES modules ("type": "module"), requiring Node.js v14 or higher.

## Usage
1. **Run the parser directly via Node.js:
```bash
node log-file-parser.js
```

Enter target path when prompted:
```text
Enter log file path (e.g., app.log): app.log
```
## Sample Output Report
```markdown
# System Status Report
**Generated:** 27/08/2026, 16:35:58

## Error Breakdown
* **Errors:** 162
* **Warnings:** 0
* **Critical:** 0

## Detailed Logs
- [2026-07-27 01:41:13] [ERROR]: DISM API: PID=20640 TID=19092 Time_InternalToPublic failed - Time_InternalToPublic(hr:0x80070057)
```

## Tech Stack
**Runtime:** Node.js

**Modules:** Native ES Modules (fs/promises, readline/promises, path)

**Language:** JavaScript (ES6+)

## License
ISC