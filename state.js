var string_keys = ["name"];
var int_keys = ["snowLevel", "flakeFallSpeed", "flakePayload", "lump3","lump2","lump1", "discoveries", "researchIndex"];
var state = {};
function loadState() {
  if(!localStorage.getItem("snow.snowLevel"))
    resetState();
  for(var i = 0; i < string_keys.length; i++) {
    state[string_keys[i]] = window.localStorage.getItem("snow." + string_keys[i]);
  }
  for(var j = 0; j < int_keys.length; j++) {
    state[int_keys[j]] = parseFloat(window.localStorage.getItem("snow." + int_keys[j]));
  }
  var loadedObjs = JSON.parse(localStorage.getItem("snow.drawObjects"));
  if(loadedObjs) {
    for(i = 0; i < loadedObjs.length; i++) {
      if(!loadedObjs[i].klass)
        continue;
      var klass = eval(loadedObjs[i].klass); // oh god why
      var newObj = new klass();
      for(var prop in loadedObjs[i]) {
        newObj[prop] = loadedObjs[i][prop];
      }
      drawObjects.push(newObj);
      if(klass == "Stick")
        sticks.push(newObj);
    }
  }
}
function saveState() {
  for(var i = 0; i < string_keys.length; i++) {
    localStorage.setItem("snow." + string_keys[i], state[string_keys[i]]);
  }
  for(var j = 0; j < int_keys.length; j++) {
    localStorage.setItem("snow." + int_keys[j], state[int_keys[j]]);
  }
  for(i = 0; i < drawObjects.length; i++) {
    drawObjects[i].klass = drawObjects[i].constructor.name;
  }
  localStorage.setItem("snow.drawObjects", JSON.stringify(drawObjects));
}
function resetState() {
  state.snowLevel = 0;
  state.flakeFallSpeed = 2;
  state.flakePayload = 0.3;
  state.lump3 = null;
  state.lump2 = null;
  state.lump1 = null;
  state.discoveries = 0;
  state.name = "Snowland";
  state.researchIndex = 0;

  drawObjects = [];

  saveState();
}
