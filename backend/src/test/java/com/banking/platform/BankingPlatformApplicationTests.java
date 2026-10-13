package com.banking.platform;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static org.junit.jupiter.api.Assertions.assertTrue;

class BankingPlatformApplicationTests {

    @Test
    void applicationIsConfiguredAsSpringBootApplication() {
        assertTrue(
                BankingPlatformApplication.class.isAnnotationPresent(SpringBootApplication.class)
        );
    }
}
