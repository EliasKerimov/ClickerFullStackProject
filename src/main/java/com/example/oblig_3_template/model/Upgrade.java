package com.example.oblig_3_template.model;

public class Upgrade {
    private Integer id;
    private String name;
    private int cost;
    private String title;
    private double cpsMulti;
    private double clickMulti;

    public Upgrade(Integer id, String name, String title, int cost, double cpsMulti, double clickMulti){
        this.id = id;
        this.name = name;
        this.title = title;
        this.cost = cost;
        this.cpsMulti = cpsMulti;
        this.clickMulti = clickMulti;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getCpsMulti() {
        return cpsMulti;
    }

    public void setCpsMulti(double cpsMulti) {
        this.cpsMulti = cpsMulti;
    }

    public double getClickMulti() {
        return clickMulti;
    }

    public void setClickMulti(double clickMulti) {
        this.clickMulti = clickMulti;
    }
}
