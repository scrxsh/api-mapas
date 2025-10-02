var map = L.map('map').setView([4.60971, -74.08175], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    function buscar() {
        const query = document.getElementById("query").value;

        fetch("http://localhost:8080/api/geo/buscar?query=" + query)
        .then(r => r.json())
        .then(location => {
            if (location.lat && location.lon) {
            map.setView([location.lat, location.lon], 13);
            L.marker([location.lat, location.lon]).addTo(map)
                .bindPopup(location.display_name)
                .openPopup();
            } else {
            alert("No encontrado");
            }
        });
    }