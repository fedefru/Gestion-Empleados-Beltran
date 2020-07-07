package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class AreasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Areas.class);
        Areas areas1 = new Areas();
        areas1.setId(1L);
        Areas areas2 = new Areas();
        areas2.setId(areas1.getId());
        assertThat(areas1).isEqualTo(areas2);
        areas2.setId(2L);
        assertThat(areas1).isNotEqualTo(areas2);
        areas1.setId(null);
        assertThat(areas1).isNotEqualTo(areas2);
    }
}
