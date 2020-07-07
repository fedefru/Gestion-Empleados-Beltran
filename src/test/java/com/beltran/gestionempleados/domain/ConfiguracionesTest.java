package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class ConfiguracionesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Configuraciones.class);
        Configuraciones configuraciones1 = new Configuraciones();
        configuraciones1.setId(1L);
        Configuraciones configuraciones2 = new Configuraciones();
        configuraciones2.setId(configuraciones1.getId());
        assertThat(configuraciones1).isEqualTo(configuraciones2);
        configuraciones2.setId(2L);
        assertThat(configuraciones1).isNotEqualTo(configuraciones2);
        configuraciones1.setId(null);
        assertThat(configuraciones1).isNotEqualTo(configuraciones2);
    }
}
