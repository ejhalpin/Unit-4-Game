var rulesButton = $("#rulesButton");
var rulesDiv = $("#rules");
rulesDiv.detach();

var container = $(".container");
container.toggleClass("center");

var newTrade = $("#newTradeButton");
var tradeValue = $("#trade-value");
var resources = [$("#r1"), $("#r2"), $("#r3"), $("#r4")];
var resourceValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var assignedValues = [0, 0, 0, 0];
var trading = false;
var wins = 0;
var losses = 0;
var targetTrade = 0;
var yourTrade = 0;
var hasText = false;
var items = [
  { name: "apple", src: "assets/images/items/apple.png" },
  { name: "beans", src: "assets/images/items/beans.png" },
  { name: "beet", src: "assets/images/items/beet.png" },
  { name: "book", src: "assets/images/items/book.png" },
  { name: "bread", src: "assets/images/items/bread.png" },
  { name: "bucket_lava", src: "assets/images/items/bucket_lava.png" },
  { name: "bucket_water", src: "assets/images/items/bucket_water.png" },
  { name: "cake", src: "assets/images/items/cake.png" },
  { name: "carrot", src: "assets/images/items/carrot.png" },
  { name: "clownfish", src: "assets/images/items/clownfish.png" },
  { name: "cooked_chicken", src: "assets/images/items/cooked_chicken.png" },
  { name: "cooked_fish", src: "assets/images/items/cooked_fish.png" },
  { name: "cookie", src: "assets/images/items/cookie.png" },
  { name: "diamond", src: "assets/images/items/diamond.png" },
  { name: "emerald", src: "assets/images/items/emerald.png" },
  { name: "gold", src: "assets/images/items/gold.png" },
  { name: "hide", src: "assets/images/items/hide.png" },
  { name: "iron", src: "assets/images/items/iron.png" },
  { name: "lapas", src: "assets/images/items/lapas.png" },
  { name: "melon", src: "assets/images/items/melon.png" },
  { name: "potato", src: "assets/images/items/potato.png" },
  { name: "puffer", src: "assets/images/items/puffer.png" },
  { name: "quartz", src: "assets/images/items/quartz.png" },
  { name: "raw_mutton", src: "assets/images/items/raw_mutton.png" },
  { name: "salmon", src: "assets/images/items/salmon.png" },
  { name: "soup", src: "assets/images/items/soup.png" },
  { name: "stick", src: "assets/images/items/stick.png" },
  { name: "sugar", src: "assets/images/items/sugar.png" },
  { name: "wheat", src: "assets/images/items/wheat.png" }
];
//listeners
rulesButton.on("click", function() {
  var visible = container.children().length === 2;
  if (visible) {
    rulesDiv.detach();
  } else {
    rulesDiv.prependTo(container);
  }
  container.toggleClass("center");
});

newTrade.on("click", function() {
  trading = true;
  loadResources();
  $("#your-trade").text(0);
  yourTrade = 0;
  targetTrade = Math.floor(Math.random() * 102) + 19;
  if (hasText) {
    tradeValue.toggleClass("text");
    hasText = false;
  }
  tradeValue.text(targetTrade);
  for (var i = 0; i < 4; i++) {
    var possibleValues = resourceValues.filter(compare);
    assignedValues[i] = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    resources[i].attr("value", assignedValues[i]);
  }
});

$(".resource").on("click", function(event) {
  if (!trading) {
    return;
  }
  var selectedDiv = $("#" + event.target.id);
  trade(selectedDiv.attr("value"));
});
//game play
function trade(value) {
  yourTrade += parseInt(value);
  $("#your-trade").text(yourTrade);
  if (yourTrade > targetTrade) {
    //you lose
    tradeValue.toggleClass("text");
    hasText = true;
    tradeValue.text("You have exceeded the trade value. You lost this trade.");
    losses++;
    updateStats();
    trading = false;
  } else if (yourTrade == targetTrade) {
    //you win
    tradeValue.toggleClass("text");
    hasText = true;
    tradeValue.text("You have matched the trade value. You won this trade.");
    wins++;
    updateStats();
    trading = false;
  }
}

//methods
function compare(val) {
  return !assignedValues.includes(val);
}

function removeListeners() {
  resources.forEach(function(element) {
    element.off("click");
  });
}

function updateStats() {
  $("#wins").text(wins);
  $("#losses").text(losses);
}

function loadResources() {
  //shuffle the items
  items.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  $.each(resources, function(index, value) {
    value.attr("src", items[index].src);
    value.attr("alt", items[index].name);
  });
}
