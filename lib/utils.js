export function getQuery(key) {
	var query = window.location.search.substring(1);
	var map = query.split("&");
	for (var i = 0; i < map.length; i++) {
		var pair = map[i].split("=");
		if (pair[0] == key) {
			return pair[1];
		}
	}
}