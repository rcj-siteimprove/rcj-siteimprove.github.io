const params = new URL(document.location.href).searchParams;

const tree = document.getElementById("tree");
const ornament = document.getElementById("ornament");
const gingerbread = document.getElementById("gingerbread");
const heart = document.getElementById("heart");

const clip = document.getElementById("clip");
const composite = document.getElementById("composite");
const mode = document.getElementById("mode");
const origin = document.getElementById("origin");
const position = document.getElementById("position");
const repeat = document.getElementById("repeat");
const size = document.getElementById("size");

const masked = document.getElementById("masked");
const computed = document.getElementById("computed");

tree.checked = params.get("tree") !== null;
ornament.checked = params.get("ornament") !== null;
gingerbread.checked = params.get("gingerbread") !== null;
heart.checked = params.get("heart") !== null;

const images = [];
if (tree.checked) {
  images.push("url(tree.svg)");
}
if (ornament.checked) {
  images.push("url(ornament.svg)");
}
if (gingerbread.checked) {
  images.push("url(gingerbread.svg)");
}
if (heart.checked) {
  images.push("url(heart.svg)");
}
if (images.length > 0) {
  masked.style.maskImage = images.join(", ");
}

clip.value = params.get("clip");
composite.value = params.get("composite");
mode.value = params.get("mode");
origin.value = params.get("origin");
position.value = params.get("position");
repeat.value = params.get("repeat");
size.value = params.get("size");

masked.style.maskClip = clip.value;
masked.style.maskComposite = composite.value;
masked.style.maskMode = mode.value;
masked.style.maskOrigin = origin.value;
masked.style.maskPosition = position.value;
masked.style.maskRepeat = repeat.value;
masked.style.maskSize = size.value;

addRow("mask-image");
addRow("mask-clip");
addRow("mask-composite");
addRow("mask-mode");
addRow("mask-origin");
addRow("mask-position");
addRow("mask-repeat");
addRow("mask-size");

function addRow(name) {
  const row = computed.insertRow();
  row.insertCell(0).append(name);
  row
    .insertCell(1)
    .append(window.getComputedStyle(masked).getPropertyValue(name));
}

fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=18&format=text")
  .then((resp) => resp.text())
  .then((text) => masked.append(text));
