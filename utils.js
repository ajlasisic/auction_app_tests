const generateRandomId = () => {
  let randomDecimal = Math.random();
  let randomNumberInRange = Math.floor(randomDecimal * (261 - 238 + 1)) + 238;
  return randomNumberInRange;
};

const generateRandomEmail = () => {
  let rndnum = Math.random();
  let emailValue = "random.test+" + rndnum + "@test.com";
  return emailValue;
};

const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

const verifyObjectPropertiesExist = (object, properties) => {
  properties.forEach((property) => {
    expect(object[property]).toExist();
  });
};

const verifyToEqual = async (first, second) => {
  await expect(first).toEqual(second);
};

const generateHigherBid = async (selector) => {
  let bid = await convertPriceToNumber(selector)
  let newBid = bid + 1;
  return newBid
};
const convertPriceToNumber = async (selector) => {
  let price = ''
  price = await (await selector).getText()
  let priceValue;
  priceValue = Number(price.replace('$', ''))
  return priceValue;
}
/* waitForStableDOM() attempts to see if DOM of the page to be stable and loaded.
   *  It checks if the DOM has been stable by triggering reading it multiple times over a
   *  certain interval, with the goal of it matching by predefined number of times consecutively.
   */
const waitForStableDOM = async ({ timeout = 25000, interval = 2000, consecutiveUnchangedPageTries = 3 }) => {
  console.log(
    `Expecting the DOM to match ${consecutiveUnchangedPageTries} times, every ${
      interval / 1000
    } seconds in period of ${timeout / 1000} seconds`
  )
  let unchangedCount = 0 // Counter for consecutive unchanged loops
  let initialDOM = await browser.execute(() => document.documentElement.outerHTML)
  await browser.waitUntil(
    async () => {
      await browser.pause(interval)
      let currentDOM = await browser.execute(() => document.documentElement.outerHTML)
      let isDOMStable = currentDOM === initialDOM
      initialDOM = currentDOM
      if (isDOMStable) {
        unchangedCount++
      } else {
        unchangedCount = 0
      }
      if (unchangedCount >= consecutiveUnchangedPageTries) {
        console.log(`DOM is stable.`)
        return true
      }
    },
    {
      timeout: timeout,
      interval: interval,
      timeoutMsg: 'DOM remained unstable for too long',
    }
  )
}

export {
  generateRandomId,
  generateRandomEmail,
  generateRandomPassword,
  verifyObjectPropertiesExist,
  verifyToEqual,
  generateHigherBid,
  convertPriceToNumber,
  waitForStableDOM
};
