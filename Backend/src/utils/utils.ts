import { Page, ElementHandle, BrowserContext } from 'playwright';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomDelay(min: number, max: number): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return sleep(delay);
}

export function extractTextSafe(element: Element | null, defaultValue: string = ''): string {
  return element ? element.textContent?.trim() || defaultValue : defaultValue;
}

// Add these functions to your utils.js file to help with anti-detection

/**
 * Simulates more human-like scrolling behavior
 * @param page - Playwright page object
 * @param scrollDistance - Total distance to scroll
 * @param steps - Number of steps to divide the scroll into
 * @returns Promise<void>
 */
export async function humanLikeScroll(page: Page, scrollDistance = 800, steps = 10): Promise<void> {
  const stepDistance = scrollDistance / steps;

  for (let i = 0; i < steps; i++) {
    // Random pause between scroll steps
    await sleep(300 + Math.random() * 400);

    // Scroll with easing effect (slower at beginning and end)
    const easingFactor = Math.sin((i / steps) * Math.PI);
    const adjustedStep = stepDistance * (0.5 + easingFactor * 0.5);

    await page.evaluate((distance) => {
      window.scrollBy(0, distance);
    }, adjustedStep);
  }

  // Pause at the end of scrolling
  await sleep(500 + Math.random() * 1000);
}

/**
 * Simulates human-like typing behavior
 * @param page - Playwright page object
 * @param selector - CSS selector for the element to type into
 * @param text - Text to type
 * @returns Promise<void>
 */
export async function humanLikeTyping(page: Page, selector: string, text: string): Promise<void> {
  const element = await page.$(selector);
  if (!element) {
    throw new Error(`Element with selector ${selector} not found`);
  }

  await element.click();

  // Clear any existing text
  await element.fill('');

  // Type each character with a random delay
  for (const char of text) {
    await sleep(50 + Math.random() * 150); // Random delay between keystrokes
    await page.keyboard.type(char);
  }

  // Pause after typing is complete
  await sleep(300 + Math.random() * 500);
}

/**
 * Adds random mouse movements to make automation less detectable
 * @param page - Playwright page object
 * @returns Promise<void>
 */
export async function randomMouseMovements(page: Page): Promise<void> {
  const viewportSize = await page.viewportSize();
  if (!viewportSize) return;

  const { width, height } = viewportSize;

  // Generate 3-6 random points to move to
  const movementCount = 3 + Math.floor(Math.random() * 4);

  for (let i = 0; i < movementCount; i++) {
    const x = 100 + Math.floor(Math.random() * (width - 200));
    const y = 100 + Math.floor(Math.random() * (height - 200));

    await page.mouse.move(x, y, { steps: 10 }); // Move in steps for more natural movement
    await sleep(100 + Math.random() * 400);
  }
}

/**
 * Set a more realistic browser fingerprint to avoid detection
 * @param context - Playwright browser context
 * @returns Promise<void>
 */
export async function setRealisticFingerprint(context: BrowserContext): Promise<void> {
  // Set common browser properties
  await context.addInitScript(() => {
    // Override navigator properties to appear more like a real user
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });

    // Make navigator.plugins appear non-empty
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5].map(() => ({
        name: 'Chrome PDF Plugin',
        description: 'Portable Document Format',
        filename: 'internal-pdf-viewer',
        length: 1
      }))
    });

    // Set typical screen properties
    Object.defineProperty(window.screen, 'colorDepth', { value: 24 });

    // Make detection of automation more difficult
    Object.defineProperty(window, 'chrome', { get: () => ({ runtime: {} }) });

    // Prevent detection of automation features
    const originalQuery = window.navigator.permissions.query;
    // @ts-ignore
    window.navigator.permissions.query = (parameters) => {
      if (parameters.name === 'notifications') {
        return Promise.resolve({ state: "prompt" });
      }
      return originalQuery(parameters);
    };
  });
}

/**
 * Add randomized delays between actions to appear more human
 * @returns Promise<void>
 */
export function randomActionDelay(): Promise<void> {
  // Base delay plus random component
  const baseDelay = 1000; // 1 second base
  const randomComponent = Math.floor(Math.random() * 2000); // 0-2 seconds random
  return sleep(baseDelay + randomComponent);
}