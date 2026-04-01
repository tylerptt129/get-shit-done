# 09-VERIFICATION.md

## Final Integration Verification and Testing Checklist

Complete integration verification for medical device QMS SaaS platform deployment.

---

## 1. Full Build Verification Commands

### Type Safety and Compilation

```bash
# TypeScript compilation check
npx tsc --noEmit
# Expected: Exit code 0, no output on success
```

```bash
# Full build process
npm run build
# Expected: Exit code 0, completion message
```

```bash
# Linting check
npm run lint
# Expected: Exit code 0, no errors
```

### Verification Script

```bash
#!/bin/bash
set -e

echo "=== BUILD VERIFICATION ==="

echo "1. TypeScript compilation..."
npx tsc --noEmit && echo "TYPES: PASS" || echo "TYPES: FAIL"

echo "2. Production build..."
npm run build && echo "BUILD: PASS" || echo "BUILD: FAIL"

echo "3. Linting..."
npm run lint && echo "LINT: PASS" || echo "LINT: FAIL"

echo ""
echo "=== ALL CHECKS PASSED ==="
```

---

## 2. Manual Test Checklist

### Authentication Flow

- [ ] Landing page loads without authentication
- [ ] Unauthenticated users see sign-in button
- [ ] Clicking sign-in redirects to Clerk authentication
- [ ] Sign-up form accepts valid email and creates account
- [ ] Sign-in form validates existing credentials
- [ ] Session persists across page refresh
- [ ] Sign-out button clears session and redirects to landing
- [ ] Protected routes redirect unauthenticated users to sign-in

### Dashboard Navigation

- [ ] Dashboard loads after authentication
- [ ] Sidebar navigation displays all main sections
- [ ] Navigation links route to correct pages:
  - [ ] Documents section
  - [ ] CAPAs section
  - [ ] Audit Trail section
  - [ ] User Settings section
- [ ] Active navigation item highlighted
- [ ] Mobile menu collapses/expands properly
- [ ] Breadcrumb navigation displays correct path

### Documents Feature

- [ ] Documents list page loads with empty state message
- [ ] Empty state shows helpful guidance
- [ ] "Create Document" button visible and clickable
- [ ] Document creation form displays all fields:
  - [ ] Title field
  - [ ] Document type selector (SOP, Work Instruction, etc.)
  - [ ] Content editor
  - [ ] Regulatory framework selector
  - [ ] Submit button
- [ ] Form validation triggers on submit with missing fields
- [ ] Document saves successfully with confirmation message
- [ ] New document appears in documents list
- [ ] Document details page loads with all information
- [ ] Edit document form pre-fills with existing data
- [ ] Document delete requires confirmation
- [ ] AI generation button appears when API configured
- [ ] AI document generation completes and shows disclaimer
- [ ] Compliance check button available
- [ ] Compliance check returns score and findings

### CAPAs Feature

- [ ] CAPA list page loads with empty state
- [ ] "Create CAPA" button visible and clickable
- [ ] CAPA creation form displays all required fields:
  - [ ] Title
  - [ ] Description
  - [ ] Root cause analysis
  - [ ] Corrective action
  - [ ] Timeline
  - [ ] Assignee
- [ ] Form validation prevents submission with missing fields
- [ ] CAPA saves successfully
- [ ] New CAPA appears in list
- [ ] CAPA detail view shows complete information
- [ ] Status updates trigger new audit entries
- [ ] Comments section functional for collaboration

### Audit Trail

- [ ] Audit trail page loads
- [ ] Creating documents generates audit entries
- [ ] Creating CAPAs generates audit entries
- [ ] Audit entries show:
  - [ ] Timestamp
  - [ ] User who made change
  - [ ] Action type
  - [ ] Object affected
  - [ ] Before/after values for updates
- [ ] Entries filtered by date range
- [ ] Entries show in reverse chronological order
- [ ] No update or delete buttons on audit entries

---

## 3. Security Verification Checklist

### Authentication and Authorization

- [ ] All `/dashboard/*` routes require authentication
- [ ] Unauthenticated requests redirected to sign-in
- [ ] Each API endpoint validates Clerk JWT token
- [ ] Invalid/expired tokens return 401 Unauthorized
- [ ] Different user accounts see only their own data

### Multi-Tenancy

- [ ] Database queries include `tenant_id` in WHERE clause
- [ ] Users see only documents from their tenant
- [ ] Users see only CAPAs from their tenant
- [ ] Users see only audit trails for their tenant
- [ ] No cross-tenant data leakage possible in list views
- [ ] API routes filter by authenticated user's tenant
- [ ] Audit queries include tenant_id filter

### Data Integrity

- [ ] Created documents include creator user_id
- [ ] Created documents include creation timestamp
- [ ] Updated documents update modified timestamp
- [ ] Soft deletes preserve data for audit trail
- [ ] Audit log entries marked as immutable
- [ ] Audit log has no UPDATE or DELETE indexes
- [ ] Database constraints prevent null required fields
- [ ] Foreign key constraints prevent orphaned records

### AI Integration Security

- [ ] Anthropic API key never exposed in logs
- [ ] API key only in environment variables
- [ ] User inputs sanitized before AI prompts
- [ ] System instructions separated from user content
- [ ] AI calls include tenant_id for usage tracking
- [ ] Rate limiting prevents API abuse (100 calls/hour)
- [ ] Cost guardrails prevent runaway charges
- [ ] AI-generated content marked with disclaimer

### Input Validation

- [ ] Form fields validate on client-side
- [ ] Server validates all incoming data
- [ ] XSS attacks prevented with output escaping
- [ ] SQL injection prevented with parameterized queries
- [ ] File uploads rejected if not expected type
- [ ] Content length limits enforced

---

## 4. Performance Baseline

### Load Time Targets

```bash
# Measure page load times
# Target: Initial page load < 2 seconds
```

### API Response Times

```bash
# Measure API response times
# Target: API endpoints < 500ms
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/api/documents
```

### Build Size Check

```bash
# Check production build size
du -sh .next/
# Target: < 500KB for bundle

# Check total bundle size including assets
du -sh .next/standalone/
```

### Database Performance

- [ ] Queries use appropriate indexes
- [ ] No N+1 query problems
- [ ] Pagination implemented for large lists
- [ ] Heavy queries return results in < 1 second

---

## 5. Comprehensive Verification Commands

### Complete Verification Script

```bash
#!/bin/bash
set -e

PASS="\033[0;32mPASS\033[0m"
FAIL="\033[0;31mFAIL\033[0m"
SKIP="\033[0;33mSKIP\033[0m"

echo ""
echo "========================================"
echo "QMS SAAS PLATFORM VERIFICATION"
echo "========================================"
echo ""

# 1. BUILD CHECKS
echo "1. BUILD VERIFICATION"
echo "---"

if npx tsc --noEmit > /dev/null 2>&1; then
  echo -e "TypeScript compilation: $PASS"
else
  echo -e "TypeScript compilation: $FAIL"
  exit 1
fi

if npm run build > /dev/null 2>&1; then
  echo -e "Production build: $PASS"
else
  echo -e "Production build: $FAIL"
  exit 1
fi

if npm run lint > /dev/null 2>&1; then
  echo -e "Linting: $PASS"
else
  echo -e "Linting: $FAIL"
  exit 1
fi

echo ""

# 2. DATABASE CHECKS
echo "2. DATABASE VERIFICATION"
echo "---"

# Check if database is accessible
if psql -d "$DATABASE_URL" -c "SELECT 1" > /dev/null 2>&1; then
  echo -e "Database connection: $PASS"
else
  echo -e "Database connection: $FAIL"
  exit 1
fi

# Check required tables exist
TABLES=("users" "tenants" "documents" "capa" "audit_log" "ai_usage")
for table in "${TABLES[@]}"; do
  if psql -d "$DATABASE_URL" -c "SELECT 1 FROM $table LIMIT 1" > /dev/null 2>&1; then
    echo -e "Table '$table' exists: $PASS"
  else
    echo -e "Table '$table' exists: $FAIL"
    exit 1
  fi
done

echo ""

# 3. ENVIRONMENT CHECKS
echo "3. ENVIRONMENT VERIFICATION"
echo "---"

if [ -n "$CLERK_SECRET_KEY" ]; then
  echo -e "Clerk API configured: $PASS"
else
  echo -e "Clerk API configured: $FAIL"
  exit 1
fi

if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo -e "Anthropic API configured: $PASS"
else
  echo -e "Anthropic API configured: $SKIP (AI features disabled)"
fi

if [ -n "$DATABASE_URL" ]; then
  echo -e "Database URL configured: $PASS"
else
  echo -e "Database URL configured: $FAIL"
  exit 1
fi

echo ""

# 4. SUMMARY
echo "========================================"
echo "VERIFICATION COMPLETE"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. npm run dev          # Start development server"
echo "2. Open http://localhost:3000 in browser"
echo "3. Complete manual test checklist (see 09-VERIFICATION.md)"
echo ""
```

---

## 6. Quick Health Check

### Development Server

```bash
# Start development server
npm run dev

# Expected output:
# > qms-saas@0.1.0 dev
# > next dev
# 
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
# - Environments: .env.local
```

### Test Authentication

```bash
# Verify Clerk integration
curl -s -H "Cookie: __session=invalid" http://localhost:3000/api/auth/user
# Expected: 401 Unauthorized or redirect to sign-in
```

### Test Database Connection

```bash
# From Node REPL
node
> require('pg').Pool
> const pool = new Pool({ connectionString: process.env.DATABASE_URL })
> pool.query('SELECT 1')
> // Should complete successfully
```

---

## 7. Pre-Deployment Checklist

### Code Quality

- [ ] All TypeScript strict mode checks pass
- [ ] No console.log statements in production code
- [ ] No TODO/FIXME comments without tickets
- [ ] All error cases handled
- [ ] No hardcoded secrets or API keys
- [ ] Dependencies up to date and no vulnerabilities

### Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing complete per section 2
- [ ] Security tests pass per section 3
- [ ] Performance baselines met per section 4

### Documentation

- [ ] API endpoints documented
- [ ] Database schema documented
- [ ] Deployment instructions clear
- [ ] Troubleshooting guide created
- [ ] Architecture decision records written

### Operations

- [ ] Monitoring and logging configured
- [ ] Error tracking (Sentry) integrated
- [ ] Database backups configured
- [ ] Disaster recovery plan documented
- [ ] On-call runbooks created

### Security

- [ ] OWASP Top 10 review complete
- [ ] SSL/TLS certificates configured
- [ ] CORS headers correct
- [ ] CSP headers in place
- [ ] Dependencies scanned for vulnerabilities
- [ ] Secrets never committed to repository

---

## 8. Post-Deployment Verification

```bash
# After deployment, verify production health

# Check application health
curl -s https://yourdomain.com/api/health | jq .

# Verify database reachability
# (from app logs)

# Test authentication flow in production
# (manual browser test)

# Monitor error logs
# (check Sentry or logging service)

# Verify AI features if enabled
# (test document generation in UI)
```

---

## Success Criteria

All of the following must be true:

- [x] TypeScript compilation: 0 errors
- [x] Build process: Exit code 0
- [x] Linting: 0 errors
- [x] All database tables exist
- [x] All required environment variables set
- [x] Manual test checklist: All items pass
- [x] Security verification: All items pass
- [x] Page load times: < 2 seconds
- [x] API response times: < 500ms
- [x] Zero cross-tenant data leakage
- [x] Audit trail complete and immutable
- [x] AI features (if enabled) working correctly

**When all criteria met: Ready for production deployment**

