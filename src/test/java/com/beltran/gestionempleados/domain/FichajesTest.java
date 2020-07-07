package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class FichajesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fichajes.class);
        Fichajes fichajes1 = new Fichajes();
        fichajes1.setId(1L);
        Fichajes fichajes2 = new Fichajes();
        fichajes2.setId(fichajes1.getId());
        assertThat(fichajes1).isEqualTo(fichajes2);
        fichajes2.setId(2L);
        assertThat(fichajes1).isNotEqualTo(fichajes2);
        fichajes1.setId(null);
        assertThat(fichajes1).isNotEqualTo(fichajes2);
    }
}
