package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class DireccionesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Direcciones.class);
        Direcciones direcciones1 = new Direcciones();
        direcciones1.setId(1L);
        Direcciones direcciones2 = new Direcciones();
        direcciones2.setId(direcciones1.getId());
        assertThat(direcciones1).isEqualTo(direcciones2);
        direcciones2.setId(2L);
        assertThat(direcciones1).isNotEqualTo(direcciones2);
        direcciones1.setId(null);
        assertThat(direcciones1).isNotEqualTo(direcciones2);
    }
}
