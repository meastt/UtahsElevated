# Feedback Widget Guide for Utah's Elevated Prototype

## Overview
Your prototype site now has a feedback collection system! When your client visits the site, they'll see a welcome modal explaining this is a concept site. After acknowledging, a floating button appears in the bottom-right corner that they can use to submit change requests.

---

## How It Works

### For Your Client (Jessica/Christina):

1. **First Visit**: A welcome modal automatically appears explaining this is the prototype
2. **After Acknowledging**: The modal closes and a floating chat icon appears in the bottom-right
3. **To Request Changes**: Click the floating button → Fill out the form → Submit

### The Form Collects:
- **Area of the Site**: Which section needs changes (Header, Hero, About, Colors, etc.)
- **Type of Change**: What kind of change (Color, Image, Text, Layout, etc.)
- **Details**: Specific description of what they want changed
- **Priority**: Nice to have, Important, or Critical

---

## How to View Feedback

### Option 1: Browser Console (Simple)
When your client is on the site, they can open the browser console and type:
```javascript
UtahsElevatedFeedback.getFeedback()
```
This shows all locally stored feedback.

### Option 2: Export as JSON File
In the browser console, type:
```javascript
UtahsElevatedFeedback.exportFeedback()
```
This downloads a JSON file with all feedback entries.

### Option 3: Vercel Logs (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **UtahsElevated** project
3. Go to **Deployments** → Select the latest deployment
4. Click **Logs** tab
5. Look for entries starting with `📝 FEEDBACK ENTRY`

Each feedback submission is logged with full details:
- ID
- Timestamp
- Area
- Type
- Priority
- Details
- Page URL
- Screen size

### Option 4: Vercel KV (Advanced - Optional)
For persistent storage, you can set up Vercel KV:
1. In Vercel Dashboard, go to **Storage** → **Create Database** → **KV**
2. Connect it to your UtahsElevated project
3. Feedback will automatically be stored and retrievable via the API

Once set up, visit: `https://your-domain.vercel.app/api/feedback`
This returns all stored feedback as JSON.

---

## Quick Commands Reference

Run these in the browser console on the prototype site:

| Command | Description |
|---------|-------------|
| `UtahsElevatedFeedback.getFeedback()` | View all local feedback |
| `UtahsElevatedFeedback.exportFeedback()` | Download feedback as JSON file |
| `UtahsElevatedFeedback.clearFeedback()` | Clear all local feedback |
| `UtahsElevatedFeedback.resetOnboarding()` | Reset to show welcome modal again |

---

## Troubleshooting

### Widget Not Appearing?
- Check if JavaScript is enabled
- Try a hard refresh (Cmd+Shift+R)
- Check browser console for errors

### Need to Re-show Welcome Modal?
Run in console: `UtahsElevatedFeedback.resetOnboarding()`

### Client Already Dismissed Modal Accidentally?
They can still submit feedback by clicking the floating button in the bottom-right corner.

---

## File Locations

- **Widget JavaScript**: `/js/feedback-widget.js`
- **API Endpoint**: `/api/feedback.js`
- **Vercel Config**: `/vercel.json`

---

## Notes

- Feedback is stored in localStorage as a backup (persists in the client's browser)
- Feedback is also logged to Vercel's runtime logs (accessible in dashboard)
- The widget matches your site's branding with the copper accent color
- Mobile-responsive design for feedback on any device

---

Last updated: January 14, 2026
