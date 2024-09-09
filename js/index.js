import { Towers } from "./towers.mjs";

let $nDisksInput = document.getElementById("nDisksInput").value;
const $btnCreate = document.getElementById("btnCreate");
const $ta = document.getElementById("ta");
const $tb = document.getElementById("tb");
const $tc = document.getElementById("tc");
const $btnAutoSolve = document.getElementById("btnAutoSolve");
const $btnReset = document.getElementById("btnReset");
const $stepsTag = document.getElementById("steps");

let towers = new Towers($nDisksInput, $ta, $tb, $tc);

$stepsTag.textContent = `Steps: ${towers.steps}`;

function towerActions(towerPrime, towerSec, towerTri) {
  towers.handleTowerDiskActions(towerPrime, towerSec, towerTri)
  towers.checkWin();
  $stepsTag.textContent = `Steps: ${towers.steps}`;
}

$ta.addEventListener("click", () => {
  towerActions(towers.towerA, towers.towerB, towers.towerC)
});
$tb.addEventListener("click", () => {
  towerActions(towers.towerB, towers.towerA, towers.towerC)
});
$tc.addEventListener("click", () => {
  towerActions(towers.towerC, towers.towerA, towers.towerB)
});

$btnAutoSolve.addEventListener("click", async () => {
  $btnAutoSolve.disabled = true;
  await towers.autoSolve();
  $btnAutoSolve.disabled = false;
  $stepsTag.textContent = `Steps: ${towers.steps}`;
});

$btnReset.addEventListener("click", () => {
  towers.reset();
  towers = new Towers($nDisksInput, $ta, $tb, $tc);
});

$btnCreate.addEventListener("click", () => {
  towers.reset();
  $nDisksInput = document.getElementById("nDisksInput").value;
  towers = new Towers($nDisksInput, $ta, $tb, $tc);
});
