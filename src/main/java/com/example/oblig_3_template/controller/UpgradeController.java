package com.example.oblig_3_template.controller;

import com.example.oblig_3_template.model.Upgrade;
import com.example.oblig_3_template.repository.AutoClickerRepository;
import com.example.oblig_3_template.repository.UpgradeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/upgrades")
public class UpgradeController {

    //TODO: full CRUD and Repository

    private final UpgradeRepository repository;

    public UpgradeController(UpgradeRepository repository){
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Upgrade> createUpgrade(@RequestBody Upgrade upgrade) {
        int id = repository.create(upgrade);
        upgrade.setId(id);
        return ResponseEntity.ok(upgrade);
    }

    @GetMapping
    public ResponseEntity<List<Upgrade>> getAll() {
        return ResponseEntity.ok(repository.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Upgrade> updateUpgrade(@PathVariable int id, @RequestBody Upgrade upgrade) {
        int updated = repository.update(id, upgrade);
        if (updated == 0) {
            return ResponseEntity.notFound().build();
        } else if (updated == 1) {
            return ResponseEntity.noContent().build();
        } else {
            System.err.println("Multiple rows updated");
            return ResponseEntity.internalServerError().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id) {
        int deleted = repository.delete(id);

        if (deleted == 0) {
            return ResponseEntity.notFound().build();
        } else if (deleted == 1) {
            return ResponseEntity.noContent().build();
        } else {
            System.err.println("Multiple rows updated");
            return ResponseEntity.internalServerError().build();
            }
        }
    }