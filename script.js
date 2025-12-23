// 1️⃣ Generate steps for Binary Search
function binarySearchSteps(arr, target) {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;

  if (arr.length === 0) {
    steps.push({
      array: [],
      left: -1,
      mid: -1,
      right: -1,
      message: "Array is empty."
    });
    return steps;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      left,
      mid,
      right,
      message: `Checking middle element ${arr[mid]} at index ${mid}`
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        left: mid,
        mid,
        right: mid,
        message: `Target ${target} found at index ${mid} 🎯`
      });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        left: mid + 1,
        mid,
        right,
        message: `Target is greater than ${arr[mid]}, move left to mid + 1`
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        left,
        mid,
        right: mid - 1,
        message: `Target is smaller than ${arr[mid]}, move right to mid - 1`
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    left: -1,
    mid: -1,
    right: -1,
    message: `Target ${target} not found`
  });

  return steps;
}

// 2️⃣ Render a single step
function render(step) {
  const container = document.getElementById("arrayContainer");
  container.innerHTML = "";

  step.array.forEach((value, index) => {
    const div = document.createElement("div");
    div.className = "box";
    div.innerText = value;

    if (index === step.left) div.classList.add("left");
    if (index === step.mid) div.classList.add("mid");
    if (index === step.right) div.classList.add("right");

    container.appendChild(div);
  });

  document.getElementById("status").innerText = step.message;
}

// 3️⃣ Controller to play steps
function start() {
  const rawArray = document.getElementById("arrayInput").value.trim();
  const rawTarget = document.getElementById("targetInput").value.trim();
  const status = document.getElementById("status");

  if (!rawArray || !rawTarget) {
    status.innerText = "Please enter both array and target.";
    return;
  }

  const arr = rawArray.split(",").map(x => Number(x.trim())).filter(x => !Number.isNaN(x));
  const target = Number(rawTarget);

  if (Number.isNaN(target)) {
    status.innerText = "Target must be a valid number.";
    return;
  }

  const steps = binarySearchSteps(arr, target);
  let i = 0;

  if (steps.length === 0) {
    status.innerText = "No steps generated.";
    return;
  }

  render(steps[0]);

  const interval = setInterval(() => {
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      return;
    }
    render(steps[i]);
  }, 1000);
}
