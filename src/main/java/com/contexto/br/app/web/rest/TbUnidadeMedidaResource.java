package com.contexto.br.app.web.rest;

import com.contexto.br.app.domain.TbUnidadeMedida;
import com.contexto.br.app.repository.TbUnidadeMedidaRepository;
import com.contexto.br.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.contexto.br.app.domain.TbUnidadeMedida}.
 */
@RestController
@RequestMapping("/api")
public class TbUnidadeMedidaResource {

    private final Logger log = LoggerFactory.getLogger(TbUnidadeMedidaResource.class);

    private static final String ENTITY_NAME = "tbUnidadeMedida";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TbUnidadeMedidaRepository tbUnidadeMedidaRepository;

    public TbUnidadeMedidaResource(TbUnidadeMedidaRepository tbUnidadeMedidaRepository) {
        this.tbUnidadeMedidaRepository = tbUnidadeMedidaRepository;
    }

    /**
     * {@code POST  /tb-unidade-medidas} : Create a new tbUnidadeMedida.
     *
     * @param tbUnidadeMedida the tbUnidadeMedida to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tbUnidadeMedida, or with status {@code 400 (Bad Request)} if the tbUnidadeMedida has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tb-unidade-medidas")
    public ResponseEntity<TbUnidadeMedida> createTbUnidadeMedida(@RequestBody TbUnidadeMedida tbUnidadeMedida) throws URISyntaxException {
        log.debug("REST request to save TbUnidadeMedida : {}", tbUnidadeMedida);
        if (tbUnidadeMedida.getId() != null) {
            throw new BadRequestAlertException("A new tbUnidadeMedida cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TbUnidadeMedida result = tbUnidadeMedidaRepository.save(tbUnidadeMedida);
        return ResponseEntity.created(new URI("/api/tb-unidade-medidas/" + result.getId()))
        .headers(HeaderUtil.createAlert(applicationName,"A unidade de medida \"" + tbUnidadeMedida.getNmUnidadeMedida() + "\" foi criada com sucesso",""))
            .body(result);
    }

    /**
     * {@code PUT  /tb-unidade-medidas} : Updates an existing tbUnidadeMedida.
     *
     * @param tbUnidadeMedida the tbUnidadeMedida to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tbUnidadeMedida,
     * or with status {@code 400 (Bad Request)} if the tbUnidadeMedida is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tbUnidadeMedida couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tb-unidade-medidas")
    public ResponseEntity<TbUnidadeMedida> updateTbUnidadeMedida(@RequestBody TbUnidadeMedida tbUnidadeMedida) throws URISyntaxException {
        log.debug("REST request to update TbUnidadeMedida : {}", tbUnidadeMedida);
        if (tbUnidadeMedida.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TbUnidadeMedida result = tbUnidadeMedidaRepository.save(tbUnidadeMedida);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tbUnidadeMedida.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tb-unidade-medidas} : get all the tbUnidadeMedidas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tbUnidadeMedidas in body.
     */
    @GetMapping("/tb-unidade-medidas")
    public List<TbUnidadeMedida> getAllTbUnidadeMedidas() {
        log.debug("REST request to get all TbUnidadeMedidas");
        return tbUnidadeMedidaRepository.findAll();
    }

    /**
     * {@code GET  /tb-unidade-medidas/:id} : get the "id" tbUnidadeMedida.
     *
     * @param id the id of the tbUnidadeMedida to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tbUnidadeMedida, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tb-unidade-medidas/{id}")
    public ResponseEntity<TbUnidadeMedida> getTbUnidadeMedida(@PathVariable Long id) {
        log.debug("REST request to get TbUnidadeMedida : {}", id);
        Optional<TbUnidadeMedida> tbUnidadeMedida = tbUnidadeMedidaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tbUnidadeMedida);
    }

    /**
     * {@code DELETE  /tb-unidade-medidas/:id} : delete the "id" tbUnidadeMedida.
     *
     * @param id the id of the tbUnidadeMedida to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tb-unidade-medidas/{id}")
    public ResponseEntity<Void> deleteTbUnidadeMedida(@PathVariable Long id) {
        log.debug("REST request to delete TbUnidadeMedida : {}", id);
        tbUnidadeMedidaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
