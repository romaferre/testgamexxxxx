// Script: 'insertStuff.js' , generated by Gamedonia
var cities = [
{
	"trip_id":1,
	"city_id":10,
	"city_name": "Barcelona",
	"reward_coins":100
},
{
	"trip_id":1,
	"city_id":11,
	"city_name": "Girona",
	"reward_coins":100
},
{
	"trip_id":1,
	"city_id":12,
	"city_name": "Tarragona",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":20,
	"city_name": "Genoa",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":21,
	"city_name": "Roma",
	"reward_coins":100
},
{
	"trip_id":2,
	"city_id":22,
	"city_name": "Napoli",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":30,
	"city_name": "Wien",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":31,
	"city_name": "Salzburg",
	"reward_coins":100
},
{
	"trip_id":3,
	"city_id":32,
	"city_name": "Linz",
	"reward_coins":100
}
];

var trips = 
[
{  
	"trip_name":"Catalunya",
	"trip_id":1
},
{  
	"trip_name":"Italia",
	"trip_id":2
},
{  
	"trip_name":"Austria",
	"trip_id":3
}
]
;
var chapters =[
{
	"trip_id":1,
	"city_id":10,
	"chapter_id":101,
	"chapter_name":"bar1"
},
{
	"trip_id":1,
	"city_id":10,
	"chapter_id":102,
	"chapter_name":"bar2"
},
{
	"trip_id":1,
	"city_id":10,
	"chapter_id":103,
	"chapter_name":"bar3"
},
{
	"trip_id":1,
	"city_id":11,
	"chapter_id":111,
	"chapter_name":"gir1"
},
{
	"trip_id":1,
	"city_id":11,
	"chapter_id":112,
	"chapter_name":"gir2"
},
{
	"trip_id":1,
	"city_id":11,
	"chapter_id":113,
	"chapter_name":"gir3"
},
{
	"trip_id":1,
	"city_id":12,
	"chapter_id":121,
	"chapter_name":"tar1"
},
{
	"trip_id":1,
	"city_id":12,
	"chapter_id":122,
	"chapter_name":"tar2"
},
{
	"trip_id":1,
	"city_id":12,
	"chapter_id":123,
	"chapter_name":"tar3"
},
{
	"trip_id":2,
	"city_id":20,
	"chapter_id":201,
	"chapter_name":"gen1"
},
{
	"trip_id":2,
	"city_id":20,
	"chapter_id":202,
	"chapter_name":"gen2"
},
{
	"trip_id":2,
	"city_id":20,
	"chapter_id":203,
	"chapter_name":"gen3"
},
{
	"trip_id":2,
	"city_id":21,
	"chapter_id":211,
	"chapter_name":"rom1"
},
{
	"trip_id":2,
	"city_id":21,
	"chapter_id":212,
	"chapter_name":"rom2"
},
{
	"trip_id":2,
	"city_id":21,
	"chapter_id":213,
	"chapter_name":"rom3"
},
{
	"trip_id":2,
	"city_id":22,
	"chapter_id":221,
	"chapter_name":"nap1"
},
{
	"trip_id":2,
	"city_id":22,
	"chapter_id":222,
	"chapter_name":"nap2"
},
{
	"trip_id":2,
	"city_id":22,
	"chapter_id":223,
	"chapter_name":"nap3"
},
{
	"trip_id":3,
	"city_id":30,
	"chapter_id":301,
	"chapter_name":"wie1"
},
{
	"trip_id":3,
	"city_id":30,
	"chapter_id":302,
	"chapter_name":"wie2"
},
{
	"trip_id":3,
	"city_id":30,
	"chapter_id":303,
	"chapter_name":"wie3"
},
{
	"trip_id":3,
	"city_id":31,
	"chapter_id":311,
	"chapter_name":"sal1"
},
{
	"trip_id":3,
	"city_id":31,
	"chapter_id":312,
	"chapter_name":"sal2"
},
{
	"trip_id":3,
	"city_id":31,
	"chapter_id":313,
	"chapter_name":"sal3"
},
{
	"trip_id":3,
	"city_id":32,
	"chapter_id":321,
	"chapter_name":"lin1"
},
{
	"trip_id":3,
	"city_id":32,
	"chapter_id":322,
	"chapter_name":"lin2"
},
{
	"trip_id":3,
	"city_id":32,
	"chapter_id":323,
	"chapter_name":"lin3"
}
];

	function toEntityData(obj){
		var entity = gamedonia.data.newEntity();
		for(prop in obj){
			entity.put(prop,obj[prop]);
		}
		return entity;
	}

	trips.forEach(function(trip){
		gamedonia.data.create("saga_trips",toEntityData(trip),{
			success: function(c){out.println("trip: " + c)}
		});
	});
	
	cities.forEach(function(city){
		gamedonia.data.create("saga_cities",toEntityData(city),{
			success: function(c){out.println("city: " + c)}
		});
	});
	chapters.forEach(function(chapter){
		gamedonia.data.create("saga_chapters",toEntityData(chapter),{
			success: function(c){out.println("chapter: " + c)}
		});
	});