const params = new URL(document.location.href).searchParams;
const tree = document.getElementById("tree");
const ornament = document.getElementById("ornament");
const gingerbread = document.getElementById("gingerbread");
const heart = document.getElementById("heart");
const repeat = document.getElementById("repeat");
const clip = document.getElementById("clip");
const masked = document.getElementById("masked");
const computed = document.getElementById("computed");
tree.checked = params.get("tree") !== null;
ornament.checked = params.get("ornament") !== null;
gingerbread.checked = params.get("gingerbread") !== null;
heart.checked = params.get("heart") !== null;
repeat.value = params.get("repeat");
clip.value = params.get("clip");
masked.style.maskRepeat = repeat.value;
masked.style.maskClip = clip.value;
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
addRow("mask-image");
addRow("mask-clip");
addRow("mask-repeat");
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
export {};
