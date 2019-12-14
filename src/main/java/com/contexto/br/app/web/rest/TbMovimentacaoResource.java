package com.contexto.br.app.web.rest;

import com.contexto.br.app.domain.TbMovimentacao;
import com.contexto.br.app.repository.TbMovimentacaoRepository;
import com.contexto.br.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


/**
 * REST controller for managing {@link com.contexto.br.app.domain.TbMovimentacao}.
 */
@RestController
@RequestMapping("/api")
public class TbMovimentacaoResource {

    private final Logger log = LoggerFactory.getLogger(TbMovimentacaoResource.class);

    private static final String ENTITY_NAME = "tbMovimentacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TbMovimentacaoRepository tbMovimentacaoRepository;

    public TbMovimentacaoResource(final TbMovimentacaoRepository tbMovimentacaoRepository) {
        this.tbMovimentacaoRepository = tbMovimentacaoRepository;
    }

    /**
     * {@code POST  /tb-movimentacaos} : Create a new tbMovimentacao.
     *
     * @param tbMovimentacao the tbMovimentacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tbMovimentacao, or with status {@code 400 (Bad Request)} if the tbMovimentacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tb-movimentacaos")
    public ResponseEntity<TbMovimentacao> createTbMovimentacao(@RequestBody final TbMovimentacao tbMovimentacao) throws URISyntaxException {
        log.debug("REST request to save TbMovimentacao : {}", tbMovimentacao);
        if (tbMovimentacao.getId() != null) {
            throw new BadRequestAlertException("A new tbMovimentacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tbMovimentacaoRepository.save(tbMovimentacao);
        return null;
    }

    /**
     * {@code PUT  /tb-movimentacaos} : Updates an existing tbMovimentacao.
     *
     * @param tbMovimentacao the tbMovimentacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tbMovimentacao,
     * or with status {@code 400 (Bad Request)} if the tbMovimentacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tbMovimentacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tb-movimentacaos")
    public ResponseEntity<TbMovimentacao> updateTbMovimentacao(@RequestBody final TbMovimentacao tbMovimentacao) throws URISyntaxException {
        log.debug("REST request to update TbMovimentacao : {}", tbMovimentacao);
        if (tbMovimentacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        final TbMovimentacao result = tbMovimentacaoRepository.save(tbMovimentacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tbMovimentacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tb-movimentacaos} : get all the tbMovimentacaos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tbMovimentacaos in body.
     */
    
    @GetMapping("/tb-movimentacaos")
    public List<TbMovimentacao> getAllTbMovimentacaos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TbMovimentacaos");
        return tbMovimentacaoRepository.findAll();
    }

    /*@GetMapping("/tb-movimentacaos")
    public ResponseEntity<List<TbMovimentacao>> getAllTbMovimentacaos(final Pageable pageable) {
        log.debug("REST request to get all TbMovimentacaos");
        final Page<TbMovimentacao> page = tbMovimentacaoRepository.findAll(pageable);
        final HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }*/

    /**
     * {@code GET  /tb-movimentacaos/:id} : get the "id" tbMovimentacao.
     *
     * @param id the id of the tbMovimentacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tbMovimentacao, or with status {@code 404 (Not Found)}.
     */
    
    /* @GetMapping("/tb-movimentacaos/{id}")
    public ResponseEntity<TbMovimentacao> getTbMovimentacao(@PathVariable Long id) {
        log.debug("REST request to get TbMovimentacao : {}", id);
        Optional<TbMovimentacao> tbMovimentacao = tbMovimentacaoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(tbMovimentacao);
    }*/

    /**
     * {@code DELETE  /tb-movimentacaos/:id} : delete the "id" tbMovimentacao.
     *
     * @param id the id of the tbMovimentacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tb-movimentacaos/{id}")
    public ResponseEntity<Void> deleteTbMovimentacao(@PathVariable final Long id) {
        log.debug("REST request to delete TbMovimentacao : {}", id);
        tbMovimentacaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
