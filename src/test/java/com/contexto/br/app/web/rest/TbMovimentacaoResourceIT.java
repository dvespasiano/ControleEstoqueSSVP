package com.contexto.br.app.web.rest;

import com.contexto.br.app.ContextoApp;
import com.contexto.br.app.domain.TbMovimentacao;
import com.contexto.br.app.repository.TbMovimentacaoRepository;
import com.contexto.br.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.contexto.br.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TbMovimentacaoResource} REST controller.
 */
@SpringBootTest(classes = ContextoApp.class)
public class TbMovimentacaoResourceIT {

    private static final Integer DEFAULT_ID_TB_MOVIMENTACAO = 1;
    private static final Integer UPDATED_ID_TB_MOVIMENTACAO = 2;
    private static final Integer SMALLER_ID_TB_MOVIMENTACAO = 1 - 1;

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;
    private static final Integer SMALLER_QUANTIDADE = 1 - 1;

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATA = LocalDate.ofEpochDay(-1L);

    private static final Integer DEFAULT_ENTRADA = 1;
    private static final Integer UPDATED_ENTRADA = 2;
    private static final Integer SMALLER_ENTRADA = 1 - 1;

    @Autowired
    private TbMovimentacaoRepository tbMovimentacaoRepository;

    @Mock
    private TbMovimentacaoRepository tbMovimentacaoRepositoryMock;

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

    private MockMvc restTbMovimentacaoMockMvc;

    private TbMovimentacao tbMovimentacao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TbMovimentacaoResource tbMovimentacaoResource = new TbMovimentacaoResource(tbMovimentacaoRepository);
        this.restTbMovimentacaoMockMvc = MockMvcBuilders.standaloneSetup(tbMovimentacaoResource)
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
    public static TbMovimentacao createEntity(EntityManager em) {
        TbMovimentacao tbMovimentacao = new TbMovimentacao()
            .idTbMovimentacao(DEFAULT_ID_TB_MOVIMENTACAO)
            .quantidade(DEFAULT_QUANTIDADE)
            .data(DEFAULT_DATA)
            .entrada(DEFAULT_ENTRADA);
        return tbMovimentacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TbMovimentacao createUpdatedEntity(EntityManager em) {
        TbMovimentacao tbMovimentacao = new TbMovimentacao()
            .idTbMovimentacao(UPDATED_ID_TB_MOVIMENTACAO)
            .quantidade(UPDATED_QUANTIDADE)
            .data(UPDATED_DATA)
            .entrada(UPDATED_ENTRADA);
        return tbMovimentacao;
    }

    @BeforeEach
    public void initTest() {
        tbMovimentacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createTbMovimentacao() throws Exception {
        int databaseSizeBeforeCreate = tbMovimentacaoRepository.findAll().size();

        // Create the TbMovimentacao
        restTbMovimentacaoMockMvc.perform(post("/api/tb-movimentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbMovimentacao)))
            .andExpect(status().isCreated());

        // Validate the TbMovimentacao in the database
        List<TbMovimentacao> tbMovimentacaoList = tbMovimentacaoRepository.findAll();
        assertThat(tbMovimentacaoList).hasSize(databaseSizeBeforeCreate + 1);
        TbMovimentacao testTbMovimentacao = tbMovimentacaoList.get(tbMovimentacaoList.size() - 1);
        assertThat(testTbMovimentacao.getIdTbMovimentacao()).isEqualTo(DEFAULT_ID_TB_MOVIMENTACAO);
        assertThat(testTbMovimentacao.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testTbMovimentacao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testTbMovimentacao.getEntrada()).isEqualTo(DEFAULT_ENTRADA);
    }

    @Test
    @Transactional
    public void createTbMovimentacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tbMovimentacaoRepository.findAll().size();

        // Create the TbMovimentacao with an existing ID
        tbMovimentacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTbMovimentacaoMockMvc.perform(post("/api/tb-movimentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbMovimentacao)))
            .andExpect(status().isBadRequest());

        // Validate the TbMovimentacao in the database
        List<TbMovimentacao> tbMovimentacaoList = tbMovimentacaoRepository.findAll();
        assertThat(tbMovimentacaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTbMovimentacaos() throws Exception {
        // Initialize the database
        tbMovimentacaoRepository.saveAndFlush(tbMovimentacao);

        // Get all the tbMovimentacaoList
        restTbMovimentacaoMockMvc.perform(get("/api/tb-movimentacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tbMovimentacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTbMovimentacao").value(hasItem(DEFAULT_ID_TB_MOVIMENTACAO)))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].entrada").value(hasItem(DEFAULT_ENTRADA)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTbMovimentacaosWithEagerRelationshipsIsEnabled() throws Exception {
        TbMovimentacaoResource tbMovimentacaoResource = new TbMovimentacaoResource(tbMovimentacaoRepositoryMock);
        when(tbMovimentacaoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTbMovimentacaoMockMvc = MockMvcBuilders.standaloneSetup(tbMovimentacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTbMovimentacaoMockMvc.perform(get("/api/tb-movimentacaos?eagerload=true"))
        .andExpect(status().isOk());

        verify(tbMovimentacaoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTbMovimentacaosWithEagerRelationshipsIsNotEnabled() throws Exception {
        TbMovimentacaoResource tbMovimentacaoResource = new TbMovimentacaoResource(tbMovimentacaoRepositoryMock);
            when(tbMovimentacaoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTbMovimentacaoMockMvc = MockMvcBuilders.standaloneSetup(tbMovimentacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTbMovimentacaoMockMvc.perform(get("/api/tb-movimentacaos?eagerload=true"))
        .andExpect(status().isOk());

            verify(tbMovimentacaoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTbMovimentacao() throws Exception {
        // Initialize the database
        tbMovimentacaoRepository.saveAndFlush(tbMovimentacao);

        // Get the tbMovimentacao
        restTbMovimentacaoMockMvc.perform(get("/api/tb-movimentacaos/{id}", tbMovimentacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tbMovimentacao.getId().intValue()))
            .andExpect(jsonPath("$.idTbMovimentacao").value(DEFAULT_ID_TB_MOVIMENTACAO))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.entrada").value(DEFAULT_ENTRADA));
    }

    @Test
    @Transactional
    public void getNonExistingTbMovimentacao() throws Exception {
        // Get the tbMovimentacao
        restTbMovimentacaoMockMvc.perform(get("/api/tb-movimentacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTbMovimentacao() throws Exception {
        // Initialize the database
        tbMovimentacaoRepository.saveAndFlush(tbMovimentacao);

        int databaseSizeBeforeUpdate = tbMovimentacaoRepository.findAll().size();

        // Update the tbMovimentacao
        TbMovimentacao updatedTbMovimentacao = tbMovimentacaoRepository.findById(tbMovimentacao.getId()).get();
        // Disconnect from session so that the updates on updatedTbMovimentacao are not directly saved in db
        em.detach(updatedTbMovimentacao);
        updatedTbMovimentacao
            .idTbMovimentacao(UPDATED_ID_TB_MOVIMENTACAO)
            .quantidade(UPDATED_QUANTIDADE)
            .data(UPDATED_DATA)
            .entrada(UPDATED_ENTRADA);

        restTbMovimentacaoMockMvc.perform(put("/api/tb-movimentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTbMovimentacao)))
            .andExpect(status().isOk());

        // Validate the TbMovimentacao in the database
        List<TbMovimentacao> tbMovimentacaoList = tbMovimentacaoRepository.findAll();
        assertThat(tbMovimentacaoList).hasSize(databaseSizeBeforeUpdate);
        TbMovimentacao testTbMovimentacao = tbMovimentacaoList.get(tbMovimentacaoList.size() - 1);
        assertThat(testTbMovimentacao.getIdTbMovimentacao()).isEqualTo(UPDATED_ID_TB_MOVIMENTACAO);
        assertThat(testTbMovimentacao.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testTbMovimentacao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testTbMovimentacao.getEntrada()).isEqualTo(UPDATED_ENTRADA);
    }

    @Test
    @Transactional
    public void updateNonExistingTbMovimentacao() throws Exception {
        int databaseSizeBeforeUpdate = tbMovimentacaoRepository.findAll().size();

        // Create the TbMovimentacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTbMovimentacaoMockMvc.perform(put("/api/tb-movimentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tbMovimentacao)))
            .andExpect(status().isBadRequest());

        // Validate the TbMovimentacao in the database
        List<TbMovimentacao> tbMovimentacaoList = tbMovimentacaoRepository.findAll();
        assertThat(tbMovimentacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTbMovimentacao() throws Exception {
        // Initialize the database
        tbMovimentacaoRepository.saveAndFlush(tbMovimentacao);

        int databaseSizeBeforeDelete = tbMovimentacaoRepository.findAll().size();

        // Delete the tbMovimentacao
        restTbMovimentacaoMockMvc.perform(delete("/api/tb-movimentacaos/{id}", tbMovimentacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TbMovimentacao> tbMovimentacaoList = tbMovimentacaoRepository.findAll();
        assertThat(tbMovimentacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TbMovimentacao.class);
        TbMovimentacao tbMovimentacao1 = new TbMovimentacao();
        tbMovimentacao1.setId(1L);
        TbMovimentacao tbMovimentacao2 = new TbMovimentacao();
        tbMovimentacao2.setId(tbMovimentacao1.getId());
        assertThat(tbMovimentacao1).isEqualTo(tbMovimentacao2);
        tbMovimentacao2.setId(2L);
        assertThat(tbMovimentacao1).isNotEqualTo(tbMovimentacao2);
        tbMovimentacao1.setId(null);
        assertThat(tbMovimentacao1).isNotEqualTo(tbMovimentacao2);
    }
}
