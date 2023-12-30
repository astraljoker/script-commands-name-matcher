#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title google
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 😎
// @raycast.argument1 { "type": "text", "placeholder": "mail" }

const { NameMatcher, openBrowser } = require("./library");

const projectCandidates = [
  new NameMatcher("mail", "mail.google.com"),
  new NameMatcher("drive", "drive.google.com"),
  new NameMatcher("cal", "calendar.google.com"),
];

let [projectInput] = process.argv.slice(2);

try {
  const matchedProject = NameMatcher.getBestMatch(
    projectInput,
    projectCandidates
  );

  const url = `https://${matchedProject.getData()}`;
  openBrowser(url);
} catch (error) {
  console.error("An error occurred:", error.message);
}