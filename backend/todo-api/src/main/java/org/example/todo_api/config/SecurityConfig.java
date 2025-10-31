package org.example.todo_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // desativa CSRF para teste
                .authorizeHttpRequests()
                .requestMatchers("/tarefas/**").permitAll() // libera a rota /tarefas
                .anyRequest().authenticated()
                .and()
                .httpBasic(); // opcional, para outras rotas

        return http.build();
    }
}

