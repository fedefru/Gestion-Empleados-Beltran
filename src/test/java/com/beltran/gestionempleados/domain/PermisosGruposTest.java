package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class PermisosGruposTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PermisosGrupos.class);
        PermisosGrupos permisosGrupos1 = new PermisosGrupos();
        permisosGrupos1.setId(1L);
        PermisosGrupos permisosGrupos2 = new PermisosGrupos();
        permisosGrupos2.setId(permisosGrupos1.getId());
        assertThat(permisosGrupos1).isEqualTo(permisosGrupos2);
        permisosGrupos2.setId(2L);
        assertThat(permisosGrupos1).isNotEqualTo(permisosGrupos2);
        permisosGrupos1.setId(null);
        assertThat(permisosGrupos1).isNotEqualTo(permisosGrupos2);
    }
}
