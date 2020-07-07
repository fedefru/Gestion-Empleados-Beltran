package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class ProvinciasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Provincias.class);
        Provincias provincias1 = new Provincias();
        provincias1.setId(1L);
        Provincias provincias2 = new Provincias();
        provincias2.setId(provincias1.getId());
        assertThat(provincias1).isEqualTo(provincias2);
        provincias2.setId(2L);
        assertThat(provincias1).isNotEqualTo(provincias2);
        provincias1.setId(null);
        assertThat(provincias1).isNotEqualTo(provincias2);
    }
}
