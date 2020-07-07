package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class PuestosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Puestos.class);
        Puestos puestos1 = new Puestos();
        puestos1.setId(1L);
        Puestos puestos2 = new Puestos();
        puestos2.setId(puestos1.getId());
        assertThat(puestos1).isEqualTo(puestos2);
        puestos2.setId(2L);
        assertThat(puestos1).isNotEqualTo(puestos2);
        puestos1.setId(null);
        assertThat(puestos1).isNotEqualTo(puestos2);
    }
}
