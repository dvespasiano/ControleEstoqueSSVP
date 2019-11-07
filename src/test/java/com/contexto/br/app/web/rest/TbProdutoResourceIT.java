package com.contexto.br.app.web.rest;

import com.contexto.br.app.ContextoApp;
import com.contexto.br.app.domain.TbProduto;
import com.contexto.br.app.repository.TbProdutoRepository;
import com.contexto.br.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.contexto.br.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TbProdutoResource} REST controller.
 */
@SpringBootTest(classes = ContextoApp.class)
public class TbProdutoResourceIT {

    private static final Integer DEFAULT_ID_TB_PRODUTO = 1;
    private static final Integer UPDATED_ID_TB_PRODUTO = 2;
    private static final Integer SMALLER_ID_TB_PRODUTO = 1 - 1;

    private static final String DEFAULT_NM_PRODUTO = "AAAAAAAAAA";
    private static final String UPDATED_NM_PRODUTO = "BBBBBBBBBB";

    private static final String DEFAULT_QTD_ESTOQUE = "AAAAAAAAAA";
    private static final String UPDATED_QTD_ESTOQUE = "BBBBBBBBBB";

    private static final String DEFAULT_QTD_MIN = "AAAAAAAAAA";
    private static final String UPDATED_QTD_MIN = "BBBBBBBBBB";

    private static final Integer DEFAULT_ATIVO = 1;
    private static final Integer UPDATED_ATIVO = 2;
    private static final Integer SMALLER_ATIVO = 1 - 1;

    @Autowired
    private TbProdutoRepository tbProdutoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTbProdutoMockMvc;

    private TbProduto tbProduto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TbProdutoResource tbProdutoResource = new TbProdutoResource(tbProdutoRepository);
        this.restTbProdutoMockMvc = MockMvcBuilders.standaloneSetup(tbProdutoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TbProduto createEntity(EntityManager em) {
        TbProduto tbProduto = new TbProduto()
            .idTbProduto(DEFAULT_ID_TB_PRODUTO)
            .nmProduto(DEFAULT_NM_PRODUTO)
            .qtdEstoque(DEFAULT_QTD_ESTOQUE)
            .qtdMin(DEFAULT_QTD_MIN)
            .ativo(DEFAULT_ATIVO);
        return tbProduto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TbProduto createUpdatedEntity(EntityManager em) {
        TbProduto tbProduto = new TbProduto()
            .idTbProduto(UPDATED_ID_TB_PRODUTO)
            .nmProduto(UPDATED_NM_PRODUTO)
            .qtdEstoque(UPDATED_QTD_ESTOQUE)
            .qtdMin(UPDATED_QTD_MIN)
            .ativo(UPDATED_ATIVO);
        return tbProduto;
    }

    @BeforeEach
    public void initTest() {
        tbProduto = createEntity(em);
    }

    @Test
    @Transactional
    public void createTbProduto() throws Exception {
        int databaseSizeBeforeCreate = tbProdutoRepository.findAll().size();

        // Create the TbProduto
        restTbProdutoMockMvc.perform(post("/api/tb-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbProduto)))
            .andExpect(status().isCreated());

        // Validate the TbProduto in the database
        List<TbProduto> tbProdutoList = tbProdutoRepository.findAll();
        assertThat(tbProdutoList).hasSize(databaseSizeBeforeCreate + 1);
        TbProduto testTbProduto = tbProdutoList.get(tbProdutoList.size() - 1);
        assertThat(testTbProduto.getIdTbProduto()).isEqualTo(DEFAULT_ID_TB_PRODUTO);
        assertThat(testTbProduto.getNmProduto()).isEqualTo(DEFAULT_NM_PRODUTO);
        assertThat(testTbProduto.getQtdEstoque()).isEqualTo(DEFAULT_QTD_ESTOQUE);
        assertThat(testTbProduto.getQtdMin()).isEqualTo(DEFAULT_QTD_MIN);
        assertThat(testTbProduto.getAtivo()).isEqualTo(DEFAULT_ATIVO);
    }

    @Test
    @Transactional
    public void createTbProdutoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tbProdutoRepository.findAll().size();

        // Create the TbProduto with an existing ID
        tbProduto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTbProdutoMockMvc.perform(post("/api/tb-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbProduto)))
            .andExpect(status().isBadRequest());

        // Validate the TbProduto in the database
        List<TbProduto> tbProdutoList = tbProdutoRepository.findAll();
        assertThat(tbProdutoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTbProdutos() throws Exception {
        // Initialize the database
        tbProdutoRepository.saveAndFlush(tbProduto);

        // Get all the tbProdutoList
        restTbProdutoMockMvc.perform(get("/api/tb-produtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tbProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTbProduto").value(hasItem(DEFAULT_ID_TB_PRODUTO)))
            .andExpect(jsonPath("$.[*].nmProduto").value(hasItem(DEFAULT_NM_PRODUTO.toString())))
            .andExpect(jsonPath("$.[*].qtdEstoque").value(hasItem(DEFAULT_QTD_ESTOQUE.toString())))
            .andExpect(jsonPath("$.[*].qtdMin").value(hasItem(DEFAULT_QTD_MIN.toString())))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO)));
    }
    
    @Test
    @Transactional
    public void getTbProduto() throws Exception {
        // Initialize the database
        tbProdutoRepository.saveAndFlush(tbProduto);

        // Get the tbProduto
        restTbProdutoMockMvc.perform(get("/api/tb-produtos/{id}", tbProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tbProduto.getId().intValue()))
            .andExpect(jsonPath("$.idTbProduto").value(DEFAULT_ID_TB_PRODUTO))
            .andExpect(jsonPath("$.nmProduto").value(DEFAULT_NM_PRODUTO.toString()))
            .andExpect(jsonPath("$.qtdEstoque").value(DEFAULT_QTD_ESTOQUE.toString()))
            .andExpect(jsonPath("$.qtdMin").value(DEFAULT_QTD_MIN.toString()))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO));
    }

    @Test
    @Transactional
    public void getNonExistingTbProduto() throws Exception {
        // Get the tbProduto
        restTbProdutoMockMvc.perform(get("/api/tb-produtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTbProduto() throws Exception {
        // Initialize the database
        tbProdutoRepository.saveAndFlush(tbProduto);

        int databaseSizeBeforeUpdate = tbProdutoRepository.findAll().size();

        // Update the tbProduto
        TbProduto updatedTbProduto = tbProdutoRepository.findById(tbProduto.getId()).get();
        // Disconnect from session so that the updates on updatedTbProduto are not directly saved in db
        em.detach(updatedTbProduto);
        updatedTbProduto
            .idTbProduto(UPDATED_ID_TB_PRODUTO)
            .nmProduto(UPDATED_NM_PRODUTO)
            .qtdEstoque(UPDATED_QTD_ESTOQUE)
            .qtdMin(UPDATED_QTD_MIN)
            .ativo(UPDATED_ATIVO);

        restTbProdutoMockMvc.perform(put("/api/tb-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTbProduto)))
            .andExpect(status().isOk());

        // Validate the TbProduto in the database
        List<TbProduto> tbProdutoList = tbProdutoRepository.findAll();
        assertThat(tbProdutoList).hasSize(databaseSizeBeforeUpdate);
        TbProduto testTbProduto = tbProdutoList.get(tbProdutoList.size() - 1);
        assertThat(testTbProduto.getIdTbProduto()).isEqualTo(UPDATED_ID_TB_PRODUTO);
        assertThat(testTbProduto.getNmProduto()).isEqualTo(UPDATED_NM_PRODUTO);
        assertThat(testTbProduto.getQtdEstoque()).isEqualTo(UPDATED_QTD_ESTOQUE);
        assertThat(testTbProduto.getQtdMin()).isEqualTo(UPDATED_QTD_MIN);
        assertThat(testTbProduto.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingTbProduto() throws Exception {
        int databaseSizeBeforeUpdate = tbProdutoRepository.findAll().size();

        // Create the TbProduto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTbProdutoMockMvc.perform(put("/api/tb-produtos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbProduto)))
            .andExpect(status().isBadRequest());

        // Validate the TbProduto in the database
        List<TbProduto> tbProdutoList = tbProdutoRepository.findAll();
        assertThat(tbProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTbProduto() throws Exception {
        // Initialize the database
        tbProdutoRepository.saveAndFlush(tbProduto);

        int databaseSizeBeforeDelete = tbProdutoRepository.findAll().size();

        // Delete the tbProduto
        restTbProdutoMockMvc.perform(delete("/api/tb-produtos/{id}", tbProduto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TbProduto> tbProdutoList = tbProdutoRepository.findAll();
        assertThat(tbProdutoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TbProduto.class);
        TbProduto tbProduto1 = new TbProduto();
        tbProduto1.setId(1L);
        TbProduto tbProduto2 = new TbProduto();
        tbProduto2.setId(tbProduto1.getId());
        assertThat(tbProduto1).isEqualTo(tbProduto2);
        tbProduto2.setId(2L);
        assertThat(tbProduto1).isNotEqualTo(tbProduto2);
        tbProduto1.setId(null);
        assertThat(tbProduto1).isNotEqualTo(tbProduto2);
    }
}
