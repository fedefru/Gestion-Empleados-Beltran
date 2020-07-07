package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class GrupoUsuariosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GrupoUsuarios.class);
        GrupoUsuarios grupoUsuarios1 = new GrupoUsuarios();
        grupoUsuarios1.setId(1L);
        GrupoUsuarios grupoUsuarios2 = new GrupoUsuarios();
        grupoUsuarios2.setId(grupoUsuarios1.getId());
        assertThat(grupoUsuarios1).isEqualTo(grupoUsuarios2);
        grupoUsuarios2.setId(2L);
        assertThat(grupoUsuarios1).isNotEqualTo(grupoUsuarios2);
        grupoUsuarios1.setId(null);
        assertThat(grupoUsuarios1).isNotEqualTo(grupoUsuarios2);
    }
}
