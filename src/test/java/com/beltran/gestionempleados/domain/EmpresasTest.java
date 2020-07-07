package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class EmpresasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empresas.class);
        Empresas empresas1 = new Empresas();
        empresas1.setId(1L);
        Empresas empresas2 = new Empresas();
        empresas2.setId(empresas1.getId());
        assertThat(empresas1).isEqualTo(empresas2);
        empresas2.setId(2L);
        assertThat(empresas1).isNotEqualTo(empresas2);
        empresas1.setId(null);
        assertThat(empresas1).isNotEqualTo(empresas2);
    }
}
