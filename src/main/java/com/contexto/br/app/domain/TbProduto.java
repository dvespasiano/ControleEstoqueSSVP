package com.contexto.br.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "id_tb_produto")
    private Integer idTbProduto;

    @Column(name = "nm_produto")
    private String nmProduto;

    @Column(name = "qtd_estoque")
    private String qtdEstoque;

    @Column(name = "qtd_min")
    private String qtdMin;

    @Column(name = "ativo")
    private Integer ativo;

    @ManyToMany(mappedBy = "tbProdutos")
    @JsonIgnore
    private Set<TbMovimentacao> tbmovimentacaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTbProduto() {
        return idTbProduto;
    }

    public TbProduto idTbProduto(Integer idTbProduto) {
        this.idTbProduto = idTbProduto;
        return this;
    }

    public void setIdTbProduto(Integer idTbProduto) {
        this.idTbProduto = idTbProduto;
    }

    public String getNmProduto() {
        return nmProduto;
    }

    public TbProduto nmProduto(String nmProduto) {
        this.nmProduto = nmProduto;
        return this;
    }

    public void setNmProduto(String nmProduto) {
        this.nmProduto = nmProduto;
    }

    public String getQtdEstoque() {
        return qtdEstoque;
    }

    public TbProduto qtdEstoque(String qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
        return this;
    }

    public void setQtdEstoque(String qtdEstoque) {
        this.qtdEstoque = qtdEstoque;
    }

    public String getQtdMin() {
        return qtdMin;
    }

    public TbProduto qtdMin(String qtdMin) {
        this.qtdMin = qtdMin;
        return this;
    }

    public void setQtdMin(String qtdMin) {
        this.qtdMin = qtdMin;
    }

    public Integer getAtivo() {
        return ativo;
    }

    public TbProduto ativo(Integer ativo) {
        this.ativo = ativo;
        return this;
    }

    public void setAtivo(Integer ativo) {
        this.ativo = ativo;
    }

    public Set<TbMovimentacao> getTbmovimentacaos() {
        return tbmovimentacaos;
    }

    public TbProduto tbmovimentacaos(Set<TbMovimentacao> tbMovimentacaos) {
        this.tbmovimentacaos = tbMovimentacaos;
        return this;
    }

    public TbProduto addTbmovimentacao(TbMovimentacao tbMovimentacao) {
        this.tbmovimentacaos.add(tbMovimentacao);
        tbMovimentacao.getTbProdutos().add(this);
        return this;
    }

    public TbProduto removeTbmovimentacao(TbMovimentacao tbMovimentacao) {
        this.tbmovimentacaos.remove(tbMovimentacao);
        tbMovimentacao.getTbProdutos().remove(this);
        return this;
    }

    public void setTbmovimentacaos(Set<TbMovimentacao> tbMovimentacaos) {
        this.tbmovimentacaos = tbMovimentacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
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
            ", idTbProduto=" + getIdTbProduto() +
            ", nmProduto='" + getNmProduto() + "'" +
            ", qtdEstoque='" + getQtdEstoque() + "'" +
            ", qtdMin='" + getQtdMin() + "'" +
            ", ativo=" + getAtivo() +
            "}";
    }
}
