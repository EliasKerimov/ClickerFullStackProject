package com.example.oblig_3_template.repository;

import com.example.oblig_3_template.model.Upgrade;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class UpgradeRepository {

    private final JdbcTemplate jdbcTemplate;

    public UpgradeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected static final RowMapper<Upgrade> upgradeRowMapper = (rs, rowNum) ->
            new Upgrade(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("title"),
                    rs.getInt("cost"),
                    rs.getDouble("cps_multi"),
                    rs.getInt("click_multi")

            );

    public List<Upgrade> getAll() {
        String sql = "SELECT * FROM upgrade ORDER BY id";
        return jdbcTemplate.query(sql, upgradeRowMapper);
    }

    public int create(Upgrade upgrade) {
        String sql = "INSERT INTO upgrade (name, title, cost, cps_multi, click_multi) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, upgrade.getName());
            ps.setString(2, upgrade.getTitle());
            ps.setInt(3, upgrade.getCost());
            ps.setDouble(4, upgrade.getCpsMulti());
            ps.setDouble(5, upgrade.getClickMulti());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public int update(int id, Upgrade upgrade) {
        String sql = "UPDATE upgrade SET name = ?, title = ?, cost = ?, cps_multi = ?, click_multi = ? WHERE id = ?";
        return jdbcTemplate.update(
                sql,
                upgrade.getName(),
                upgrade.getTitle(),
                upgrade.getCost(),
                upgrade.getCpsMulti(),
                upgrade.getClickMulti(),
                id
        );
    }

    public int delete(int id) {
        String sql = "DELETE FROM upgrade WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }


}
