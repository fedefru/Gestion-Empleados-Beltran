package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class PermisosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permisos.class);
        Permisos permisos1 = new Permisos();
        permisos1.setId(1L);
        Permisos permisos2 = new Permisos();
        permisos2.setId(permisos1.getId());
        assertThat(permisos1).isEqualTo(permisos2);
        permisos2.setId(2L);
        assertThat(permisos1).isNotEqualTo(permisos2);
        permisos1.setId(null);
        assertThat(permisos1).isNotEqualTo(permisos2);
    }
}
