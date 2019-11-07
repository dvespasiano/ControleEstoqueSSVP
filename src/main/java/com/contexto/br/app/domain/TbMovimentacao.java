package com.contexto.br.app.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A TbMovimentacao.
 */
@Entity
@Table(name = "tb_movimentacao")
public class TbMovimentacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tb_movimentacao")
    private Integer idTbMovimentacao;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "entrada")
    private Integer entrada;

    @ManyToMany
    @JoinTable(name = "tb_movimentacao_tb_produto",
               joinColumns = @JoinColumn(name = "tb_movimentacao_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tb_produto_id", referencedColumnName = "id"))
    private Set<TbProduto> tbProdutos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdTbMovimentacao() {
        return idTbMovimentacao;
    }

    public TbMovimentacao idTbMovimentacao(Integer idTbMovimentacao) {
        this.idTbMovimentacao = idTbMovimentacao;
        return this;
    }

    public void setIdTbMovimentacao(Integer idTbMovimentacao) {
        this.idTbMovimentacao = idTbMovimentacao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public TbMovimentacao quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public LocalDate getData() {
        return data;
    }

    public TbMovimentacao data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getEntrada() {
        return entrada;
    }

    public TbMovimentacao entrada(Integer entrada) {
        this.entrada = entrada;
        return this;
    }

    public void setEntrada(Integer entrada) {
        this.entrada = entrada;
    }

    public Set<TbProduto> getTbProdutos() {
        return tbProdutos;
    }

    public TbMovimentacao tbProdutos(Set<TbProduto> tbProdutos) {
        this.tbProdutos = tbProdutos;
        return this;
    }

    public TbMovimentacao addTbProduto(TbProduto tbProduto) {
        this.tbProdutos.add(tbProduto);
        tbProduto.getTbmovimentacaos().add(this);
        return this;
    }

    public TbMovimentacao removeTbProduto(TbProduto tbProduto) {
        this.tbProdutos.remove(tbProduto);
        tbProduto.getTbmovimentacaos().remove(this);
        return this;
    }

    public void setTbProdutos(Set<TbProduto> tbProdutos) {
        this.tbProdutos = tbProdutos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TbMovimentacao)) {
            return false;
        }
        return id != null && id.equals(((TbMovimentacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TbMovimentacao{" +
            "id=" + getId() +
            ", idTbMovimentacao=" + getIdTbMovimentacao() +
            ", quantidade=" + getQuantidade() +
            ", data='" + getData() + "'" +
            ", entrada=" + getEntrada() +
            "}";
    }
}
