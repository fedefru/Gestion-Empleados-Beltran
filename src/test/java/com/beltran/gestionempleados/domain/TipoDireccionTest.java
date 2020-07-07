package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class TipoDireccionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDireccion.class);
        TipoDireccion tipoDireccion1 = new TipoDireccion();
        tipoDireccion1.setId(1L);
        TipoDireccion tipoDireccion2 = new TipoDireccion();
        tipoDireccion2.setId(tipoDireccion1.getId());
        assertThat(tipoDireccion1).isEqualTo(tipoDireccion2);
        tipoDireccion2.setId(2L);
        assertThat(tipoDireccion1).isNotEqualTo(tipoDireccion2);
        tipoDireccion1.setId(null);
        assertThat(tipoDireccion1).isNotEqualTo(tipoDireccion2);
    }
}
