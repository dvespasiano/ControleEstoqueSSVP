package com.contexto.br.app.web.rest;

import com.contexto.br.app.ContextoApp;
import com.contexto.br.app.domain.TbUnidadeMedida;
import com.contexto.br.app.repository.TbUnidadeMedidaRepository;
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
 * Integration tests for the {@link TbUnidadeMedidaResource} REST controller.
 */
@SpringBootTest(classes = ContextoApp.class)
public class TbUnidadeMedidaResourceIT {

    private static final Integer DEFAULT_ID_TB_UNIDADE_MEDIDA = 1;
    private static final Integer UPDATED_ID_TB_UNIDADE_MEDIDA = 2;
    private static final Integer SMALLER_ID_TB_UNIDADE_MEDIDA = 1 - 1;

    private static final String DEFAULT_NM_UNIDADE_MEDIDA = "AAAAAAAAAA";
    private static final String UPDATED_NM_UNIDADE_MEDIDA = "BBBBBBBBBB";

    @Autowired
    private TbUnidadeMedidaRepository tbUnidadeMedidaRepository;

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

    private MockMvc restTbUnidadeMedidaMockMvc;

    private TbUnidadeMedida tbUnidadeMedida;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TbUnidadeMedidaResource tbUnidadeMedidaResource = new TbUnidadeMedidaResource(tbUnidadeMedidaRepository);
        this.restTbUnidadeMedidaMockMvc = MockMvcBuilders.standaloneSetup(tbUnidadeMedidaResource)
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
    public static TbUnidadeMedida createEntity(EntityManager em) {
        TbUnidadeMedida tbUnidadeMedida = new TbUnidadeMedida()
            .idTbUnidadeMedida(DEFAULT_ID_TB_UNIDADE_MEDIDA)
            .nmUnidadeMedida(DEFAULT_NM_UNIDADE_MEDIDA);
        return tbUnidadeMedida;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TbUnidadeMedida createUpdatedEntity(EntityManager em) {
        TbUnidadeMedida tbUnidadeMedida = new TbUnidadeMedida()
            .idTbUnidadeMedida(UPDATED_ID_TB_UNIDADE_MEDIDA)
            .nmUnidadeMedida(UPDATED_NM_UNIDADE_MEDIDA);
        return tbUnidadeMedida;
    }

    @BeforeEach
    public void initTest() {
        tbUnidadeMedida = createEntity(em);
    }

    @Test
    @Transactional
    public void createTbUnidadeMedida() throws Exception {
        int databaseSizeBeforeCreate = tbUnidadeMedidaRepository.findAll().size();

        // Create the TbUnidadeMedida
        restTbUnidadeMedidaMockMvc.perform(post("/api/tb-unidade-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbUnidadeMedida)))
            .andExpect(status().isCreated());

        // Validate the TbUnidadeMedida in the database
        List<TbUnidadeMedida> tbUnidadeMedidaList = tbUnidadeMedidaRepository.findAll();
        assertThat(tbUnidadeMedidaList).hasSize(databaseSizeBeforeCreate + 1);
        TbUnidadeMedida testTbUnidadeMedida = tbUnidadeMedidaList.get(tbUnidadeMedidaList.size() - 1);
        assertThat(testTbUnidadeMedida.getIdTbUnidadeMedida()).isEqualTo(DEFAULT_ID_TB_UNIDADE_MEDIDA);
        assertThat(testTbUnidadeMedida.getNmUnidadeMedida()).isEqualTo(DEFAULT_NM_UNIDADE_MEDIDA);
    }

    @Test
    @Transactional
    public void createTbUnidadeMedidaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tbUnidadeMedidaRepository.findAll().size();

        // Create the TbUnidadeMedida with an existing ID
        tbUnidadeMedida.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTbUnidadeMedidaMockMvc.perform(post("/api/tb-unidade-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbUnidadeMedida)))
            .andExpect(status().isBadRequest());

        // Validate the TbUnidadeMedida in the database
        List<TbUnidadeMedida> tbUnidadeMedidaList = tbUnidadeMedidaRepository.findAll();
        assertThat(tbUnidadeMedidaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTbUnidadeMedidas() throws Exception {
        // Initialize the database
        tbUnidadeMedidaRepository.saveAndFlush(tbUnidadeMedida);

        // Get all the tbUnidadeMedidaList
        restTbUnidadeMedidaMockMvc.perform(get("/api/tb-unidade-medidas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tbUnidadeMedida.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTbUnidadeMedida").value(hasItem(DEFAULT_ID_TB_UNIDADE_MEDIDA)))
            .andExpect(jsonPath("$.[*].nmUnidadeMedida").value(hasItem(DEFAULT_NM_UNIDADE_MEDIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getTbUnidadeMedida() throws Exception {
        // Initialize the database
        tbUnidadeMedidaRepository.saveAndFlush(tbUnidadeMedida);

        // Get the tbUnidadeMedida
        restTbUnidadeMedidaMockMvc.perform(get("/api/tb-unidade-medidas/{id}", tbUnidadeMedida.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tbUnidadeMedida.getId().intValue()))
            .andExpect(jsonPath("$.idTbUnidadeMedida").value(DEFAULT_ID_TB_UNIDADE_MEDIDA))
            .andExpect(jsonPath("$.nmUnidadeMedida").value(DEFAULT_NM_UNIDADE_MEDIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTbUnidadeMedida() throws Exception {
        // Get the tbUnidadeMedida
        restTbUnidadeMedidaMockMvc.perform(get("/api/tb-unidade-medidas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTbUnidadeMedida() throws Exception {
        // Initialize the database
        tbUnidadeMedidaRepository.saveAndFlush(tbUnidadeMedida);

        int databaseSizeBeforeUpdate = tbUnidadeMedidaRepository.findAll().size();

        // Update the tbUnidadeMedida
        TbUnidadeMedida updatedTbUnidadeMedida = tbUnidadeMedidaRepository.findById(tbUnidadeMedida.getId()).get();
        // Disconnect from session so that the updates on updatedTbUnidadeMedida are not directly saved in db
        em.detach(updatedTbUnidadeMedida);
        updatedTbUnidadeMedida
            .idTbUnidadeMedida(UPDATED_ID_TB_UNIDADE_MEDIDA)
            .nmUnidadeMedida(UPDATED_NM_UNIDADE_MEDIDA);

        restTbUnidadeMedidaMockMvc.perform(put("/api/tb-unidade-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTbUnidadeMedida)))
            .andExpect(status().isOk());

        // Validate the TbUnidadeMedida in the database
        List<TbUnidadeMedida> tbUnidadeMedidaList = tbUnidadeMedidaRepository.findAll();
        assertThat(tbUnidadeMedidaList).hasSize(databaseSizeBeforeUpdate);
        TbUnidadeMedida testTbUnidadeMedida = tbUnidadeMedidaList.get(tbUnidadeMedidaList.size() - 1);
        assertThat(testTbUnidadeMedida.getIdTbUnidadeMedida()).isEqualTo(UPDATED_ID_TB_UNIDADE_MEDIDA);
        assertThat(testTbUnidadeMedida.getNmUnidadeMedida()).isEqualTo(UPDATED_NM_UNIDADE_MEDIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingTbUnidadeMedida() throws Exception {
        int databaseSizeBeforeUpdate = tbUnidadeMedidaRepository.findAll().size();

        // Create the TbUnidadeMedida

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTbUnidadeMedidaMockMvc.perform(put("/api/tb-unidade-medidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbUnidadeMedida)))
            .andExpect(status().isBadRequest());

        // Validate the TbUnidadeMedida in the database
        List<TbUnidadeMedida> tbUnidadeMedidaList = tbUnidadeMedidaRepository.findAll();
        assertThat(tbUnidadeMedidaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTbUnidadeMedida() throws Exception {
        // Initialize the database
        tbUnidadeMedidaRepository.saveAndFlush(tbUnidadeMedida);

        int databaseSizeBeforeDelete = tbUnidadeMedidaRepository.findAll().size();

        // Delete the tbUnidadeMedida
        restTbUnidadeMedidaMockMvc.perform(delete("/api/tb-unidade-medidas/{id}", tbUnidadeMedida.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TbUnidadeMedida> tbUnidadeMedidaList = tbUnidadeMedidaRepository.findAll();
        assertThat(tbUnidadeMedidaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TbUnidadeMedida.class);
        TbUnidadeMedida tbUnidadeMedida1 = new TbUnidadeMedida();
        tbUnidadeMedida1.setId(1L);
        TbUnidadeMedida tbUnidadeMedida2 = new TbUnidadeMedida();
        tbUnidadeMedida2.setId(tbUnidadeMedida1.getId());
        assertThat(tbUnidadeMedida1).isEqualTo(tbUnidadeMedida2);
        tbUnidadeMedida2.setId(2L);
        assertThat(tbUnidadeMedida1).isNotEqualTo(tbUnidadeMedida2);
        tbUnidadeMedida1.setId(null);
        assertThat(tbUnidadeMedida1).isNotEqualTo(tbUnidadeMedida2);
    }
}
