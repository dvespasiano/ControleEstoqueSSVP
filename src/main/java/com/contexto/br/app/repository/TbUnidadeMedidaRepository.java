package com.contexto.br.app.repository;
import com.contexto.br.app.domain.TbUnidadeMedida;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TbUnidadeMedida entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TbUnidadeMedidaRepository extends JpaRepository<TbUnidadeMedida, Long> {

}
