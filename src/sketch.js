let scale = 0.8;
let boxWidth = 0;
let boxHeight = 0;

let boxLT = null;
let boxWCount = 12;
let boxHCount = 8;

let kLineWidth = 40;

let min = 0;
let max = 0;

function findMinMax(data) {
	console.log(data);
	let min = 10000;
	let max = -10000;
	for (let i = 0; i < data.length; i++) {
		let item = data[i];
		let open = item.open;
		let close = item.close;
		let high = item.high;
		let low = item.low;
		let max_ = Math.max(open, close, high, low);
		let min_ = Math.min(open, close, high, low);
		if (max_ > max) {
			max = max_;
		}
		if (min_ < min) {
			min = min_;
		}
	}
	return [min, max];
}

function drawStock(data) {
	textSize(24);
	fill("#8f8f8f");
	text("我是标题", width / 2, (height - boxHeight) / 3);
	textSize(12);
	for (let i = 0; i < boxHCount; i++) {
		let y = boxLT.y + (i * boxHeight) / boxHCount;
		line(boxLT.x, y, boxLT.x - 5, y);
		strokeWeight(0.8);
		noFill();
		text((min + ((max - min) / boxHCount) * (boxHCount - i)).toFixed(2), boxLT.x - 40, y + 10);
	}

	strokeWeight(1);
	for (let i = 0; i < data.length; i++) {
		let item = data[i];

		if (item.close > item.open) {
			stroke("#d54642");
			fill("#d54642");
		} else if (item.close < item.open) {
			stroke("#63a564");
			fill("#63a564");
		} else {
			stroke("#8f8f8f");
			fill("#8f8f8f");
		}

		let x = boxLT.x + (boxWidth / boxWCount) * (i + 1);
		let y = map(Math.max(item.close, item.open), min, max, boxLT.y + boxHeight, boxLT.y);

		let linex = x + kLineWidth / 2;
		let liney1 = map(item.high, min, max, boxLT.y + boxHeight, boxLT.y);
		let liney2 = map(item.low, min, max, boxLT.y + boxHeight, boxLT.y);
		let height = (Math.abs(item.close - item.open) / (max - min)) * boxHeight;
		//上影线
		line(linex, liney1, linex, y);
		//下影线
		line(linex, liney2, linex, y + height);
		//实体
		rect(x, y, kLineWidth, height);
	}

	for (let i = 0; i < data.length; i++) {
		let item = data[i];
		let x = boxLT.x + (boxWidth / boxWCount) * (i + 1) + kLineWidth / 2;
		let y = boxLT.y + boxHeight;
		line(x, y, x, y + 5);
		text(item.date, x, y + 30);
	}
}

function setup() {
	frameRate(1);
	textAlign(CENTER);
	background("#f8f8f8");
	width = 1180;
	height = 640;
	createCanvas(width, height);

	boxWidth = width * scale;
	boxHeight = height * scale;

	[min, max] = findMinMax(data);

	boxLT = createVector((width - boxWidth) / 2, (height - boxHeight) / 2);
}

function draw() {
	background("#f8f8f8");
	fill("#ff00000");
	rect(boxLT.x, boxLT.y, boxWidth, boxHeight);
	drawStock(data);
}
