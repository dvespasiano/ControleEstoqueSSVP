package com.contexto.br.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TbCategoria.
 */
@Entity
@Table(name = "tb_categoria")
public class TbCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tb_categoria")
    private Integer idTbCategoria;

    @Column(name = "nm_categoria")
    private String nmCategoria;

    @ManyToOne
    @JsonIgnoreProperties("tbCategorias")
    private TbProduto idCategoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTbCategoria() {
        return idTbCategoria;
    }

    public TbCategoria idTbCategoria(Integer idTbCategoria) {
        this.idTbCategoria = idTbCategoria;
        return this;
    }

    public void setIdTbCategoria(Integer idTbCategoria) {
        this.idTbCategoria = idTbCategoria;
    }

    public String getNmCategoria() {
        return nmCategoria;
    }

    public TbCategoria nmCategoria(String nmCategoria) {
        this.nmCategoria = nmCategoria;
        return this;
    }

    public void setNmCategoria(String nmCategoria) {
        this.nmCategoria = nmCategoria;
    }

    public TbProduto getIdCategoria() {
        return idCategoria;
    }

    public TbCategoria idCategoria(TbProduto tbProduto) {
        this.idCategoria = tbProduto;
        return this;
    }

    public void setIdCategoria(TbProduto tbProduto) {
        this.idCategoria = tbProduto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TbCategoria)) {
            return false;
        }
        return id != null && id.equals(((TbCategoria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TbCategoria{" +
            "id=" + getId() +
            ", idTbCategoria=" + getIdTbCategoria() +
            ", nmCategoria='" + getNmCategoria() + "'" +
            "}";
    }
}
