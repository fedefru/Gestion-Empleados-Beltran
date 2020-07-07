package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class TipoContactosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoContactos.class);
        TipoContactos tipoContactos1 = new TipoContactos();
        tipoContactos1.setId(1L);
        TipoContactos tipoContactos2 = new TipoContactos();
        tipoContactos2.setId(tipoContactos1.getId());
        assertThat(tipoContactos1).isEqualTo(tipoContactos2);
        tipoContactos2.setId(2L);
        assertThat(tipoContactos1).isNotEqualTo(tipoContactos2);
        tipoContactos1.setId(null);
        assertThat(tipoContactos1).isNotEqualTo(tipoContactos2);
    }
}
