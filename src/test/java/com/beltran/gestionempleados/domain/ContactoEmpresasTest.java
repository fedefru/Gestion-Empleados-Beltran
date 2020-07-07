package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class ContactoEmpresasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoEmpresas.class);
        ContactoEmpresas contactoEmpresas1 = new ContactoEmpresas();
        contactoEmpresas1.setId(1L);
        ContactoEmpresas contactoEmpresas2 = new ContactoEmpresas();
        contactoEmpresas2.setId(contactoEmpresas1.getId());
        assertThat(contactoEmpresas1).isEqualTo(contactoEmpresas2);
        contactoEmpresas2.setId(2L);
        assertThat(contactoEmpresas1).isNotEqualTo(contactoEmpresas2);
        contactoEmpresas1.setId(null);
        assertThat(contactoEmpresas1).isNotEqualTo(contactoEmpresas2);
    }
}
