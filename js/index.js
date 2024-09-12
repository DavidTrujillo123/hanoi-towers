import { Towers } from "./towers.mjs";

let $nDisksSelect = document.getElementById("nDisksSelect").value;
const $AtowerTag = document.getElementById("AtowerTag");
const $BtowerTag = document.getElementById("BtowerTag");
const $CtowerTag = document.getElementById("CtowerTag");
const $btnCreate = document.getElementById("btnCreate");
const $btnAutoSolve = document.getElementById("btnAutoSolve");
const $btnReset = document.getElementById("btnReset");
const $stepsTag = document.getElementById("stepsTag");
const $stepsRecomendedTag = document.getElementById("stepsRecomendedTag");

let towers = new Towers($nDisksSelect, $stepsTag, $AtowerTag, $BtowerTag, $CtowerTag);

$stepsRecomendedTag.textContent = `Steps Recomended: ${towers.getStepsRecomended()}`;

function towerActions(towerPrime, towerSec, towerTri) {
  towers.handleTowerDiskActions(towerPrime, towerSec, towerTri);
  towers.checkWin();
}

function setDisableBtns(flag){
  $btnAutoSolve.disabled = flag;
  $btnCreate.disabled = flag;
  $btnReset.disabled = flag;
}

$AtowerTag.addEventListener("click", () => {
  towerActions(towers.getTowerA(), towers.getTowerB(), towers.getTowerC());
});
$BtowerTag.addEventListener("click", () => {
  towerActions(towers.getTowerB(), towers.getTowerA(), towers.getTowerC());
});
$CtowerTag.addEventListener("click", () => {
  towerActions(towers.getTowerC(), towers.getTowerA(), towers.getTowerB());
});
$btnAutoSolve.addEventListener("click", async () => {
  let text = "To auto solve you need restart!\nOK or Cancel.";
  if (confirm(text)) {
    towers.reset();
    setDisableBtns(true);
    await towers.autoSolve();
    setDisableBtns(false);
  }
});
$btnReset.addEventListener("click", () => {
  towers.reset();
});
$btnCreate.addEventListener("click", () => {
  towers.resetAll();
  $nDisksSelect = document.getElementById("nDisksSelect").value;
  towers = new Towers($nDisksSelect, $stepsTag, $AtowerTag, $BtowerTag, $CtowerTag);
  $stepsRecomendedTag.textContent = `Steps recomended: ${towers.getStepsRecomended()}`;
});
