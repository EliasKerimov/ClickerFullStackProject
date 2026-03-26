package com.example.oblig_3_template.model;

public class AutoClicker {
    private Integer id;
    private String name;
    private String title;
    private int cost;
    private int cps;

    public AutoClicker(){}
    public AutoClicker(Integer id, String name, String title, int cost, int cps){
        this.id = id;
        this.name = name;
        this.title = title;
        this.cost = cost;
        this.cps = cps;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getCps() {
        return cps;
    }

    public void setCps(int cps) {
        this.cps = cps;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

