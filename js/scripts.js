/*

	TeeAssembler

	Made by Alexander Bl.
	Discord: Alexander_#6686 (just in case you want to contact me)
	
*/

var bodyInput = document.querySelector(".bodyInput"),
feetInput = document.querySelector(".feetInput"),
checkBox = document.querySelector(".checkBox"),
colorsWrap = document.querySelector(".colorsWrap"),
body = document.querySelector(".body"),
fFoot = document.querySelector(".front-foot"),
bFoot = document.querySelector(".back-foot"),
bodyColor = document.querySelector(".body-color"),
bfColor = document.querySelector(".back-foot-color"),
ffColor = document.querySelector(".front-foot-color"),
hsl,
lastBodyColor = "255",
lastFeetColor = "13026816",
extSkin

bodyInput.value = 255
feetInput.value = 13026816

checkBox.checked = false

checkBox.addEventListener("change", function() {
	if (checkBox.checked == false) {
		colorsWrap.style.opacity = null
		body.style.mixBlendMode = null
		bodyColor.style.backgroundColor = null
		bFoot.style.mixBlendMode = null
		fFoot.style.mixBlendMode = null
		ffColor.style.backgroundColor = null
		bfColor.style.backgroundColor = null

	}
	else {
		lastBodyColor = bodyInput.value
		colorsWrap.style.opacity = 1
		if (lastBodyColor != "") {
			bodyColorF()
		}
		if (lastFeetColor != "") {
			feetColorF()
		}
	}
})

function bodyColorF() {
	if (checkBox.checked == true) {
		twToHSL(bodyInput.value)
		document.querySelector(".bodyResult").innerHTML = hsl + "<br>" + hslToRGB(H, S, L) + "<br>" +  hslToHex(H, S, L)
		body.style.mixBlendMode = "multiply"
		bodyColor.style.backgroundColor = hsl
		lastBodyColor = bodyInput.value
	}
}

 function feetColorF() {
	if (checkBox.checked == true) {
		twToHSL(feetInput.value)
		document.querySelector(".feetResult").innerHTML = hsl + "<br>" + hslToRGB(H, S, L) + "<br>" +  hslToHex(H, S, L)
		fFoot.style.mixBlendMode = "multiply"
		bFoot.style.mixBlendMode = "multiply"
		ffColor.style.backgroundColor = hsl
		bfColor.style.backgroundColor = hsl
		lastFeetColor = feetInput.value
	}
}

function decToHex(d, padding) {
	var hex = Number(d).toString(16)
	padding = typeof (padding) === "undefined" || padding === null ? padding = 6 : padding

	while (hex.length < padding) {
		hex = "0" + hex
	}

	return hex
}

function twToHSL(twDec) {
	hexx = decToHex(twDec)

	H = Math.round((parseInt(hexx.substr(0, 2), 16) * 360) / 255)
	S = Math.round((parseInt(hexx.substr(2, 2), 16) * 100) / 255)
	L = Math.round((((parseInt(hexx.substr(4, 2), 16) / 255) / 2) + 0.5) * 100)

	hsl = "hsl(" + H + ", " + S + "%, " + L + "%)"
	return hsl
}

bodyInput.addEventListener("input", bodyColorF)
feetInput.addEventListener("input", feetColorF)

document.querySelector(".externalSkinButton").addEventListener("click", function() {
	extSkin = document.querySelector(".externalSkin").value
	url = "url(" + extSkin + ")"
	document.querySelector(".template div").style.backgroundImage = url
	document.querySelectorAll(".teeSkin")
	teeSkin = document.querySelectorAll(".teeSkin")
	for (var i = 0; i < teeSkin.length; ++i) {
		teeSkin[i].style.backgroundImage = url
	}
	bodyColor.style.webkitMaskImage = url
	bodyColor.style.maskImage = url
	ffColor.style.webkitMaskImage = url
	ffColor.style.maskImage = url
	bfColor.style.webkitMaskImage = url
	bfColor.style.maskImage = url
})

function hslToRGB(hue, saturation, lightness) {
	if (hue == undefined){
		return [0, 0, 0]
	}

	var chroma = (1 - Math.abs(((2 * lightness) / 100) - 1)) * (saturation / 100),
	huePrime = hue / 60,
	secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

	huePrime = Math.floor(huePrime)
	var red,green,blue

	if (huePrime === 0) {
		red = chroma
		green = secondComponent
		blue = 0
	}
	else if (huePrime === 1) {
		red = secondComponent
		green = chroma
		blue = 0
	}
	else if (huePrime === 2) {
		red = 0
		green = chroma
		blue = secondComponent
	}
	else if (huePrime === 3) {
		red = 0
		green = secondComponent
		blue = chroma
	}
	else if (huePrime === 4) {
		red = secondComponent
		green = 0
		blue = chroma	
	}
	else if (huePrime === 5) {
		red = chroma
		green = 0
		blue = secondComponent
	}

	var lightnessAdjustment = (lightness / 100) - (chroma / 2)
	red += lightnessAdjustment
	green += lightnessAdjustment
	blue += lightnessAdjustment

	return "R = " + Math.round(red * 255) + "<br>G = " + Math.round(green * 255) + "<br>B = " + Math.round(blue * 255)
}

function hslToHex(h, s, l) {
	h /= 360
	s /= 100
	l /= 100
	let r, g, b

	if (s === 0) {
		r = g = b = l // achromatic
	}
	else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}
	const toHex = x => {
		const hex = Math.round(x * 255).toString(16)
		return hex.length === 1 ? "0" + hex : hex
	}
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}
