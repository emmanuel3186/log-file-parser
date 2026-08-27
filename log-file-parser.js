import readline from 'node:readline/promises';
import {stdin as input, stdout as output, title} from 'node:process';
import fs from 'fs/promises';
import path from 'path';
import { timeStamp } from 'node:console';
import { mkdir } from 'node:fs/promises';
import { access } from 'node:fs';
function parseLine(line){
  let regex = /(?<timestamp>\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2})[^\w]*(?<level>ERROR|WARN|INFO|CRITICAL)[^\w]+(?<message>.*)/i;
  const match = line.match(regex);
  if(match && match.groups){
    return{
      timestamp: match.groups.timestamp,
      level: match.groups.level.toUpperCase(),
      message: match.groups.message.trim()
    };
  }
  else{
    return null;
  }
}
async function parseLogFile(){
  let rl = readline.createInterface({input, output });
  let rawPath = await rl.question("Enter log file path (e.g, anything.log): ");
  let filePath = rawPath.trim().replace(/^["']|["']$/g, '');
  if(!fs.access(filePath)){
    console.log("Error: File does not exist.")
  }
  try{
    let rawData = await fs.readFile(filePath, 'utf-8');
    let lines = rawData.split(/\r?\n/);
    let errorStats = { ERROR: 0, WARN: 0, CRITICAL: 0}
    let errorLogs = [];
    for(let line of lines){
      let parsed = parseLine(line);
      console.log(parsed);
      if(parsed != null){
        if(parsed && errorStats.hasOwnProperty(parsed.level)){
          errorStats[parsed.level]++;
          errorLogs.push(parsed);
        }
      }
    }
    let timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let reportContent = '';
    if (errorLogs.length === 0) {
      console.log("\nScan completed! No errors, warnings, or critical issues found.");
      reportContent = `# System Status Report
            **Generated:** ${new Date().toLocaleString()}
          ## Summary
              * **Status:** Completed
              * **Issues Found:** 0
          No errors or critical logs were detected in this run.`;
    } else {
      console.log(`\nScan completed. Found ${errorLogs.length} issues.`);
      reportContent = `# System Status Report
      **Generated:** ${new Date().toLocaleString()}
      ## Error Breakdown
      * **Errors:** ${errorStats.ERROR}
      * **Warnings:** ${errorStats.WARN}
      * **Critical:** ${errorStats.CRITICAL}
      ## Detailed Logs\n` + errorLogs.map(log => `- [${log.timestamp}] [${log.level}]: ${log.message}`).join('\n');
    }
    await fs.mkdir("reports", {recursive: true});
    let outputPath = "reports/report_" + timestamp + ".md"
    await fs.writeFile(outputPath, reportContent)
    console.log("Successfully parsed log file!");
    console.log("Found " + errorLogs.length + " total issues.");
    console.log("Report saved to: " + outputPath);
  }catch(error){
    console.error("Failed to process log file: " + error.message)
  }
  finally{
    rl.close()
  }
}
parseLogFile();