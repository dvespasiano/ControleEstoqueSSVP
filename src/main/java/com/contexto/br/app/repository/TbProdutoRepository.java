package com.contexto.br.app.repository;
import com.contexto.br.app.domain.TbProduto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TbProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TbProdutoRepository extends JpaRepository<TbProduto, Long> {
    
}
