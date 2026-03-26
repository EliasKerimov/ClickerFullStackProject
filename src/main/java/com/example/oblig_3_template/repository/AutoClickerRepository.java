package com.example.oblig_3_template.repository;

import com.example.oblig_3_template.model.AutoClicker;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class AutoClickerRepository {
    private final JdbcTemplate jdbcTemplate;

    public AutoClickerRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    protected static final RowMapper<AutoClicker> autoClickerRowMapper = (rs, rowNum) ->
            new AutoClicker(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("title"),
                    rs.getInt("cost"),
                    rs.getInt("cps")
            );

    public List<AutoClicker> getAll() {
        String sql = "SELECT * FROM auto_clicker ORDER BY id";
        return jdbcTemplate.query(sql, autoClickerRowMapper);
    }

    public int create(AutoClicker autoClicker){
        String sql = "INSERT INTO auto_clicker (name, title, cost, cps) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, autoClicker.getName());
            ps.setString(2, autoClicker.getTitle());
            ps.setInt(3, autoClicker.getCost());
            ps.setInt(4, autoClicker.getCps());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public int update(int id, AutoClicker autoClicker){
        String sql = "UPDATE auto_clicker SET name = ?, title = ?, cost = ?, cps = ? WHERE id = ?";
        return jdbcTemplate.update(
                sql,
                autoClicker.getName(),
                autoClicker.getTitle(),
                autoClicker.getCost(),
                autoClicker.getCps(),
                id
        );
    }

    public int delete(int id){
        String sql = "DELETE FROM auto_clicker WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
