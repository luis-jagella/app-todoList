package org.example.todo_api.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
@Profile({"dev", "prod"})
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Se já existir uma instância, retorna ela
        if (!FirebaseApp.getApps().isEmpty()) {
            System.out.println("[FirebaseConfig] FirebaseApp já inicializado.");
            return FirebaseApp.getApps().get(0);
        }

        System.out.println("[FirebaseConfig] Inicializando FirebaseApp...");

        // Carrega o JSON da classpath (resources)
        ClassPathResource resource = new ClassPathResource("firebase-service-account.json");
        try (InputStream serviceAccount = resource.getInputStream()) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            return FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            System.err.println("[FirebaseConfig] Erro ao carregar serviceAccountKey: " + e.getMessage());
            throw e;
        }
    }
}
