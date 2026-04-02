-- Audit log immutability trigger
-- Prevents UPDATE and DELETE on audit_logs table (21 CFR Part 11 compliance)

CREATE OR REPLACE FUNCTION prevent_audit_log_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Audit log records are immutable. UPDATE and DELETE operations are not permitted.';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Prevent updates
DROP TRIGGER IF EXISTS audit_logs_prevent_update ON audit_logs;
CREATE TRIGGER audit_logs_prevent_update
  BEFORE UPDATE ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION prevent_audit_log_modification();

-- Prevent deletes
DROP TRIGGER IF EXISTS audit_logs_prevent_delete ON audit_logs;
CREATE TRIGGER audit_logs_prevent_delete
  BEFORE DELETE ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION prevent_audit_log_modification();

-- Row Level Security for tenant isolation
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_audit_logs ON audit_logs
  USING (tenant_id = current_setting('app.current_tenant_id', true));

-- RLS policies for all tenant-scoped tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'tenants', 'users', 'documents', 'document_versions', 'document_approvals',
      'capas', 'complaints', 'nonconformances', 'products', 'design_inputs',
      'design_outputs', 'design_reviews', 'risk_assessments', 'regulatory_submissions',
      'labels', 'clinical_evaluations', 'trainings', 'training_records',
      'suppliers', 'audits', 'audit_findings', 'ai_usage_logs'
    ])
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format(
      'CREATE POLICY IF NOT EXISTS tenant_isolation_%I ON %I USING (tenant_id = current_setting(''app.current_tenant_id'', true))',
      tbl, tbl
    );
  END LOOP;
END $$;
