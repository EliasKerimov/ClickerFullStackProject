package com.example.oblig_3_template.controller;

import com.example.oblig_3_template.model.AutoClicker;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/autoclickers")
public class AutoClickerController {
    private static final List<AutoClicker> autoClickers = createInitial();

    private static List<AutoClicker> createInitial() {
        return new ArrayList<>(List.of(
            new AutoClicker(
                "Nod Thoughtfully During Lectures",
                "No one knows what you understood, but it looks impressive.",
                15,
                1
            )
        ));
    }

    //TODO: full CRUD and Repository
    @GetMapping
    public ResponseEntity<List<AutoClicker>> getAll() {
        return ResponseEntity.ok(autoClickers);
    }

    @PostMapping
    public ResponseEntity<AutoClicker> create(@RequestBody AutoClicker data) {
        AutoClicker created = new AutoClicker(data.getName(), data.getTitle(), data.getCost(), data.getCps());
        autoClickers.add(created);
        return ResponseEntity.ok(created);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable("id") int id, @RequestBody AutoClicker data) {
        for (AutoClicker ac : autoClickers) {
            if (ac.getId() == id) {
                ac.setName(data.getName());
                ac.setTitle(data.getTitle());
                ac.setCost(data.getCost());
                ac.setCps(data.getCps());
                return ResponseEntity.noContent().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id) {
        for(AutoClicker ac : autoClickers) {
            if(ac.getId() == id) {
                autoClickers.remove(ac);
                return ResponseEntity.noContent().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

}