document.addEventListener("DOMContentLoaded", function() {
  const welcome = document.getElementById("welcome");
  const welcomeHeader = document.getElementById("welcomeheader");
  const welcomeClose = document.getElementById("welcomeclose");
  const welcomeOpen = document.getElementById("welcomeopen");
  const timeElement = document.getElementById("timeElement");

  function updateTime() {
    const currentTime = new Date().toLocaleString();
    if (timeElement) {
      timeElement.textContent = currentTime;
    }
  }

  updateTime();
  setInterval(updateTime, 500);

  function dragElement(element, handle) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const dragHandle = handle || element;
    dragHandle.style.cursor = "move";

    function dragMouseDown(e) {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      document.addEventListener("mousemove", elementDrag);
      document.addEventListener("mouseup", stopDragging);
    }

    function elementDrag(e) {
      e.preventDefault();
      currentX = startX - e.clientX;
      currentY = startY - e.clientY;
      startX = e.clientX;
      startY = e.clientY;
      element.style.top = `${element.offsetTop - currentY}px`;
      element.style.left = `${element.offsetLeft - currentX}px`;
    }

    function stopDragging() {
      document.removeEventListener("mousemove", elementDrag);
      document.removeEventListener("mouseup", stopDragging);
    }

    dragHandle.addEventListener("mousedown", dragMouseDown);
  }

  function openWindow(element) {
    if (element) {
      element.style.display = "flex";
    }
  }

  function closeWindow(element) {
    if (element) {
      element.style.display = "none";
    }
  }

  if (welcome) {
    welcome.style.display = "flex";
    dragElement(welcome, welcomeHeader);
  }

  if (welcomeClose) {
    welcomeClose.addEventListener("click", function() {
      closeWindow(welcome);
    });
  }

  if (welcomeOpen) {
    welcomeOpen.addEventListener("click", function() {
      openWindow(welcome);
    });
  }
});
