function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function openTeamSheetWindow() {
  let pasteText = "";
  let detailElements = document.querySelectorAll(".infobox > details[open]");
  if (detailElements.length > 0) {
    if (detailElements.length == 1) {
      let detailArray = [...detailElements];

      detailArray.forEach((detail) => {
        detail.removeChild(detail.firstChild);

        let children = detail.childNodes;
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

        window
          .open("https://pokepast.es/create?paste=" + pasteText, "_blank")
          .focus();
      });
    } else {
      alert(
        "Please only open one dropdown of the team sheet you want to view."
      );
    }
  } else {
    alert("Please open a team sheet dropdown before clicking this!");
  }
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
