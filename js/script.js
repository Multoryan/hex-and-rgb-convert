"use strict";

//Нажата клавиша или введено значение
var btnTest = document.getElementById("inputColor");
btnTest.addEventListener("input", convert);
btnTest.oncopy = function(){
	if(document.getElementById("result").value != "")
	document.getElementById("result").click();
}

btnTest.onpaste = function(){
	document.getElementById("inputColor").value = "";
}

//Возврат курсора в поле ввода
btnTest.focus();
document.body.addEventListener("keydown", setFocus);
document.body.addEventListener("click", setFocus);
	

function setFocus(){
	btnTest.focus(); //Установка фокуса
}
document.getElementById("intro").innerHTML = "Преобразование #hex в rgb() и наоборот";
//Копирование по клику в буфер обмена
var clipboard = new Clipboard('#result');


function convert(){
	
	
	
	var color = document.getElementById("inputColor").value;
	
	color = color.replace(/\s+/g, ''); //Удаление пробелов
	var patternHEX = /^#?([0-9a-f]{3}){1,2}$/i;
	var patternRGB = /(^rgb\()?(\d{1,3}),(\d{1,3}),(\d{1,3})(\))?/;
	
	//Занулить результат если строка не подходит ни для HEX ни для RGB
	if(patternHEX.test(color) == false && patternRGB.test(color) == false){
		document.getElementById("result").style.display = "none";
		document.getElementById("clip").style.display = "none";
		document.getElementById("result").value = "";
		document.getElementById("intro").innerHTML = "Преобразование #hex в rgb() и наоборот";
		document.body.style.background = "#fff";
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
	document.getElementById("result").value = "rgb(" + hexToDiad.join() + ")";
	document.getElementById("result").style.display = "block";
	document.getElementById("clip").style.display = "block";
	document.body.style.background = "rgb(" + hexToDiad.join() + ")";
	document.getElementById("intro").innerHTML = "";
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
	document.getElementById("result").value = "#"+rgbToTriad.join('');
	document.getElementById("result").style.display = "block";
	document.getElementById("clip").style.display = "block";
	document.body.style.background = "#"+rgbToTriad.join('');
	document.getElementById("intro").innerText = "";
}

    

