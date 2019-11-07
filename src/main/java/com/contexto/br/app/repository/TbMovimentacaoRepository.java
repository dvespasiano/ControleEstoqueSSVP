package com.contexto.br.app.repository;
import com.contexto.br.app.domain.TbMovimentacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TbMovimentacao entity.
 */
@Repository
public interface TbMovimentacaoRepository extends JpaRepository<TbMovimentacao, Long> {

    @Query(value = "select distinct tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos",
        countQuery = "select count(distinct tbMovimentacao) from TbMovimentacao tbMovimentacao")
    Page<TbMovimentacao> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos")
    List<TbMovimentacao> findAllWithEagerRelationships();

    @Query("select tbMovimentacao from TbMovimentacao tbMovimentacao left join fetch tbMovimentacao.tbProdutos where tbMovimentacao.id =:id")
    Optional<TbMovimentacao> findOneWithEagerRelationships(@Param("id") Long id);

}
