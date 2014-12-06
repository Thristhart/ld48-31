var string_keys = ["name"];
var int_keys = ["snowLevel", "flakeFallSpeed", "flakePayload", "lump3","lump2","lump1"];
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
}
function saveState() {
  for(var i = 0; i < string_keys.length; i++) {
    localStorage.setItem("snow." + string_keys[i], state[string_keys[i]]);
  }
  for(var j = 0; j < int_keys.length; j++) {
    localStorage.setItem("snow." + int_keys[j], state[int_keys[j]]);
  }
}
function resetState() {
  state.snowLevel = 0;
  state.flakeFallSpeed = 2;
  state.flakePayload = 0.1;
  state.lump3 = null;
  state.lump2 = null;
  state.lump1 = null;
  state.name = "Snowland";

  saveState();
}
