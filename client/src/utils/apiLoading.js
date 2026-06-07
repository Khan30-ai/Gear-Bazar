let activeRequests = 0;
let setLoadingState = null;

const updateLoadingState = () => {
  if (setLoadingState) {
    setLoadingState(activeRequests > 0);
  }
};

export function registerLoadingSetter(setter) {
  setLoadingState = setter;
  updateLoadingState();
}

export function startNetworkRequest() {
  activeRequests += 1;
  updateLoadingState();
}

export function stopNetworkRequest() {
  activeRequests = Math.max(0, activeRequests - 1);
  updateLoadingState();
}

export function resetNetworkRequests() {
  activeRequests = 0;
  updateLoadingState();
}
