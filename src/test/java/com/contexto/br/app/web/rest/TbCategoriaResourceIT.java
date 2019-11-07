package com.contexto.br.app.web.rest;

import com.contexto.br.app.ContextoApp;
import com.contexto.br.app.domain.TbCategoria;
import com.contexto.br.app.repository.TbCategoriaRepository;
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
 * Integration tests for the {@link TbCategoriaResource} REST controller.
 */
@SpringBootTest(classes = ContextoApp.class)
public class TbCategoriaResourceIT {

    private static final Integer DEFAULT_ID_TB_CATEGORIA = 1;
    private static final Integer UPDATED_ID_TB_CATEGORIA = 2;
    private static final Integer SMALLER_ID_TB_CATEGORIA = 1 - 1;

    private static final String DEFAULT_NM_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_NM_CATEGORIA = "BBBBBBBBBB";

    @Autowired
    private TbCategoriaRepository tbCategoriaRepository;

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

    private MockMvc restTbCategoriaMockMvc;

    private TbCategoria tbCategoria;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TbCategoriaResource tbCategoriaResource = new TbCategoriaResource(tbCategoriaRepository);
        this.restTbCategoriaMockMvc = MockMvcBuilders.standaloneSetup(tbCategoriaResource)
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
    public static TbCategoria createEntity(EntityManager em) {
        TbCategoria tbCategoria = new TbCategoria()
            .idTbCategoria(DEFAULT_ID_TB_CATEGORIA)
            .nmCategoria(DEFAULT_NM_CATEGORIA);
        return tbCategoria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TbCategoria createUpdatedEntity(EntityManager em) {
        TbCategoria tbCategoria = new TbCategoria()
            .idTbCategoria(UPDATED_ID_TB_CATEGORIA)
            .nmCategoria(UPDATED_NM_CATEGORIA);
        return tbCategoria;
    }

    @BeforeEach
    public void initTest() {
        tbCategoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createTbCategoria() throws Exception {
        int databaseSizeBeforeCreate = tbCategoriaRepository.findAll().size();

        // Create the TbCategoria
        restTbCategoriaMockMvc.perform(post("/api/tb-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbCategoria)))
            .andExpect(status().isCreated());

        // Validate the TbCategoria in the database
        List<TbCategoria> tbCategoriaList = tbCategoriaRepository.findAll();
        assertThat(tbCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        TbCategoria testTbCategoria = tbCategoriaList.get(tbCategoriaList.size() - 1);
        assertThat(testTbCategoria.getIdTbCategoria()).isEqualTo(DEFAULT_ID_TB_CATEGORIA);
        assertThat(testTbCategoria.getNmCategoria()).isEqualTo(DEFAULT_NM_CATEGORIA);
    }

    @Test
    @Transactional
    public void createTbCategoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tbCategoriaRepository.findAll().size();

        // Create the TbCategoria with an existing ID
        tbCategoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTbCategoriaMockMvc.perform(post("/api/tb-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the TbCategoria in the database
        List<TbCategoria> tbCategoriaList = tbCategoriaRepository.findAll();
        assertThat(tbCategoriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTbCategorias() throws Exception {
        // Initialize the database
        tbCategoriaRepository.saveAndFlush(tbCategoria);

        // Get all the tbCategoriaList
        restTbCategoriaMockMvc.perform(get("/api/tb-categorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tbCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTbCategoria").value(hasItem(DEFAULT_ID_TB_CATEGORIA)))
            .andExpect(jsonPath("$.[*].nmCategoria").value(hasItem(DEFAULT_NM_CATEGORIA.toString())));
    }
    
    @Test
    @Transactional
    public void getTbCategoria() throws Exception {
        // Initialize the database
        tbCategoriaRepository.saveAndFlush(tbCategoria);

        // Get the tbCategoria
        restTbCategoriaMockMvc.perform(get("/api/tb-categorias/{id}", tbCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tbCategoria.getId().intValue()))
            .andExpect(jsonPath("$.idTbCategoria").value(DEFAULT_ID_TB_CATEGORIA))
            .andExpect(jsonPath("$.nmCategoria").value(DEFAULT_NM_CATEGORIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTbCategoria() throws Exception {
        // Get the tbCategoria
        restTbCategoriaMockMvc.perform(get("/api/tb-categorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTbCategoria() throws Exception {
        // Initialize the database
        tbCategoriaRepository.saveAndFlush(tbCategoria);

        int databaseSizeBeforeUpdate = tbCategoriaRepository.findAll().size();

        // Update the tbCategoria
        TbCategoria updatedTbCategoria = tbCategoriaRepository.findById(tbCategoria.getId()).get();
        // Disconnect from session so that the updates on updatedTbCategoria are not directly saved in db
        em.detach(updatedTbCategoria);
        updatedTbCategoria
            .idTbCategoria(UPDATED_ID_TB_CATEGORIA)
            .nmCategoria(UPDATED_NM_CATEGORIA);

        restTbCategoriaMockMvc.perform(put("/api/tb-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTbCategoria)))
            .andExpect(status().isOk());

        // Validate the TbCategoria in the database
        List<TbCategoria> tbCategoriaList = tbCategoriaRepository.findAll();
        assertThat(tbCategoriaList).hasSize(databaseSizeBeforeUpdate);
        TbCategoria testTbCategoria = tbCategoriaList.get(tbCategoriaList.size() - 1);
        assertThat(testTbCategoria.getIdTbCategoria()).isEqualTo(UPDATED_ID_TB_CATEGORIA);
        assertThat(testTbCategoria.getNmCategoria()).isEqualTo(UPDATED_NM_CATEGORIA);
    }

    @Test
    @Transactional
    public void updateNonExistingTbCategoria() throws Exception {
        int databaseSizeBeforeUpdate = tbCategoriaRepository.findAll().size();

        // Create the TbCategoria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTbCategoriaMockMvc.perform(put("/api/tb-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the TbCategoria in the database
        List<TbCategoria> tbCategoriaList = tbCategoriaRepository.findAll();
        assertThat(tbCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTbCategoria() throws Exception {
        // Initialize the database
        tbCategoriaRepository.saveAndFlush(tbCategoria);

        int databaseSizeBeforeDelete = tbCategoriaRepository.findAll().size();

        // Delete the tbCategoria
        restTbCategoriaMockMvc.perform(delete("/api/tb-categorias/{id}", tbCategoria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TbCategoria> tbCategoriaList = tbCategoriaRepository.findAll();
        assertThat(tbCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TbCategoria.class);
        TbCategoria tbCategoria1 = new TbCategoria();
        tbCategoria1.setId(1L);
        TbCategoria tbCategoria2 = new TbCategoria();
        tbCategoria2.setId(tbCategoria1.getId());
        assertThat(tbCategoria1).isEqualTo(tbCategoria2);
        tbCategoria2.setId(2L);
        assertThat(tbCategoria1).isNotEqualTo(tbCategoria2);
        tbCategoria1.setId(null);
        assertThat(tbCategoria1).isNotEqualTo(tbCategoria2);
    }
}
