function openTeamSheetWindow() {
  let usernameText = document.querySelector(".usernametext").textContent.trim();
  let opponentName = "";

  let pasteText = "";

  let detailElements = document.querySelectorAll(".infobox > details");
  let detailArray = [...detailElements];
  let selectedDetail = null;
  detailArray.forEach((detail) => {
    let detailSummary = detail.firstChild;
    if (!detailSummary.textContent.includes(usernameText)) {
      selectedDetail = detail;
      opponentName = detailSummary.textContent.substring(20);
    }
  });

  let children = selectedDetail.childNodes;
  let startIndex = 0;
  while (children[startIndex].nodeName != "BR") {
    startIndex++;
  }
  startIndex++;

  let lastNodeBR = false;
  for (var i = startIndex; i < children.length; i++) {
    var child = children[i];

    if (child.nodeName == "#text") {
      if (child.textContent != "  ") {
        pasteText += child.textContent.trim();
        lastNodeBR = false;
      }
    }
    if (child.nodeName == "BR" && !lastNodeBR) {
      pasteText += "%0D%0A";
      lastNodeBR = true;
    } else if (child.nodeName == "BR") {
      lastNodeBR = false;
    }
  }

  let title = opponentName + "'s Showdown OTS";

  window
    .open(
      "https://pokepast.es/create?paste=" + pasteText + "&title=" + title,
      "_blank"
    )
    .focus();
}

let viewButton = document.createElement("button");
viewButton.classList.add("icon", "button");
viewButton.setAttribute("name", "viewSheetButton");
viewButton.textContent = "View Team Sheet";
viewButton.style.marginLeft = "10px";
viewButton.addEventListener("click", openTeamSheetWindow);

window.navigation.addEventListener("navigate", (event) => {
  let viewSheetButtons = document.querySelectorAll(
    "button[name='viewSheetButton']"
  );

  viewSheetButtons.forEach((button) => {
    button.remove();
  });

  let battleButtons = document.querySelectorAll(
    "button[name='openBattleOptions']"
  );

  let battleButtonArray = [...battleButtons];
  battleButtonArray.forEach((button) => {
    let newViewButton = document.createElement("button");
    newViewButton.classList.add("icon", "button");
    newViewButton.setAttribute("name", "viewSheetButton");
    newViewButton.textContent = "View Team Sheet";
    newViewButton.style.marginLeft = "10px";
    newViewButton.addEventListener("click", openTeamSheetWindow);

    let parentDiv = button.parentElement;
    parentDiv.appendChild(newViewButton);
  });
});

let battleButton = document.querySelector("button[name='openBattleOptions']");
let parentDiv = battleButton.parentElement;
parentDiv.appendChild(viewButton);
