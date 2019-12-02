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
    private Integer qtdEstoque;

    @Column(name = "qtd_min")
    private Integer qtdMin;

    @Column(name = "ativo")
    private Integer ativo;

    @Column(name = "situacao")
    private Float situacao;

    @ManyToOne
    @JsonIgnoreProperties("tbUnidadeMedida")
    private TbUnidadeMedida unidadeMedida;

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

    public Integer getQtdEstoque() {
        return qtdEstoque;
    }

    public TbProduto qtdEstoque(final Integer qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
        return this;
    }

    public void setQtdEstoque(final Integer qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public Integer getQtdMin() {
        return qtdMin;
    }

    public TbProduto qtdMin(final Integer qtdMin) {
        this.qtdMin = qtdMin;
        return this;
    }

    public void setQtdMin(final Integer qtdMin) {
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

    public Float getSituacao() {
        return situacao;
    }

    public void setSituacao(Float situacao) {
        this.situacao = situacao;
    }

    public TbUnidadeMedida getUnidadeMedida() {
        return unidadeMedida;
    }

    public TbProduto idCategoria(TbUnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
        return this;
    }

    public void setUnidadeMedida(TbUnidadeMedida unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
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
            ", ativo='" + getAtivo() + "'" +
            ", situacao="  + getSituacao()  +
            "}";
    }

    

    

    
}
