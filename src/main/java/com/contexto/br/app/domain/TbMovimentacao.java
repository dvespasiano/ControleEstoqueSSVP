package com.contexto.br.app.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;

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

    @Column(name = "saldo_ant")
    private Integer saldoAnt;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "entrada")
    private Integer entrada;

    @ManyToOne
    @JsonIgnoreProperties("tbProduto")
    private TbProduto produto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSaldoAnt() {
        return saldoAnt;
    }

    public void setSaldoAnt(Integer saldoAnt) {
        this.saldoAnt = saldoAnt;
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

    public TbProduto getProduto() {
        return produto;
    }

    public TbMovimentacao idCategoria(TbProduto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(TbProduto produto) {
        this.produto = produto;
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
            ", quantidade=" + getQuantidade() +
            ", data='" + getData() + "'" +
            ", entrada=" + getEntrada() +
            "}";
    }

    

    
}
