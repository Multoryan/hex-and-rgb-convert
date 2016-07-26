"use strict";

var btnTest = document.getElementById("inputColor");
btnTest.addEventListener("keyup", convert);
btnTest.addEventListener("input", convert);

function convert(){
	var color = document.getElementById("inputColor").value;
	color = color.replace(/\s+/g, ''); //Удаление пробелов
	var patternHEX = /^#?([0-9a-f]{3}){1,2}$/i;
	var patternRGB = /(^rgb\()?(\d{1,3}),(\d{1,3}),(\d{1,3})(\))?/;
	
	//Занулить результат если строка не подходит ни для HEX ни для RGB
	if(patternHEX.test(color) == false && patternRGB.test(color) == false){
		document.getElementById("result").innerHTML = "";
		document.getElementById("test").style.display = "none";
	}
	if(patternHEX.test(color)){
		convertToRGB(color);
	}
	if(patternRGB.test(color)){
		convertToHEX(color);
	}
	
}

function convertToRGB(hex){

	if(hex[0] == "#"){
		hex = hex.substr(1);
	}
	
	var hexToDiad = [];
	
	if(hex.length == 3){
		hexToDiad[0] = hex.substr(0,1) + hex.substr(0,1);
		hexToDiad[1] = hex.substr(1,1) + hex.substr(1,1);
		hexToDiad[2] = hex.substr(2,1) + hex.substr(2,1);
	}else{
		hexToDiad[0] = hex.substr(0,2);
		hexToDiad[1] = hex.substr(2,2);
		hexToDiad[2] = hex.substr(4,2);
	}
	
	var temp;
	hexToDiad.forEach(function(item, i, arr) {
		temp = "0x" + item;
		arr[i] = parseInt(temp).toString(10);
	});
	document.getElementById("result").innerHTML = "rgb ( " + hexToDiad.join() + " )";
	document.getElementById("test").style.background = "rgb(" + hexToDiad.join() + ")";
	document.getElementById("test").style.display = "block";
}

function convertToHEX(rgb){
	
	if(rgb[0] == "r"){
		rgb = rgb.substr(4);
		rgb = rgb.slice(0,-1);
	}
	
	var rgbToTriad = rgb.split(',');
	var temp;
	rgbToTriad.forEach(function(item, i, arr) {
		temp = +item;
		arr[i] = parseInt(temp).toString(16);
		if(arr[i].length == 1)
			arr[i] = "0" + arr[i];
	});
	document.getElementById("result").innerHTML = "#"+rgbToTriad.join('');
	document.getElementById("test").style.background = "#"+rgbToTriad.join('');
	document.getElementById("test").style.display = "block";
}