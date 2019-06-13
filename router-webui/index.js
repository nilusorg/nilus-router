const wsInputDemand = "http://nilus-logistics.localhost:8080/bicycle_messenger_demand.txt";
const wsInputSupply = "http://nilus-logistics.localhost:8080/bicycle_messenger_supply.txt";

function drawRouter(waypoints, explanation) {
	document.getElementById('map').innerHTML = "<div id='mapInternal' style='width: 100%; height: 100%;'></div>";
	var map = L.map('mapInternal');

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	var routingControl = L.Routing.control({
		waypoints: waypoints,
		router: L.Routing.graphHopper('your-api-key', {
			serviceUrl: 'http://192.168.99.100:8989/route'
		}),
		routeWhileDragging: false
	}).addTo(map);
	
	var router = routingControl.getRouter();
	router.on('response',function(e){
	  console.log('This request consumed ' + e.credits + ' credit(s)');
	  console.log('You have ' + e.remaining + ' left');
	});

	log(explanation);
}

function log(text) {
	$("#logs").prepend(`<p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | ${text}</p>`);
}

var currentStore = {
	demand: "",
	supply: ""
};

$(function () {
	viewService('Bienvenido!');
	$('.leaflet-top.leaflet-right').hide();

	$("#load").click(function (e) {
		currentStore.demand = "";
		currentStore.supply = "";

		$.ajax({
			url: wsInputDemand,
			dataType: 'text',
			type: 'GET',
			async: true,
			statusCode: {
				404: function (response) {
					alert(404);
				},
				200: function (response) {
					currentStore.demand = response;
					log("Demand correctly loaded");
				}
			},
			error: function (jqXHR, status, errorThrown) {
				alert('error');
			}
		});
		$.ajax({
			url: wsInputSupply,
			dataType: 'text',
			type: 'GET',
			async: true,
			statusCode: {
				404: function (response) {
					alert(404);
				},
				200: function (response) {
					currentStore.supply = response;
					log("Supply correctly loaded");
				}
			},
			error: function (jqXHR, status, errorThrown) {
				alert('error');
			}
		});
		e.preventDefault();
	});

	$("#process").click(function (e) {
		setTimeout(function () {
			log("Processed ok!");
			log("view service number 1: <button class='k-button' onclick='viewService(\"" + "viewing service #1" + "\")'>View</button>");
		}, 2500);
		e.preventDefault();
	});

	$("#save").click(function (e) {
		setTimeout(function () {
			log("Saved ok!");
		}, 1500);
		e.preventDefault();
	});
});

function viewService(text) {
	var waypoints = [L.latLng(-34.598596, -58.391922), L.latLng(-34.578596, -58.411922)];
	drawRouter(waypoints, text);
	$('.leaflet-top.leaflet-right').show();
}