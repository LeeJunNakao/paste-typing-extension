const waitFor = (milliseconds) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });

const getHumanizedTypingInterval = () => {
  const randomElement = Math.random();
  const minInterval = 20;
  const maxInterval = 150;

  const interval = Math.ceil(
    minInterval + (maxInterval - minInterval) * randomElement
  );

  return interval;
};

const contextState = {
  openMenuTarget: undefined,
};

const typeAdigit = (key, target) => {
  const events = [
    new KeyboardEvent("keypress", {
      key,
      bubbles: true,
    }),
    new KeyboardEvent("keydown", {
      key,
      bubbles: true,
    }),
    new InputEvent("input", {
      key,
      bubbles: true,
    }),
    new KeyboardEvent("keyup", {
      key,
      isTrusted: true,
    }),
  ];

  events.forEach((e) => {
    target.dispatchEvent(e);
  });
  target.value = `${target.value}${key}`;
};

async function pasteTyping() {
  const clipboardText = await navigator.clipboard.readText();

  for (char of clipboardText) {
    typeAdigit(char, contextState.openMenuTarget);
    await waitFor(getHumanizedTypingInterval());
  }
}

window.onload = () => {
  chrome.runtime.onMessage.addListener(function (response, sendResponse) {
    pasteTyping();
  });

  document.addEventListener("contextmenu", function (event) {
    contextState.openMenuTarget = event.target;
  });
};
