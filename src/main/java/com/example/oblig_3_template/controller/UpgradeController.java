package com.example.oblig_3_template.controller;

import com.example.oblig_3_template.model.Upgrade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/upgrades")
public class UpgradeController {

    //TODO: full CRUD and Repository
    private List<Upgrade> upgrades = new ArrayList<>();

    @PostMapping
    public ResponseEntity<Upgrade> createUpgrade(@RequestBody Upgrade upgrade){

        upgrades.add(upgrade);

        return ResponseEntity.ok(upgrade);
    }

    @GetMapping
    public ResponseEntity<List<Upgrade>> getAll() {
        List<Upgrade> upgrades = new ArrayList<>();
        Upgrade upgrade = new Upgrade();
        upgrade.setId(0);
        upgrade.setCost(1200);
        upgrade.setName("Mechanical Keyboard");
        upgrade.setTitle("Not only are you productive, everyone within 10 meters knows it too.");
        upgrade.setCpsMulti(2);
        upgrade.setClickMulti(5);
        upgrades.add(upgrade);
        return ResponseEntity.ok(upgrades);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Upgrade> updateUpgrade(@PathVariable int id, @RequestBody Upgrade updated){
        for(Upgrade u : upgrades) {
            if (u.getId() == id) {
                u.setCost(updated.getCost());
                u.setTitle(updated.getTitle());
                u.setName(updated.getName());
                u.setClickMulti(updated.getClickMulti());
                u.setCpsMulti(updated.getCpsMulti());

                return ResponseEntity.ok(u);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUpgrade(@PathVariable int id){

        for(Upgrade d : upgrades){
            if(d.getId() == id){
                upgrades.remove(d);
                return ResponseEntity.ok().build();
            }
        }

        return ResponseEntity.notFound().build();

    }


}