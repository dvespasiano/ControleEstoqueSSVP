package com.contexto.br.app.web.rest;

import com.contexto.br.app.domain.TbProduto;
import com.contexto.br.app.repository.TbProdutoRepository;
import com.contexto.br.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.contexto.br.app.domain.TbProduto}.
 */
@RestController
@RequestMapping("/api")
public class TbProdutoResource {

    private final Logger log = LoggerFactory.getLogger(TbProdutoResource.class);

    private static final String ENTITY_NAME = "tbProduto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TbProdutoRepository tbProdutoRepository;

    public TbProdutoResource(TbProdutoRepository tbProdutoRepository) {
        this.tbProdutoRepository = tbProdutoRepository;
    }

    /**
     * {@code POST  /tb-produtos} : Create a new tbProduto.
     *
     * @param tbProduto the tbProduto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tbProduto, or with status {@code 400 (Bad Request)} if the tbProduto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tb-produtos")
    public ResponseEntity<TbProduto> createTbProduto(@RequestBody TbProduto tbProduto) throws URISyntaxException {
        log.debug("REST request to save TbProduto : {}", tbProduto);
        if (tbProduto.getId() != null) {
            throw new BadRequestAlertException("A new tbProduto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TbProduto result = tbProdutoRepository.save(tbProduto);
        return ResponseEntity.created(new URI("/api/tb-produtos/" + result.getId()))
            .headers(HeaderUtil.createAlert(applicationName,"O novo produto \"" + tbProduto.getNmProduto() + "\" foi criado com sucesso!" ,""))
            .body(result);
    }

    /**
     * {@code PUT  /tb-produtos} : Updates an existing tbProduto.
     *
     * @param tbProduto the tbProduto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tbProduto,
     * or with status {@code 400 (Bad Request)} if the tbProduto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tbProduto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tb-produtos")
    public ResponseEntity<TbProduto> updateTbProduto(@RequestBody TbProduto tbProduto) throws URISyntaxException {
        log.debug("REST request to update TbProduto : {}", tbProduto);
        if (tbProduto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TbProduto result = tbProdutoRepository.save(tbProduto);
        if(tbProduto.getAtivo() == 1) {
            return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(applicationName, "O estoque do \"" + tbProduto.getNmProduto() + "\" foi alterado para " + tbProduto.getQtdEstoque(), ""))
            .body(result);
        }else {
            return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(applicationName, "O produto \"" + tbProduto.getNmProduto() + "\" foi excluido", ""))
            .body(result);
        }
        
    }

    /**
     * {@code GET  /tb-produtos} : get all the tbProdutos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tbProdutos in body.
     */
    @GetMapping("/tb-produtos")
    public ResponseEntity<List<TbProduto>> getAllTbProdutos(Pageable pageable) {
        log.debug("REST request to get a page of TbProdutos");
        Page<TbProduto> page = tbProdutoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tb-produtos/:id} : get the "id" tbProduto.
     *
     * @param id the id of the tbProduto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tbProduto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tb-produtos/{id}")
    public ResponseEntity<TbProduto> getTbProduto(@PathVariable Long id) {
        log.debug("REST request to get TbProduto : {}", id);
        Optional<TbProduto> tbProduto = tbProdutoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tbProduto);
    }

    /**
     * {@code DELETE  /tb-produtos/:id} : delete the "id" tbProduto.
     *
     * @param id the id of the tbProduto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tb-produtos/{id}")
    public ResponseEntity<Void> deleteTbProduto(@PathVariable Long id) {
        log.debug("REST request to delete TbProduto : {}", id);
        tbProdutoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
