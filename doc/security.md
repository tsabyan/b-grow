# Security Documentation
## LifeGrow - Self Improvement App

---

## 1. Security Overview

### Security Principles

- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Minimum necessary permissions
- **Secure by Default**: Security built into architecture
- **Privacy First**: User data protection as priority
- **Zero Trust**: Verify everything, trust nothing

---

## 2. Authentication Security

### Supabase Auth

**Authentication Methods**:
- Email/Password (with email verification)
- OAuth 2.0 (Google, Apple, GitHub)
- Magic Link (passwordless email)
- Phone/SMS (future)

### Password Security

**Requirements**:
- Minimum 8 characters
- Complexity: letters, numbers, symbols
- Not in common password list
- Bcrypt hashing (cost factor: 12)

**Protection**:
- Rate limiting on login attempts (5 failed attempts = 15 min lockout)
- Password reset via email only
- Session invalidation on password change
- No password storage in client/logs

### Session Management

**JWT Tokens**:
- Stored in HTTP-only cookies (not accessible via JavaScript)
- Secure flag enabled (HTTPS only)
- SameSite=Lax (CSRF protection)
- Short-lived access tokens (1 hour)
- Refresh tokens (30 days, rotating)

**Session Security**:
- Automatic token refresh before expiry
- Logout invalidates all sessions
- Concurrent session limit: 5 devices
- Session revocation via settings

---

## 3. Authorization

### Row Level Security (RLS)

All database tables have RLS enabled:

**Principle**: Users can only access their own data at the database level.

**Example Policy**:
```sql
-- Users can only see their own habits
CREATE POLICY "view_own_habits"
  ON habits FOR SELECT
  USING (auth.uid() = user_id);
```

**Benefits**:
- Authorization enforced at DB level (not just app)
- Prevents data leaks even if app has bugs
- No application-level filtering needed
- Audit trail at database level

### Role-Based Access Control (RBAC)

**Roles** (Future):
- `user`: Standard user (default)
- `premium`: Premium subscriber
- `admin`: Administrative access

---

## 4. Data Protection

### Data Encryption

**In Transit**:
- TLS 1.3 for all connections
- HSTS enabled (max-age=31536000)
- Certificate pinning (mobile apps)

**At Rest**:
- Database: AES-256 encryption
- File storage: Server-side encryption
- Backups: Encrypted backups
- Sensitive fields: Application-level encryption for extra sensitive data

### Data Privacy

**Personal Data Handling**:
- Minimal data collection (only necessary data)
- No third-party data sharing
- GDPR compliant
- CCPA compliant
- Data retention policy: Keep data while account active + 30 days after deletion

**User Rights**:
- Right to access (data export)
- Right to deletion (account + data deletion)
- Right to rectification (edit profile/data)
- Right to portability (JSON/CSV export)
- Right to object (opt-out analytics)

### Sensitive Data

**Health Data Protection**:
- All health metrics considered PHI (Protected Health Information)
- Extra encryption layer for medical data
- Audit logging for all health data access
- Compliance with HIPAA principles (if applicable)

---

## 5. Input Validation

### Validation Layers

1. **Client-Side**: Zod schema validation (UX improvement)
2. **Server-Side**: Zod schema validation (security enforcement)
3. **Database**: Constraints and check rules

### Protection Against

**SQL Injection**:
- Parameterized queries only (Drizzle ORM)
- No raw SQL with user input
- Input sanitization

**XSS (Cross-Site Scripting)**:
- Content Security Policy (CSP)
- Output encoding/escaping
- React automatic escaping
- DOMPurify for user-generated HTML

**CSRF (Cross-Site Request Forgery)**:
- SameSite cookies
- CSRF tokens for sensitive operations
- Origin/Referer header validation

**Command Injection**:
- No shell command execution with user input
- Serverless functions (sandboxed)

---

## 6. API Security

### Authentication

All API endpoints require authentication except:
- `/api/auth/*` (login, register)
- `/api/health` (health check)
- Public marketing pages

### Rate Limiting

**Limits**:
- General API: 100 requests / 15 min
- Login attempts: 5 attempts / 15 min
- Password reset: 3 requests / hour
- Export data: 10 requests / day

**Implementation**:
- IP-based rate limiting
- User-based rate limiting (authenticated)
- Sliding window counter

### API Keys

For third-party integrations:
- Rotating API keys
- Scoped permissions
- Audit logging
- Automatic expiry (90 days)

---

## 7. Frontend Security

### Content Security Policy (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.supabase.co;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://*.supabase.co;
  frame-ancestors 'none';
```

### Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Client-Side Security

- No sensitive data in localStorage
- No API keys in frontend code
- Environment variables for public keys only
- Source map protection (production)
- Minification and obfuscation

---

## 8. File Upload Security

### Upload Restrictions

**File Types** (progress photos):
- Allowed: JPEG, PNG, WebP
- Max size: 5MB
- Virus scanning (ClamAV)

**Storage Security**:
- Unique filenames (UUID)
- Private buckets (not publicly listable)
- Signed URLs for access (time-limited)
- Image processing to strip EXIF data

---

## 9. Infrastructure Security

### Hosting (Vercel)

- DDoS protection
- WAF (Web Application Firewall)
- Automatic SSL/TLS
- Edge network protection

### Database (Supabase)

- Network isolation (VPC)
- IP whitelisting (optional)
- Connection pooling (PgBouncer)
- Automated backups
- Point-in-time recovery

### Secrets Management

- Environment variables via Vercel
- No secrets in Git
- Rotation policy: 90 days
- Separate secrets per environment

---

## 10. Monitoring & Incident Response

### Security Monitoring

**Logs**:
- Authentication events (login, logout, failed attempts)
- Authorization failures
- API errors (4xx, 5xx)
- Data access (sensitive operations)

**Alerts**:
- Multiple failed login attempts
- Unusual data access patterns
- API error rate spike
- Database connection failures

### Incident Response Plan

1. **Detection**: Monitor alerts, user reports
2. **Containment**: Isolate affected systems
3. **Eradication**: Remove threat, patch vulnerability
4. **Recovery**: Restore services, verify integrity
5. **Post-Incident**: Document, learn, improve

### Vulnerability Management

- Regular dependency updates (weekly)
- Security patch priority (24-48 hours)
- Penetration testing (annual)
- Bug bounty program (future)

---

## 11. Compliance

### GDPR (EU)

- Legal basis: Consent
- Data processing agreement
- Privacy policy
- Cookie consent
- Data portability
- Right to erasure

### CCPA (California)

- Privacy notice
- Do Not Sell option
- Data access request
- Data deletion request

### SOC 2 (Future)

- Security controls
- Availability
- Processing integrity
- Confidentiality
- Privacy

---

## 12. Secure Development Practices

### Code Security

- Code reviews required
- Security linting (ESLint security plugins)
- Dependency scanning (Snyk, Dependabot)
- SAST (Static Application Security Testing)
- DAST (Dynamic Application Security Testing)

### CI/CD Security

- Secrets scanning in commits
- Container image scanning
- Signed commits required
- Protected branches (main, production)
- Automated security tests in CI

---

## 13. User Privacy Features

### Privacy Controls

- **Data Visibility**: All personal data is private by default
- **Anonymous Mode**: View app without creating account
- **Data Minimization**: Only collect necessary data
- **Transparency**: Clear privacy policy, data usage

### Data Deletion

**Account Deletion**:
1. User initiates deletion
2. 30-day grace period (reversible)
3. After 30 days: Permanent deletion
4. Anonymized analytics data retained

**What's Deleted**:
- All personal data
- Habits, transactions, fitness, wellness data
- Profile information
- Uploaded files (photos)

**What's Retained (Anonymized)**:
- Aggregate usage statistics
- Error logs (with PII removed)

---

## 14. Third-Party Security

### Vendor Assessment

All third-party services evaluated for:
- SOC 2 compliance
- Data protection practices
- Security certifications
- Incident history

### Current Vendors

| Vendor | Purpose | Security Rating |
|--------|---------|----------------|
| Supabase | Database, Auth | ⭐⭐⭐⭐⭐ SOC 2 Type II |
| Vercel | Hosting | ⭐⭐⭐⭐⭐ SOC 2 Type II |
| Sentry | Error tracking | ⭐⭐⭐⭐ Privacy Shield |

---

## 15. Security Checklist

### Pre-Launch Security Audit

- [ ] All API endpoints authenticated
- [ ] RLS policies on all tables
- [ ] Input validation on all forms
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Secrets rotated
- [ ] Dependency audit passed
- [ ] Penetration test completed
- [ ] Privacy policy reviewed
- [ ] Data backup tested
- [ ] Incident response plan documented

---

## 16. Security Contacts

### Reporting Security Issues

**Email**: security@lifegrow.app
**Response Time**: Within 24 hours
**Disclosure**: Responsible disclosure policy

**Please Include**:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-07 | Security Team | Initial security documentation |
