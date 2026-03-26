package com.example.oblig_3_template.controller;

import com.example.oblig_3_template.model.AutoClicker;
import com.example.oblig_3_template.repository.AutoClickerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/autoclickers")
public class AutoClickerController {
    private final AutoClickerRepository repository;

    public AutoClickerController(AutoClickerRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<AutoClicker>> getAll() {
        return ResponseEntity.ok(repository.getAll());
    }

    @PostMapping
    public ResponseEntity<AutoClicker> create(@RequestBody AutoClicker autoClicker) {
        int id = repository.create(autoClicker);
        autoClicker.setId(id);
        return ResponseEntity.ok(autoClicker);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable("id") int id, @RequestBody AutoClicker autoClicker) {
        int updated = repository.update(id, autoClicker);
        if(updated == 0){
            return ResponseEntity.notFound().build();
        }else if (updated == 1){
            return ResponseEntity.noContent().build();
        }else {
            System.err.println("Multiple rows updated");
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id) {
        int deleted = repository.delete(id);

        if(deleted == 0){
            return ResponseEntity.notFound().build();
        }else if (deleted == 1){
            return ResponseEntity.noContent().build();
        }else {
            System.err.println("Multiple rows updated");
            return ResponseEntity.internalServerError().build();
        }
    }

}