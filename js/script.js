"use strict";

var btnSend = document.getElementById("convert");

btnSend.addEventListener("click", convert);

function convert(){
	var hex = document.getElementById("inputHEX").value;
	var hexToDiad = [];
	hexToDiad[0] = hex.substr(0,2);
	hexToDiad[1] = hex.substr(2,2);
	hexToDiad[2] = hex.substr(4,2);
	var temp;
	hexToDiad.forEach(function(item, i, arr) {
		temp = "0x" + item;
		arr[i] = parseInt(temp).toString(10);
	});
	document.getElementById("inputRGB").value = hexToDiad.join();
}
