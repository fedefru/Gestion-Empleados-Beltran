package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class EntidadesEmpresasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntidadesEmpresas.class);
        EntidadesEmpresas entidadesEmpresas1 = new EntidadesEmpresas();
        entidadesEmpresas1.setId(1L);
        EntidadesEmpresas entidadesEmpresas2 = new EntidadesEmpresas();
        entidadesEmpresas2.setId(entidadesEmpresas1.getId());
        assertThat(entidadesEmpresas1).isEqualTo(entidadesEmpresas2);
        entidadesEmpresas2.setId(2L);
        assertThat(entidadesEmpresas1).isNotEqualTo(entidadesEmpresas2);
        entidadesEmpresas1.setId(null);
        assertThat(entidadesEmpresas1).isNotEqualTo(entidadesEmpresas2);
    }
}
