var map = L.map('map',{}).setView([5.617, -73.817], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
        foo: 'bar'
    }).addTo(map);

    function cargarUbicacion(query = "Chiquinquirá") {
        fetch("http://localhost:8080/api/geo/buscar?query=" + query)
        .then(r => r.json())
        .then(location => {
            if (location.lat && location.lon) {
                map.setView([location.lat, location.lon], 15);
            } else {
                alert("No encontrado");
            }
        })
    }

    function cargarHeatmap() {
        fetch("http://localhost:8080/api/geo/heatmap")
        .then(r => r.json())
        .then(data => {
            L.heatLayer(data, {
                radius: 25,
                blur: 15,
                maxZoom: 17
            }).addTo(map);
        })
    }

    document.addEventListener("DOMContentLoaded", function() {
    cargarUbicacion(); 
    cargarHeatmap();
    });