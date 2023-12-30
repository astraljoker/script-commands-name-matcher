const { exec } = require("child_process");

function openBrowser(url) {
  switch (process.platform) {
    case "darwin":
      exec(`open ${url}`);
      break;
    case "win32":
      exec(`start ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
      break;
  }
}

function checkDistance(a, b) {
  if (a.startsWith(b)) {
    return 0;
  }

  const matrix = [];
  let i, j;

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}


class NameMatcher {
  constructor(alias, data) {
    this.alias = alias;
    this.data = data;
  }

  getAlias() {
    return this.alias;
  }

  getData() {
    return this.data;
  }

  static getBestMatch(query, candidatesList) {
    let closestMatch = null;
    let smallestDistance = Infinity;

    for (const candidate of candidatesList) {
      const distance = checkDistance(
        query,
        candidate.alias || candidate.data
      );
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = candidate;
      }
    }

    if (!closestMatch) {
      throw new Error("No matching names found.");
    }

    return closestMatch;
  }
}

module.exports = {
  openBrowser,
  NameMatcher
};