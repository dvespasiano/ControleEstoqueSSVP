package com.contexto.br.app.repository;

import com.contexto.br.app.domain.TbCategoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings(TbCategoriaRepository.UNUSED)
@Repository
public interface TbCategoriaRepository extends JpaRepository<TbCategoria, Long> {

    public static final String UNUSED = "unused";

}
