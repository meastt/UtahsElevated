/**
 * Vercel Serverless Function - Feedback API
 * 
 * This endpoint receives feedback submissions from the widget
 * and stores them in Vercel KV (Redis) or logs them.
 * 
 * To set up Vercel KV:
 * 1. Go to your Vercel dashboard
 * 2. Navigate to Storage → Create Database → KV
 * 3. Connect it to this project
 * 4. The environment variables will be automatically configured
 */

// Try to import Vercel KV (will be available if you've set up Vercel KV storage)
let kv;
try {
    kv = require('@vercel/kv');
} catch (e) {
    // Vercel KV not installed - we'll use file-based logging
    kv = null;
}

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Retrieve all feedback
    if (req.method === 'GET') {
        try {
            const feedback = await getFeedback();
            return res.status(200).json({
                success: true,
                count: feedback.length,
                feedback
            });
        } catch (error) {
            console.error('Error retrieving feedback:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to retrieve feedback'
            });
        }
    }

    // POST - Submit new feedback
    if (req.method === 'POST') {
        try {
            const data = req.body;

            // Validate required fields
            if (!data.area || !data.details) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: area and details'
                });
            }

            // Create feedback entry
            const entry = {
                id: data.id || generateId(),
                timestamp: data.timestamp || new Date().toISOString(),
                area: data.area,
                type: data.type || 'other',
                details: data.details,
                priority: data.priority || 'medium',
                page: data.page || '/',
                userAgent: data.userAgent || req.headers['user-agent'],
                ip: req.headers['x-forwarded-for'] || 'unknown',
                screenSize: data.screenSize || 'unknown'
            };

            // Store feedback
            await storeFeedback(entry);

            // Log to Vercel logs (always available)
            console.log('📝 NEW FEEDBACK RECEIVED:', JSON.stringify(entry, null, 2));

            return res.status(200).json({
                success: true,
                message: 'Feedback submitted successfully',
                id: entry.id
            });
        } catch (error) {
            console.error('Error storing feedback:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to store feedback'
            });
        }
    }

    // Method not allowed
    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
}

// ----------------------------------------
// Storage Functions
// ----------------------------------------

const FEEDBACK_KEY = 'utahs_elevated_feedback';

async function getFeedback() {
    if (kv) {
        // Use Vercel KV if available
        const feedback = await kv.lrange(FEEDBACK_KEY, 0, -1);
        return feedback.map(item => typeof item === 'string' ? JSON.parse(item) : item);
    }

    // Fallback: return empty (feedback is in Vercel Logs)
    return [];
}

async function storeFeedback(entry) {
    if (kv) {
        // Use Vercel KV if available
        await kv.lpush(FEEDBACK_KEY, JSON.stringify(entry));
        return;
    }

    // Fallback: Log to Vercel's runtime logs
    // You can view these in Vercel Dashboard → Deployments → Logs
    console.log('='.repeat(50));
    console.log('FEEDBACK ENTRY - ' + new Date().toISOString());
    console.log('='.repeat(50));
    console.log(`ID: ${entry.id}`);
    console.log(`Area: ${entry.area}`);
    console.log(`Type: ${entry.type}`);
    console.log(`Priority: ${entry.priority}`);
    console.log(`Details: ${entry.details}`);
    console.log(`Page: ${entry.page}`);
    console.log(`Screen: ${entry.screenSize}`);
    console.log('='.repeat(50));
}

function generateId() {
    return 'fb_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
