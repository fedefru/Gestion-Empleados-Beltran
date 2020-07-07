package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class CiudadesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ciudades.class);
        Ciudades ciudades1 = new Ciudades();
        ciudades1.setId(1L);
        Ciudades ciudades2 = new Ciudades();
        ciudades2.setId(ciudades1.getId());
        assertThat(ciudades1).isEqualTo(ciudades2);
        ciudades2.setId(2L);
        assertThat(ciudades1).isNotEqualTo(ciudades2);
        ciudades1.setId(null);
        assertThat(ciudades1).isNotEqualTo(ciudades2);
    }
}
