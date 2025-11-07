/**
 * Test utilities for common operations
 */

/**
 * Wait for a specific time
 * @param {number} ms - Milliseconds to wait
 */
export async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an operation until it succeeds or max attempts reached
 * @param {Function} operation - Async function to retry
 * @param {number} maxAttempts - Maximum retry attempts (default: 3)
 * @param {number} delay - Delay between retries in ms (default: 1000)
 */
export async function retryOperation(operation, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      await wait(delay);
    }
  }
}

/**
 * Take a screenshot with a descriptive name
 * @param {Page} page - Playwright page object
 * @param {string} testName - Test name
 * @param {string} stepName - Step name
 * @param {string} folder - Output folder
 */
export async function takeScreenshot(
  page,
  testName,
  stepName,
  folder = "./e2e/flow-1-user-registration-login"
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${testName}__${stepName}__${timestamp}`;
  await page.screenshot({
    path: `${folder}/${filename}.png`,
    fullPage: true,
  });
  return filename;
}

/**
 * Clear browser storage (cookies, local storage, session storage)
 * @param {Page} page - Playwright page object
 */
export async function clearBrowserStorage(page) {
  await page.context().clearCookies();

  // Only clear storage if we're on a valid page with access to localStorage
  try {
    await page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // Ignore if localStorage is not accessible
        console.log("Storage not accessible yet");
      }
    });
  } catch (e) {
    // Ignore errors - storage may not be accessible yet
    console.log("Could not clear browser storage:", e.message);
  }
}

/**
 * Get console logs from the page
 * @param {Page} page - Playwright page object
 * @returns {Array} - Array of console messages
 */
export function captureConsoleLogs(page) {
  const logs = [];
  page.on("console", (msg) => {
    logs.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString(),
    });
  });
  return logs;
}

/**
 * Get network requests from the page
 * @param {Page} page - Playwright page object
 * @returns {Array} - Array of network requests
 */
export function captureNetworkRequests(page) {
  const requests = [];
  page.on("request", (request) => {
    requests.push({
      url: request.url(),
      method: request.method(),
      timestamp: new Date().toISOString(),
    });
  });
  return requests;
}
