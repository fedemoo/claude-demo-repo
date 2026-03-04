# Manual Setup Steps

This file documents the steps that cannot be automated and require human action before the full demo works.

---

## Step 1 — Add the Anthropic API Key secret

The GitHub Actions workflow (`.github/workflows/claude-issue-assistant.yml`) calls the Claude API.
It reads the key from a GitHub Actions secret named `ANTHROPIC_API_KEY`.

**To add it:**

1. Go to the repository on GitHub
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `ANTHROPIC_API_KEY`
5. Value: your Anthropic API key (get one at https://console.anthropic.com)
6. Click **Add secret**

The workflow will silently fail without this secret in place.

---

## Step 2 — Jira integration (Phase 4)

Connecting Jira events to the Claude GitHub Action requires two things:

### GitHub side (already scaffolded — no action needed)
The workflow can be extended to listen on `repository_dispatch` events.
When triggered, it can run Claude with context from the Jira payload.

### Jira side (requires Jira admin access)
A **Jira admin** needs to create an automation rule in Jira:

1. Go to **Jira Settings → System → Automation** (or project-level Automation)
2. Create a new rule with a trigger such as:
   - *Issue commented* (e.g. when comment contains `@claude`)
   - *Issue transitioned* (e.g. moved to "In Review")
   - *Label added* (e.g. label `claude-assist` added to an issue)
3. Add a **Send web request** action with:
   - **URL**: `https://api.github.com/repos/fedemoo/claude-demo-repo/dispatches`
   - **Method**: POST
   - **Headers**:
     - `Authorization: Bearer <GitHub PAT with repo scope>`
     - `Accept: application/vnd.github+json`
   - **Body** (JSON):
     ```json
     {
       "event_type": "jira-claude-trigger",
       "client_payload": {
         "issue_key": "{{issue.key}}",
         "summary": "{{issue.summary}}",
         "comment": "{{comment.body}}"
       }
     }
     ```
4. Save and enable the rule

The GitHub Actions workflow can then act on this payload using `github.event.client_payload`.

---

## Notes

- The `ANTHROPIC_API_KEY` must have access to at least the `claude-sonnet-4-6` model
- The GitHub PAT used in the Jira webhook should have the `repo` scope and belong to a service/bot account, not a personal account
- For production use, store the GitHub PAT as a Jira secret rather than hardcoding it in the automation rule
