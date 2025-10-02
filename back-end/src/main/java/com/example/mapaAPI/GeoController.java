package com.example.mapaAPI;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/geo")
@CrossOrigin("*")
public class GeoController {

    @Autowired
    private GeoService geoService;

    @GetMapping("/buscar")
    public ResponseEntity<String> buscar(@RequestParam String query){
        try{
            JSONObject ubicacion = geoService.buscar(query);

            if(ubicacion != null){
                return ResponseEntity.ok(ubicacion.toString());
            } else {
                return ResponseEntity.notFound().build();
            }
        }catch (IOException e){
            return ResponseEntity.status(500)
                    .body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
    
}
