package org.example.todo_api.config;

import org.example.todo_api.security.FirebaseTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

@Configuration
public class SecurityConfig {

    @Bean
    public FilterRegistrationBean<FirebaseTokenFilter> firebaseTokenFilter() {
        FilterRegistrationBean<FirebaseTokenFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new FirebaseTokenFilter());
        registrationBean.addUrlPatterns("/tarefas/*"); // protege rotas de tarefas
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
