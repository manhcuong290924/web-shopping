// src/main/java/com/btec/quanlykhohang_api/security/JwtUtil.java
package com.btec.quanlykhohang_api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "Akjhsdfjkhsdfhsadhjaskdhasjkhdkjsahdjkashdjkashdjksahdjksadhsakjh"; // Use a secure key
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    /**
     * Generate a JWT token for a given email.
     *
     * @param email The user's email.
     * @return The JWT token.
     */
    public static String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static boolean verifyToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            throw new RuntimeException("Invalid JWT signature");
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("JWT token is expired");
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token");
        }
    }

    // Trích xuất email từ token
    public static String extractEmail(String token) throws Exception {
        try {
            Claims claims = extractAllClaims(token);
            return claims.getSubject();
        } catch (Exception e) {
            throw new Exception("Cannot extract email from token: " + e.getMessage());
        }
    }

    // Trích xuất tất cả claims từ token
    private static Claims extractAllClaims(String token) throws Exception {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}