package com.contexto.br.app.repository;

import com.contexto.br.app.domain.TbMovimentacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the TbMovimentacao entity.
 */
@Repository
public interface TbMovimentacaoRepository extends JpaRepository<TbMovimentacao, Long> {

    /*
     * @Query(value =
     * "select distinct tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos"
     * , countQuery =
     * "select count(distinct tbMovimentacao) from TbMovimentacao tbMovimentacao")
     * Page<TbMovimentacao> findAllWithEagerRelationships(Pageable pageable);
     * 
     * @Query("select distinct tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos"
     * ) List<TbMovimentacao> findAllWithEagerRelationships();
     * 
     * @Query("select tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos where tbMovimentacao.id =:id"
     * ) Optional<TbMovimentacao> findOneWithEagerRelationships(@Param("id") Long
     * id);
     */

    /*@Query(value = "select distinct m.produto,p.categoria, "
            + "p.unidade_medida,coalesce(m.quantidade,0) as quantidade,m.entrada "
            + "from TbProduto as p inner join TbCategoria as c on p.categoria.id = c.id "
            + "inner join TbUnidadeMedida as um on p.unidade_medida.id = um.id "
            + "inner join TbMovimentacao as m on m.produto.id = p.id")
    List<TbMovimentacao> findAllMov();*/
}
