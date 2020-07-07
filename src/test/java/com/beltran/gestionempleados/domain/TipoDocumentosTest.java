package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class TipoDocumentosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDocumentos.class);
        TipoDocumentos tipoDocumentos1 = new TipoDocumentos();
        tipoDocumentos1.setId(1L);
        TipoDocumentos tipoDocumentos2 = new TipoDocumentos();
        tipoDocumentos2.setId(tipoDocumentos1.getId());
        assertThat(tipoDocumentos1).isEqualTo(tipoDocumentos2);
        tipoDocumentos2.setId(2L);
        assertThat(tipoDocumentos1).isNotEqualTo(tipoDocumentos2);
        tipoDocumentos1.setId(null);
        assertThat(tipoDocumentos1).isNotEqualTo(tipoDocumentos2);
    }
}
