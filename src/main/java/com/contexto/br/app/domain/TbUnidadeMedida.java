package com.contexto.br.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TbUnidadeMedida.
 */
@Entity
@Table(name = "tb_unidade_medida")
public class TbUnidadeMedida implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tb_unidade_medida")
    private Integer idTbUnidadeMedida;

    @Column(name = "nm_unidade_medida")
    private String nmUnidadeMedida;

    @ManyToOne
    @JsonIgnoreProperties("tbUnidadeMedidas")
    private TbProduto idUnidadeMedida;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTbUnidadeMedida() {
        return idTbUnidadeMedida;
    }

    public TbUnidadeMedida idTbUnidadeMedida(Integer idTbUnidadeMedida) {
        this.idTbUnidadeMedida = idTbUnidadeMedida;
        return this;
    }

    public void setIdTbUnidadeMedida(Integer idTbUnidadeMedida) {
        this.idTbUnidadeMedida = idTbUnidadeMedida;
    }

    public String getNmUnidadeMedida() {
        return nmUnidadeMedida;
    }

    public TbUnidadeMedida nmUnidadeMedida(String nmUnidadeMedida) {
        this.nmUnidadeMedida = nmUnidadeMedida;
        return this;
    }

    public void setNmUnidadeMedida(String nmUnidadeMedida) {
        this.nmUnidadeMedida = nmUnidadeMedida;
    }

    public TbProduto getIdUnidadeMedida() {
        return idUnidadeMedida;
    }

    public TbUnidadeMedida idUnidadeMedida(TbProduto tbProduto) {
        this.idUnidadeMedida = tbProduto;
        return this;
    }

    public void setIdUnidadeMedida(TbProduto tbProduto) {
        this.idUnidadeMedida = tbProduto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TbUnidadeMedida)) {
            return false;
        }
        return id != null && id.equals(((TbUnidadeMedida) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TbUnidadeMedida{" +
            "id=" + getId() +
            ", idTbUnidadeMedida=" + getIdTbUnidadeMedida() +
            ", nmUnidadeMedida='" + getNmUnidadeMedida() + "'" +
            "}";
    }
}