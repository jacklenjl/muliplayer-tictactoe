const pubnub = new PubNub({
  publishKey: "pub_nub_key",
  subscribeKey: "pub_nub_key"
});
pubnub.subscribe({
  channels: ["my_channel"]
});
pubnub.addListener({
  message: pubnubMessage => {
    console.log("New Message:", pubnubMessage.message);
    let boxPos = pubnubMessage.message;
    console.log("this pubnub", grid[boxPos.indexVal]);
    grid[boxPos.indexVal].innerHTML = boxPos.innerVal;
    grid[boxPos.indexVal].removeEventListener("click", onO);
    winCheck();
  }
});

function onO(event) {
  const box = event.currentTarget;

  box.innerHTML = "o";
  let boxPos = { indexVal: box.dataset.index, innerVal: box.innerHTML };
  // console.log("the box is:",box.dataset.index)
  console.log("the box is:", boxPos);
  pubnub.publish({
    message: boxPos,
    channel: "my_channel"
  });
  winCheck();
}

function winCheck() {
  const winnerHead = document.querySelector("h2");
  const winVal =
    checkWinner(0, 1, 2) ||
    checkWinner(3, 4, 5) ||
    checkWinner(6, 7, 8) ||
    checkWinner(0, 3, 6) ||
    checkWinner(1, 4, 7) ||
    checkWinner(2, 5, 8) ||
    checkWinner(0, 4, 8) ||
    checkWinner(2, 4, 6);
  console.log("winVal is:", winVal);
  if (winVal === "x") winnerHead.textContent = "the x win";
  else if (winVal === "o") winnerHead.textContent = "the o win";
  else winnerHead.textContent = "";
}

function checkWinner(one, two, three) {
  console.log("GRID:", grid[one], grid[two], grid[three]);
  if (
    grid[one].innerHTML !== "" &&
    grid[one].innerHTML === grid[two].innerHTML &&
    grid[one].innerHTML === grid[three].innerHTML
  ) {
    return grid[one].innerHTML;
  }
  return;
}
const reloadButton = document.querySelector("button");
reloadButton.addEventListener("click", reloadEvent => {
  location.reload(true);
});

const grid = document.querySelectorAll("#grid h1");
console.log("the grid is:", grid);
for (let box of grid) box.addEventListener("click", onO);
