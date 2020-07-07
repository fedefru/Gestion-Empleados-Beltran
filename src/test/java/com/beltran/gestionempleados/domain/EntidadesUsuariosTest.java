package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class EntidadesUsuariosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntidadesUsuarios.class);
        EntidadesUsuarios entidadesUsuarios1 = new EntidadesUsuarios();
        entidadesUsuarios1.setId(1L);
        EntidadesUsuarios entidadesUsuarios2 = new EntidadesUsuarios();
        entidadesUsuarios2.setId(entidadesUsuarios1.getId());
        assertThat(entidadesUsuarios1).isEqualTo(entidadesUsuarios2);
        entidadesUsuarios2.setId(2L);
        assertThat(entidadesUsuarios1).isNotEqualTo(entidadesUsuarios2);
        entidadesUsuarios1.setId(null);
        assertThat(entidadesUsuarios1).isNotEqualTo(entidadesUsuarios2);
    }
}
