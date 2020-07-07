package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class EmpleadosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empleados.class);
        Empleados empleados1 = new Empleados();
        empleados1.setId(1L);
        Empleados empleados2 = new Empleados();
        empleados2.setId(empleados1.getId());
        assertThat(empleados1).isEqualTo(empleados2);
        empleados2.setId(2L);
        assertThat(empleados1).isNotEqualTo(empleados2);
        empleados1.setId(null);
        assertThat(empleados1).isNotEqualTo(empleados2);
    }
}
