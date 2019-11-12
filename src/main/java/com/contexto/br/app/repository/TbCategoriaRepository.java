package com.contexto.br.app.repository;

import com.contexto.br.app.domain.TbCategoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface TbCategoriaRepository extends JpaRepository<TbCategoria, Long> {

}
