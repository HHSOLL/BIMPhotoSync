-- Speed up project-wide mobile photo lists and stale upload cleanup queries.
CREATE INDEX IF NOT EXISTS "idx_photos_project_status_workdate_desc"
  ON "photos"("project_id", "status", "work_date" DESC, "uploaded_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_photo_uploads_project_commit_expire"
  ON "photo_uploads"("project_id", "committed_at", "expires_at");
