package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class EntidadesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entidades.class);
        Entidades entidades1 = new Entidades();
        entidades1.setId(1L);
        Entidades entidades2 = new Entidades();
        entidades2.setId(entidades1.getId());
        assertThat(entidades1).isEqualTo(entidades2);
        entidades2.setId(2L);
        assertThat(entidades1).isNotEqualTo(entidades2);
        entidades1.setId(null);
        assertThat(entidades1).isNotEqualTo(entidades2);
    }
}
