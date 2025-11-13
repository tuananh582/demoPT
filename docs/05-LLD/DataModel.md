# Logical Data Model Overview – FitCampus Student Portal

## Identity & Access
- **Users** `(id UUID, email, password_hash?, sso_provider?, full_name, student_id?, phone, locale, status, created_at, updated_at)`
- **Roles** `(id, code ENUM[LEARNER, MENTOR, WELLNESS_ADMIN, SUPPORT], description)` với bảng liên kết **UserRoles** `(user_id, role_id)`
- **Sessions** `(id, user_id, issued_at, expires_at, device_fingerprint, mfa_verified)`
- **Consents** `(id, user_id, consent_type ENUM[LIABILITY, DATA_SHARE, WEARABLE], granted_at, revoked_at, metadata_json)`

## Learner Profile & Orientation
- **LearnerProfiles** `(user_id PK/FK, date_of_birth, gender, major, dorm, timezone, goals_json, readiness_score, risk_flags)`
- **OrientationTasks** `(id, code, title, description, order_index, required boolean)`
- **LearnerOrientation** `(learner_id, task_id, completed_at, evidence_url)`
- **MentorAssignments** `(id, learner_id, mentor_id, assigned_at, cohort_code)`

## Membership & Perks
- **MembershipProducts** `(id, name, description, goal_path, duration_weeks, price, currency, facility, perks_json)`
- **MembershipSubscriptions** `(id, learner_id, product_id, status ENUM[ACTIVE, PAUSED, CANCELED, PENDING], start_date, end_date, renewal_date, pause_until, created_at)`
- **Orders** `(id, learner_id, product_id, amount, currency, promo_code, status, payment_intent, created_at)`
- **Payments** `(id, order_id, provider, method, amount, status, transaction_id, failure_reason, processed_at)`
- **PerkRedemptions** `(id, subscription_id, perk_code, redeemed_at, metadata_json)`

## Training Content & Daily Plan
- **ContentModules** `(id, type ENUM[WORKOUT, LESSON, HABIT, TIP], title, description, difficulty, media_url, transcript_url, duration_minutes, equipment_json)`
- **Programs** `(id, name, description, goal_path, level, created_by, visibility)`
- **ProgramSchedule** `(id, program_id, day_offset, module_id, xp_reward, prerequisites_json)`
- **LearnerPlans** `(id, learner_id, program_id, start_date, end_date, status)`
- **PlanEntries** `(id, plan_id, scheduled_date, module_id, status ENUM[PENDING, COMPLETED, SKIPPED], completion_at, feedback_text, substitution_module_id)`
- **Badges** `(id, code, name, description, criteria_json, xp_bonus)`
- **LearnerBadges** `(id, learner_id, badge_id, awarded_at)`
- **LearnerXP** `(learner_id PK, total_xp, current_level, streak_days, last_update)`

## Scheduling & Attendance
- **Sessions** `(id, title, type ENUM[CLASS, WORKSHOP, CHECKIN, VIRTUAL], start_time, end_time, timezone, location, capacity, status, prerequisite_code)`
- **SessionParticipants** `(session_id, learner_id, role ENUM[LEARNER, WAITLIST], attendance_status ENUM[REGISTERED, ATTENDED, NO_SHOW], feedback_score, check_in_at)`
- **WaitlistEntries** `(id, session_id, learner_id, position, joined_at, promoted_at)`
- **MentorAvailability** `(id, mentor_id, day_of_week, start_time, end_time, slot_size)`

## Community, Challenges & Support
- **Threads** `(id, context_type ENUM[PEER, MENTOR, SUPPORT], context_id, created_at, last_message_at)`
- **Messages** `(id, thread_id, sender_id, body, attachments_json, sent_at, read_at)`
- **Announcements** `(id, title, body, channel ENUM[EMAIL,SMS,PUSH,INAPP], target_segment_json, scheduled_at, sent_at, status)`
- **Challenges** `(id, name, goal_path, start_date, end_date, rules_json, reward_json)`
- **ChallengeEnrollments** `(id, challenge_id, learner_id, team_id?, enrolled_at)`
- **ChallengeScores** `(id, challenge_id, learner_id, metric, value, rank, updated_at)`
- **SupportTickets** `(id, requester_id, subject, category, priority, status, sla_due_at, assigned_to, resolution_notes, closed_at)`

## Progress & Analytics
- **ProgressMetrics** `(id, learner_id, metric_type ENUM[WEIGHT, BMI, SLEEP, ENERGY, WORKOUT_COMPLETION, CLASS_ATTENDANCE], value, unit, recorded_at, source ENUM[MANUAL, WEARABLE, SYSTEM])`
- **EngagementEvents** `(id, learner_id, event_type ENUM[PLAN_COMPLETED, STREAK_RESET, CHALLENGE_JOINED], payload_json, occurred_at)`
- **RiskAssessments** `(id, learner_id, risk_score, drivers_json, assessed_at)`
- **Reports** `(id, learner_id?, mentor_id?, type ENUM[PROGRESS, COHORT], filters_json, generated_at, storage_url)`

## Automation & Integrations
- **AutomationRules** `(id, name, trigger_type, condition_json, action_json, status ENUM[DRAFT, ACTIVE, PAUSED], created_by)`
- **AutomationRuns** `(id, rule_id, triggered_at, status, result_details, retry_count)`
- **APIClients** `(id, name, api_key_hash, rate_limit, scopes_json, status, created_at, expires_at?)`
- **WearableAuthorizations** `(id, learner_id, provider, access_token_hash, refresh_token_hash, scopes, expires_at, revoked_at)`

## Governance & Audit
- **AuditLogs** `(id, actor_id, action, resource_type, resource_id, metadata_json, created_at)`
- **DataRetentionPolicies** `(id, entity, retention_period_days, anonymization_strategy)`
- **ConsentAudit** `(id, consent_id, change_type, changed_by, changed_at)`

