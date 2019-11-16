package com.contexto.br.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;


/**
 * A TbProduto.
 */
@Entity
@Table(name = "tb_produto")
public class TbProduto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nm_produto")
    private String nmProduto;

    @Column(name = "qtd_estoque")
    private String qtdEstoque;

    @Column(name = "qtd_min")
    private String qtdMin;

    @Column(name = "ativo")
    private Integer ativo;

    @ManyToOne
    @JsonIgnoreProperties("tbUnidadeMedida")
    private TbUnidadeMedida unidade_medida;

    @ManyToOne
    @JsonIgnoreProperties("tbCategoria")
    private TbCategoria categoria;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getNmProduto() {
        return nmProduto;
    }

    public TbProduto nmProduto(final String nmProduto) {
        this.nmProduto = nmProduto;
        return this;
    }

    public void setNmProduto(final String nmProduto) {
        this.nmProduto = nmProduto;
    }

    public String getQtdEstoque() {
        return qtdEstoque;
    }

    public TbProduto qtdEstoque(final String qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
        return this;
    }

    public void setQtdEstoque(final String qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public String getQtdMin() {
        return qtdMin;
    }

    public TbProduto qtdMin(final String qtdMin) {
        this.qtdMin = qtdMin;
        return this;
    }

    public void setQtdMin(final String qtdMin) {
        this.qtdMin = qtdMin;
    }

    public Integer getAtivo() {
        return ativo;
    }

    public TbProduto ativo(final Integer ativo) {
        this.ativo = ativo;
        return this;
    }

    public void setAtivo(final Integer ativo) {
        this.ativo = ativo;
    }

    public TbUnidadeMedida getUnidade_medida() {
        return unidade_medida;
    }

    public TbProduto idCategoria(TbUnidadeMedida unidade_medida) {
        this.unidade_medida = unidade_medida;
        return this;
    }

    public void setUnidade_medida(TbUnidadeMedida unidade_medida) {
        this.unidade_medida = unidade_medida;
    }

    public TbCategoria getCategoria() {
        return categoria;
    }

    public TbProduto idCategoria(TbCategoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(TbCategoria categoria) {
        this.categoria = categoria;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TbProduto)) {
            return false;
        }
        return id != null && id.equals(((TbProduto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TbProduto{" +
            "id=" + getId() +
            ", nmProduto='" + getNmProduto() + "'" +
            ", qtdEstoque='" + getQtdEstoque() + "'" +
            ", qtdMin='" + getQtdMin() + "'" +
            ", ativo=" + getAtivo() +
            "}";
    }

    

    
}
