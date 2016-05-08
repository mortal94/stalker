Map = {
	rooms : Array[Room]
}

Room = {
	id : Int 
	name : String
	items : Array[Item]
	locationOnMap : Location
}

Location = {
	x : Int
	y : Int
}

Item = {
	name : String
	owner : Person
	classification : Classification
	id : Int
}

Person = {
	name : String
}

Classification = BLMS | Secret | SuperSecret | MegaSecret