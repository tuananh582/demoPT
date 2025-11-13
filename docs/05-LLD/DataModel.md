# Logical Data Model Overview

## Core Identity & Access
- **Users** `(id UUID, email, password_hash, full_name, phone, locale, status, created_at, updated_at)`
- **Roles** `(id, code ENUM[ADMIN, COACH, CUSTOMER, SUPPORT], description)` with join table **UserRoles** `(user_id, role_id)`
- **Sessions** `(id, user_id, issued_at, expires_at, device_fingerprint, mfa_verified)`
- **Consents** `(id, user_id, consent_type, granted_at, revoked_at, metadata_json)`

## Customer Profile & Onboarding
- **CustomerProfiles** `(user_id PK/FK, date_of_birth, gender, timezone, goals_json, risk_flags, emergency_contact)`
- **Assessments** `(id, user_id, questionnaire_version, responses_json, score, created_at)`
- **CoachAssignments** `(id, customer_id, coach_id, assigned_at, is_primary)`

## Commerce & Billing
- **Products** `(id, name, category, description, price, currency, duration_weeks, metadata_json)`
- **Subscriptions** `(id, customer_id, product_id, status, start_date, end_date, renewal_date, pause_until, created_at)`
- **Invoices** `(id, subscription_id, amount, currency, due_date, paid_at, status, external_reference)`
- **Payments** `(id, invoice_id, provider, method, amount, status, transaction_id, failure_reason)`
- **Promotions** `(id, code, discount_type, value, start_date, end_date, usage_limit)`

## Training Content & Plans
- **Exercises** `(id, name, category, difficulty, equipment, video_url, transcript_url, thumbnail_url)`
- **Meals** `(id, name, macros_json, allergens, instructions)`
- **Habits** `(id, name, description, frequency)`
- **Programs** `(id, title, description, goal, level, created_by, visibility)`
- **ProgramItems** `(id, program_id, item_type ENUM[EXERCISE, MEAL, HABIT], item_id, order_index, prescription_json)`
- **CustomerPlans** `(id, customer_id, program_id, start_date, end_date, status)`
- **PlanItems** `(id, plan_id, scheduled_date, item_type, item_id, completion_state, completion_at, feedback_text, substitution_item_id)`
- **Badges** `(id, code, name, description, criteria_json)`
- **CustomerBadges** `(id, customer_id, badge_id, awarded_at)`

## Scheduling & Attendance
- **Sessions** `(id, session_type ENUM[CLASS, ONE_ON_ONE, VIRTUAL, HYBRID], start_time, end_time, timezone, location, join_link, capacity, status)`
- **SessionParticipants** `(session_id, customer_id, role ENUM[PRIMARY, WAITLIST], attendance_status, feedback_score)`
- **CoachAvailability** `(id, coach_id, day_of_week, start_time, end_time, capacity)`
- **WaitlistEntries** `(id, session_id, customer_id, joined_at, promoted_at)`

## Engagement & Communication
- **Messages** `(id, thread_id, sender_id, recipient_id, body, attachments_json, sent_at, read_at)`
- **Threads** `(id, subject, created_at, last_message_at, context_type ENUM[CUSTOMER_COACH, SUPPORT], context_id)`
- **Announcements** `(id, title, body, channel ENUM[EMAIL,SMS,PUSH,INAPP], target_segment, scheduled_at, sent_at, status)`
- **CommunityPosts** `(id, author_id, community_id, content, media_url, status, created_at)`
- **CommunityReactions** `(id, post_id, user_id, type, created_at)`
- **Challenges** `(id, name, description, start_date, end_date, rules_json)`
- **ChallengeResults** `(id, challenge_id, customer_id, score, rank, updated_at)`
- **SupportTickets** `(id, requester_id, subject, priority, status, sla_due_at, assigned_to, resolution_notes, closed_at)`

## Analytics & Telemetry
- **ProgressMetrics** `(id, customer_id, metric_type, value, unit, recorded_at, source ENUM[MANUAL, WEARABLE])`
- **EngagementEvents** `(id, customer_id, event_type, payload_json, occurred_at)`
- **CohortSnapshots** `(id, cohort_key, metric_name, value, captured_at)`
- **RecommendationLogs** `(id, customer_id, recommendation_type, payload_json, shown_at, accepted_at)`

## Automation & Integrations
- **AutomationRules** `(id, name, trigger_type, condition_json, action_json, status, created_by)`
- **AutomationExecutions** `(id, rule_id, triggered_at, status, result_details, retry_count)`
- **APIClients** `(id, name, api_key_hash, rate_limit, status, created_at)`
- **APIAccessLogs** `(id, client_id, endpoint, status_code, latency_ms, occurred_at)`
- **WearableAuthorizations** `(id, customer_id, provider, access_token_hash, refresh_token_hash, expires_at, revoked_at)`

## Audit & Compliance
- **AuditLogs** `(id, actor_id, action, resource_type, resource_id, metadata_json, created_at)`
- **DataRetentionPolicies** `(id, entity, retention_period_days, deletion_strategy)`

