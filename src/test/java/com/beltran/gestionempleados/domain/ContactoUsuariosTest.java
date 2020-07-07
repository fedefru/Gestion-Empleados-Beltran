package com.beltran.gestionempleados.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.beltran.gestionempleados.web.rest.TestUtil;

public class ContactoUsuariosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoUsuarios.class);
        ContactoUsuarios contactoUsuarios1 = new ContactoUsuarios();
        contactoUsuarios1.setId(1L);
        ContactoUsuarios contactoUsuarios2 = new ContactoUsuarios();
        contactoUsuarios2.setId(contactoUsuarios1.getId());
        assertThat(contactoUsuarios1).isEqualTo(contactoUsuarios2);
        contactoUsuarios2.setId(2L);
        assertThat(contactoUsuarios1).isNotEqualTo(contactoUsuarios2);
        contactoUsuarios1.setId(null);
        assertThat(contactoUsuarios1).isNotEqualTo(contactoUsuarios2);
    }
}
