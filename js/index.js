import { Towers } from "./towers.mjs";

let $nDisksInput = document.getElementById("nDisksInput").value;
const $btnCreate = document.getElementById("btnCreate");
const $ta = document.getElementById("ta");
const $tb = document.getElementById("tb");
const $tc = document.getElementById("tc");
const $btnAutoSolve = document.getElementById("btnAutoSolve");
const $btnReset = document.getElementById("btnReset");
const $stepsTag = document.getElementById("stepsTag");
const $stepsRecomendedTag = document.getElementById("stepsRecomendedTag");

let towers = new Towers($nDisksInput, $stepsTag, $ta, $tb, $tc);

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

$ta.addEventListener("click", () => {
  towerActions(towers.towerA, towers.towerB, towers.towerC);
});
$tb.addEventListener("click", () => {
  towerActions(towers.towerB, towers.towerA, towers.towerC);
});
$tc.addEventListener("click", () => {
  towerActions(towers.towerC, towers.towerA, towers.towerB);
});

$btnAutoSolve.addEventListener("click", async () => {
  setDisableBtns(true);
  await towers.autoSolve();
  setDisableBtns(false);
});

$btnReset.addEventListener("click", () => {
  towers.reset();
  // towers = new Towers($nDisksInput, $stepsTag, $ta, $tb, $tc);
});

$btnCreate.addEventListener("click", () => {
  towers.resetAll();
  $nDisksInput = document.getElementById("nDisksInput").value;
  towers = new Towers($nDisksInput, $stepsTag, $ta, $tb, $tc);
  $stepsRecomendedTag.textContent = `Steps recomended: ${towers.getStepsRecomended()}`;
});
