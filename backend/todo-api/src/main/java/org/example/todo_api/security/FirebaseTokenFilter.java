package org.example.todo_api.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.FirebaseApp;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class FirebaseTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Garantir que o FirebaseApp esteja inicializado
        if (FirebaseApp.getApps().isEmpty()) {
            System.err.println("[FirebaseTokenFilter] FirebaseApp NÃO inicializado!");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Erro interno: FirebaseApp não inicializado.");
            return;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("[FirebaseTokenFilter] Header recebido: " + header);
        System.out.println("[FirebaseTokenFilter] FirebaseApp count: " + FirebaseApp.getApps().size());

        String token = header.replace("Bearer ", "").trim();

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            request.setAttribute("uid", decodedToken.getUid());
        } catch (FirebaseAuthException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token inválido: " + e.getMessage());
            return;
        }

        System.out.println("[FirebaseTokenFilter] Apps existentes: " + FirebaseApp.getApps().size());

        filterChain.doFilter(request, response);
    }
}
