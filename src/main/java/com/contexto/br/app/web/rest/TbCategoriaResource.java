package com.contexto.br.app.web.rest;

import com.contexto.br.app.domain.TbCategoria;
import com.contexto.br.app.repository.TbCategoriaRepository;
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

@RestController
@RequestMapping("/api")
public class TbCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(TbCategoriaResource.class);

    private static final String ENTITY_NAME = "tbCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TbCategoriaRepository tbCategoriaRepository;

    public TbCategoriaResource(TbCategoriaRepository tbCategoriaRepository) {
        this.tbCategoriaRepository = tbCategoriaRepository;
    }

    @PostMapping("/tb-categorias")
    public ResponseEntity<TbCategoria> createTbCategoria(@RequestBody TbCategoria tbCategoria) throws URISyntaxException {
        log.debug("REST request to save TbCategoria : {}", tbCategoria);
        if (tbCategoria.getId() != null) {
            throw new BadRequestAlertException("A new tbCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TbCategoria result = tbCategoriaRepository.save(tbCategoria);
        return ResponseEntity.created(new URI("/api/tb-categorias/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    @PutMapping("/tb-categorias")
    public ResponseEntity<TbCategoria> updateTbCategoria(@RequestBody TbCategoria tbCategoria) throws URISyntaxException {
        log.debug("REST request to update TbCategoria : {}", tbCategoria);
        if (tbCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TbCategoria result = tbCategoriaRepository.save(tbCategoria);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tbCategoria.getId().toString()))
                .body(result);
    }

    @GetMapping("/tb-categorias")
    public List<TbCategoria> getAllTbCategorias() {
        log.debug("REST request to get all TbCategorias");
        return tbCategoriaRepository.findAll();
    }

    @GetMapping("/tb-categorias/{id}")
    public ResponseEntity<TbCategoria> getTbCategoria(@PathVariable Long id) {
        log.debug("REST request to get TbCategoria : {}", id);
        Optional<TbCategoria> tbCategoria = tbCategoriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tbCategoria);
    }

    @DeleteMapping("/tb-categorias/{id}")
    public ResponseEntity<Void> deleteTbCategoria(@PathVariable Long id) {
        log.debug("REST request to delete TbCategoria : {}", id);
        tbCategoriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
